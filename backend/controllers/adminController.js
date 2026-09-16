import db from "../config/database.js";
import { body, validationResult } from "express-validator";
import { hashPassword, comparePassword, generateToken } from "../middleware/authMiddleware.js";

export const loginAdmin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const admin = await db.oneOrNone(
      "SELECT * FROM admins WHERE email = $1",
      [email]
    );

    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await comparePassword(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(admin.id, "admin");

    res.json({
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        avatar: admin.avatar,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, phone } = req.body;

    const existingUser = await db.oneOrNone(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await db.one(
      `INSERT INTO users (name, email, password, phone, role) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, name, email, role, phone, avatar, is_active`,
      [name, email, hashedPassword, phone, "customer"]
    );

    const token = generateToken(user.id, "customer");

    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await db.oneOrNone(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.id, "customer");

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMe = async (req, res) => {
  try {
    if (req.role === "admin") {
      const admin = await db.oneOrNone(
        "SELECT id, name, email, role, avatar, is_active FROM admins WHERE id = $1",
        [req.user.id]
      );
      res.json(admin);
    } else {
      const user = await db.oneOrNone(
        "SELECT id, name, email, role, phone, avatar, is_active FROM users WHERE id = $1",
        [req.user.id]
      );
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, address, city, postalCode, country, avatar } = req.body;
    const table = req.role === "admin" ? "admins" : "users";

    const updated = await db.one(
      `UPDATE ${table} 
       SET name = $1, email = $2, phone = $3, address = $4, city = $5, postal_code = $6, country = $7, avatar = $8, updated_at = CURRENT_TIMESTAMP
       WHERE id = $9
       RETURNING id, name, email, role, phone, avatar, is_active`,
      [name, email, phone, address, city, postalCode, country, avatar, req.user.id]
    );

    res.json(updated);
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const table = req.role === "admin" ? "admins" : "users";

    const user = await db.one(
      `SELECT * FROM ${table} WHERE id = $1`,
      [req.user.id]
    );

    const isMatch = await comparePassword(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const hashedPassword = await hashPassword(newPassword);

    await db.none(
      `UPDATE ${table} SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2`,
      [hashedPassword, req.user.id]
    );

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const seedAdmin = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const adminEmail = email || process.env.ADMIN_EMAIL;
    const adminPassword = password || process.env.ADMIN_PASSWORD;
    const adminName = name || "Admin";

    if (!adminEmail || !adminPassword || adminPassword.length < 6) {
      return res.status(400).json({ message: "A valid admin email and password are required" });
    }

    const existingAdmin = await db.oneOrNone(
      "SELECT * FROM admins WHERE email = $1",
      [adminEmail]
    );

    if (existingAdmin) {
      const hashedPassword = await hashPassword(adminPassword);
      await db.none(
        "UPDATE admins SET name = $1, password = $2, is_active = TRUE, updated_at = CURRENT_TIMESTAMP WHERE email = $3",
        [adminName, hashedPassword, adminEmail]
      );
      return res.json({ message: "Admin credentials updated successfully" });
    }

    const hashedPassword = await hashPassword(adminPassword);

    await db.none(
      "INSERT INTO admins (name, email, password, role) VALUES ($1, $2, $3, $4)",
      [adminName, adminEmail, hashedPassword, "admin"]
    );

    res.json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginValidation = [
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6 }),
];

export const registerValidation = [
  body("name").trim().isLength({ min: 1 }).withMessage("Name is required"),
  body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("phone").optional().trim(),
];