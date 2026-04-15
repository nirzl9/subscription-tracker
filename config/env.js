import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const { PORT, NODE_ENV, DB_URI, JWT_SECRET, JWT_EXPIRES_IN } =
  process.env;

//token --> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWQxZjVmZDBjNzkyNTMwZmFmZjcyZTEiLCJpYXQiOjE3NzUzNjc2NzcsImV4cCI6MTc3NTQ1NDA3N30.ssIvWwKP2oXGvahzm8jCIWkapc71-HhizDhI0DI-4pE"

//ID --> "69d1f5fd0c792530faff72e1"
