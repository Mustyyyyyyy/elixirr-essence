import db from "../config/database.js";

export const subscribe = async (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "A valid email address is required." });
  }

  try {
    await db.none(
      `INSERT INTO subscribers (email) VALUES ($1)
       ON CONFLICT (email) DO UPDATE SET is_active = TRUE`,
      [email]
    );
    res.status(201).json({ message: "You are now subscribed to Elixirr Essence updates." });
  } catch (error) {
    console.error("Subscribe error:", error);
    res.status(500).json({ message: "Unable to subscribe right now." });
  }
};

export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await db.any(
      "SELECT id, email, subscribed_at FROM subscribers WHERE is_active = TRUE ORDER BY subscribed_at DESC"
    );
    res.json({ subscribers, total: subscribers.length });
  } catch (error) {
    console.error("Get subscribers error:", error);
    res.status(500).json({ message: "Unable to load subscribers." });
  }
};
