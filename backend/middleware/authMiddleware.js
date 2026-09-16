import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/database.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user;

    if (decoded.role === "admin") {
      user = await db.oneOrNone(
        "SELECT id, name, email, role, avatar, is_active FROM admins WHERE id = $1",
        [decoded.id]
      );
    } else {
      user = await db.oneOrNone(
        "SELECT id, name, email, role, phone, avatar, is_active FROM users WHERE id = $1",
        [decoded.id]
      );
    }

    if (!user || !user.is_active) {
      return res.status(401).json({ message: "Token invalid or user deactivated" });
    }

    req.user = user;
    req.role = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalid" });
  }
};

export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

export const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};