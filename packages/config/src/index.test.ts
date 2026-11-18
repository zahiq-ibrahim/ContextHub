import { describe, expect, it } from "vitest";
import { parseConfig } from "./index.js";

const validEnv = {
  NODE_ENV: "test",
  DATABASE_URL: "postgresql://contexthub:contexthub_dev@localhost:5432/contexthub",
  REDIS_URL: "redis://localhost:6379",
  LLM_PROVIDER: "gemini",
  LLM_MODEL: "example-llm-model",
  EMBEDDING_PROVIDER: "gemini",
  EMBEDDING_MODEL: "example-embedding-model",
  EMBEDDING_DIMENSION: "768",
  GEMINI_API_KEY: "test-key",
  JWT_SIGNING_KEY: "x".repeat(32),
};

describe("parseConfig", () => {
  it("accepts a complete environment and returns dimension 768", () => {
    const result = parseConfig(validEnv);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.EMBEDDING_DIMENSION).toBe(768);
    }
  });

  it("rejects any embedding dimension other than 768", () => {
    expect(parseConfig({ ...validEnv, EMBEDDING_DIMENSION: "1536" }).success).toBe(false);
  });

  it("rejects a JWT signing key shorter than 32 characters", () => {
    expect(parseConfig({ ...validEnv, JWT_SIGNING_KEY: "short" }).success).toBe(false);
  });

  it("rejects an empty model name", () => {
    expect(parseConfig({ ...validEnv, LLM_MODEL: "" }).success).toBe(false);
  });
});
