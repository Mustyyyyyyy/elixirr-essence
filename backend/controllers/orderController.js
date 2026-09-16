import db from "../config/database.js";

export const getOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status = "" } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let whereClause = "WHERE 1=1";
    const params = [];
    let paramIndex = 1;

    if (status) {
      whereClause += ` AND status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    const countQuery = `SELECT COUNT(*) FROM orders ${whereClause}`;
    const countResult = await db.one(countQuery, params);
    const total = parseInt(countResult.count);

    const ordersQuery = `
      SELECT * FROM orders 
      ${whereClause} 
      ORDER BY created_at DESC 
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;
    params.push(Number(limit), offset);
    const orders = await db.any(ordersQuery, params);

    res.json({
      orders,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      total,
    });
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await db.one(
      "SELECT * FROM orders WHERE id = $1",
      [req.params.id]
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      customerCity,
      customerPostalCode,
      customerCountry,
      items,
      shippingMethod,
      subtotal,
      shipping,
      total,
      paymentMethod,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    const order = await db.one(
      `INSERT INTO orders (
        customer_name, customer_email, customer_phone, customer_address,
        customer_city, customer_postal_code, customer_country, items,
        shipping_method, subtotal, shipping, total, payment_method
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
      ) RETURNING *`,
      [
        customerName, customerEmail, customerPhone, customerAddress,
        customerCity, customerPostalCode, customerCountry, JSON.stringify(items),
        shippingMethod || "standard", subtotal, shipping || 0, total,
        paymentMethod || "cod"
      ]
    );

    res.status(201).json(order);
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status, trackingNumber, notes } = req.body;

    const order = await db.oneOrNone(
      `UPDATE orders SET
        status = COALESCE($1, status),
        tracking_number = COALESCE($2, tracking_number),
        notes = COALESCE($3, notes),
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $4 RETURNING *`,
      [status, trackingNumber, notes, req.params.id]
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const result = await db.result(
      "DELETE FROM orders WHERE id = $1",
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderStats = async (req, res) => {
  try {
    const totalOrdersResult = await db.one("SELECT COUNT(*) FROM orders");
    const totalOrders = parseInt(totalOrdersResult.count);

    const revenueResult = await db.one(
      "SELECT COALESCE(SUM(total), 0) as total FROM orders WHERE status != 'cancelled'"
    );
    const totalRevenue = parseFloat(revenueResult.total);

    const statusResult = await db.any(
      "SELECT status, COUNT(*) as count FROM orders GROUP BY status"
    );

    const ordersByStatus = statusResult.map(r => ({
      status: r.status,
      count: parseInt(r.count),
    }));

    res.json({
      totalOrders,
      totalRevenue,
      ordersByStatus,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};