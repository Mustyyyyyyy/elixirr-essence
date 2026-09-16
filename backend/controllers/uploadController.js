import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const file = req.file;
    const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
    const filename = `${uuidv4()}${ext}`;
    const uploadDir = path.join(process.cwd(), "uploads", "products");
    const outputPath = path.join(uploadDir, filename);

    ensureDir(uploadDir);

    // Optimize and resize image
    await sharp(file.buffer)
      .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toFile(outputPath);

    const imageUrl = `/uploads/products/${filename}`;
    res.json({ url: imageUrl });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Image upload failed" });
  }
};

export const uploadMultiple = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No image files provided" });
    }

    const uploadDir = path.join(process.cwd(), "uploads", "products");
    ensureDir(uploadDir);

    const urls = [];
    for (const file of req.files) {
      const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
      const filename = `${uuidv4()}${ext}`;
      const outputPath = path.join(uploadDir, filename);

      await sharp(file.buffer)
        .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: 85 })
        .toFile(outputPath);

      urls.push(`/uploads/products/${filename}`);
    }

    res.json({ urls });
  } catch (error) {
    console.error("Multiple upload error:", error);
    res.status(500).json({ message: "Image upload failed" });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ message: "Image URL is required" });
    }

    const fullPath = path.join(process.cwd(), url);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Image deletion failed" });
  }
};