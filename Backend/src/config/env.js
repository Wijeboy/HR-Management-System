import "dotenv/config";

const frontendOrigins = (process.env.FRONTEND_URL || "http://localhost:5173,http://127.0.0.1:5173")
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);

export const env = {
  port: Number(process.env.PORT) || 5020,
  frontendOrigins,
};
