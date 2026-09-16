import db from "../config/database.js";
import { body, validationResult } from "express-validator";

export const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search = "",
      category = "",
      sort = "newest",
    } = req.query;

    const offset = (Number(page) - 1) * Number(limit);
    let whereClause = "WHERE 1=1";
    const params = [];
    let paramIndex = 1;

    if (search) {
      whereClause += ` AND (name ILIKE $${paramIndex} OR description ILIKE $${paramIndex} OR tags @> ARRAY[$${paramIndex}]::text[])`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    if (category) {
      whereClause += ` AND category = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }

    const sortOptions = {
      newest: "created_at DESC",
      "price-low": "price ASC",
      "price-high": "price DESC",
      name: "name ASC",
    };
    const orderBy = sortOptions[sort] || sortOptions.newest;

    const countQuery = `SELECT COUNT(*) FROM products ${whereClause}`;
    const countResult = await db.one(countQuery, params);
    const total = parseInt(countResult.count);

    const productsQuery = `
      SELECT * FROM products 
      ${whereClause} 
      ORDER BY ${orderBy} 
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;
    params.push(Number(limit), offset);
    const products = await db.any(productsQuery, params);

    res.json({
      products,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      total,
    });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const product = await db.oneOrNone(
      "SELECT * FROM products WHERE slug = $1",
      [req.params.slug]
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await db.oneOrNone(
      "SELECT * FROM products WHERE id = $1",
      [req.params.id]
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      slug,
      price,
      category,
      description,
      shortDescription,
      images,
      featured,
      bestSeller,
      newArrival,
      limited,
      stock,
      materials,
      sizes,
      careInstructions,
      tags,
    } = req.body;

    const product = await db.one(
      `INSERT INTO products (
        name, slug, price, category, description, short_description, images,
        featured, best_seller, new_arrival, limited, stock, materials, sizes,
        care_instructions, tags
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16
      ) RETURNING *`,
      [
        name,
        slug || name.toLowerCase().replace(/\s+/g, "-"),
        price,
        category,
        description,
        shortDescription,
        JSON.stringify(images || []),
        featured || false,
        bestSeller || false,
        newArrival || false,
        limited || false,
        stock || 0,
        materials || "",
        sizes || [],
        careInstructions || [],
        tags || [],
      ]
    );

    res.status(201).json(product);
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      slug,
      price,
      category,
      description,
      shortDescription,
      images,
      featured,
      bestSeller,
      newArrival,
      limited,
      stock,
      materials,
      sizes,
      careInstructions,
      tags,
    } = req.body;

    const product = await db.one(
      `UPDATE products SET
        name = $1, slug = $2, price = $3, category = $4, description = $5,
        short_description = $6, images = $7, featured = $8, best_seller = $9,
        new_arrival = $10, limited = $11, stock = $12, materials = $13,
        sizes = $14, care_instructions = $15, tags = $16, updated_at = CURRENT_TIMESTAMP
       WHERE id = $17 RETURNING *`,
      [
        name, slug, price, category, description, shortDescription,
        JSON.stringify(images), featured, bestSeller, newArrival, limited,
        stock, materials, sizes, careInstructions, tags, req.params.id
      ]
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const result = await db.result(
      "DELETE FROM products WHERE id = $1",
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const result = await db.any("SELECT DISTINCT category FROM products ORDER BY category");
    res.json(result.map(r => r.category));
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const productValidation = [
  body("name").trim().isLength({ min: 1 }).withMessage("Name is required"),
  body("price").isNumeric().withMessage("Price must be a number"),
  body("category").trim().isLength({ min: 1 }).withMessage("Category is required"),
  body("description").trim().isLength({ min: 1 }).withMessage("Description is required"),
  body("shortDescription").trim().isLength({ min: 1 }).withMessage("Short description is required"),
];