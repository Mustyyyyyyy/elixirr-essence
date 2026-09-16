import db from "./database.js";

export const createTables = async () => {
  const createTablesQuery = `
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      category VARCHAR(100) NOT NULL,
      description TEXT NOT NULL,
      short_description TEXT NOT NULL,
      images JSONB DEFAULT '[]',
      featured BOOLEAN DEFAULT FALSE,
      best_seller BOOLEAN DEFAULT FALSE,
      new_arrival BOOLEAN DEFAULT FALSE,
      limited BOOLEAN DEFAULT FALSE,
      stock INTEGER DEFAULT 0,
      materials TEXT DEFAULT '',
      sizes TEXT[] DEFAULT '{}',
      care_instructions TEXT[] DEFAULT '{}',
      tags TEXT[] DEFAULT '{}',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
      avatar VARCHAR(500) DEFAULT '',
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      phone VARCHAR(20) DEFAULT '',
      address TEXT DEFAULT '',
      city VARCHAR(100) DEFAULT '',
      postal_code VARCHAR(20) DEFAULT '',
      country VARCHAR(100) DEFAULT '',
      role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
      is_active BOOLEAN DEFAULT TRUE,
      avatar VARCHAR(500) DEFAULT '',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      customer_name VARCHAR(255) NOT NULL,
      customer_email VARCHAR(255) NOT NULL,
      customer_phone VARCHAR(20) DEFAULT '',
      customer_address TEXT NOT NULL,
      customer_city VARCHAR(100) NOT NULL,
      customer_postal_code VARCHAR(20) NOT NULL,
      customer_country VARCHAR(100) NOT NULL,
      items JSONB NOT NULL,
      shipping_method VARCHAR(50) DEFAULT 'standard',
      subtotal DECIMAL(10,2) NOT NULL,
      shipping DECIMAL(10,2) DEFAULT 0,
      total DECIMAL(10,2) NOT NULL,
      status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
      payment_method VARCHAR(50) DEFAULT 'cod',
      payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
      tracking_number VARCHAR(100) DEFAULT '',
      notes TEXT DEFAULT '',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS subscribers (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      is_active BOOLEAN DEFAULT TRUE,
      subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
    CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
    CREATE INDEX IF NOT EXISTS idx_products_created ON products(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);
    CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
    CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_subscribers_active ON subscribers(is_active);
  `;

  try {
    await db.none(createTablesQuery);
    console.log("All tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
    throw error;
  }
};

export const seedDatabase = async () => {
  const bcrypt = (await import("bcryptjs")).default;
  const adminEmail = process.env.ADMIN_EMAIL || "admin@elixirr-essence.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const adminName = "Admin";

  try {
    const existingAdmin = await db.oneOrNone(
      "SELECT * FROM admins WHERE email = $1",
      [adminEmail]
    );

    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    await db.none(
      "INSERT INTO admins (name, email, password, role) VALUES ($1, $2, $3, $4)",
      [adminName, adminEmail, hashedPassword, "admin"]
    );

    console.log("Admin seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
};

export default db;