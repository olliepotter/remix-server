import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: "PORT must be a number",
    })
    .default("3000"),
  COOKIE_SECRET: z.string().min(1, "COOKIE_SECRET is required"),
  FB_ADMIN_PROJECT_ID: z.string().min(1, "FB_ADMIN_PROJECT_ID is required"),
  FB_ADMIN_CLIENT_EMAIL: z
    .string()
    .email("FB_ADMIN_CLIENT_EMAIL must be a valid email address"),
  FB_ADMIN_PRIVATE_KEY: z
    .string()
    .min(1, "FB_ADMIN_PRIVATE_KEY is required")
    .transform((val) => val.replace(/\\n/g, "\n")), // Firebase private key might contain escaped newlines
});

// Parse the environment variables
const ENV = envSchema.safeParse(process.env);

if (!ENV.success) {
  console.error("❌ Invalid environment variables", ENV.error.format());
  process.exit(1); // Terminate app if environment is misconfigured
}

export const env = ENV.data; // Export the validated env variables
