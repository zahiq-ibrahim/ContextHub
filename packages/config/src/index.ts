import { z } from "zod";

export const configSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.url(),
  REDIS_URL: z.url(),
  LLM_PROVIDER: z.literal("gemini"),
  LLM_MODEL: z.string().min(1),
  EMBEDDING_PROVIDER: z.literal("gemini"),
  EMBEDDING_MODEL: z.string().min(1),
  EMBEDDING_DIMENSION: z.literal("768").transform(() => 768 as const),
  GEMINI_API_KEY: z.string().min(1),
  JWT_SIGNING_KEY: z.string().min(32),
});

export type Config = z.infer<typeof configSchema>;

export function parseConfig(env: NodeJS.ProcessEnv) {
  return configSchema.safeParse(env);
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  const result = configSchema.safeParse(env);
  if (!result.success) {
    console.error("Invalid configuration:", z.treeifyError(result.error));
    process.exit(1);
  }
  return result.data;
}