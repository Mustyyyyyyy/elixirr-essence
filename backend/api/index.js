let appPromise;

export default async function handler(req, res) {
  try {
    appPromise ??= import("../server.js").then(({ default: app }) => app);
    const app = await appPromise;
    return app(req, res);
  } catch (error) {
    console.error("Vercel backend bootstrap failed:", error);
    return res.status(500).json({
      message: "Backend failed to initialize.",
      error: process.env.NODE_ENV === "production" ? undefined : error.message,
    });
  }
}
