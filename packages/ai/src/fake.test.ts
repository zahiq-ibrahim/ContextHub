import { describe, expect, it } from "vitest";
import { FakeEmbeddingProvider, FakeLlmProvider } from "./fake.js";

describe("fake providers", () => {
  it("returns repeatable 768-dimensional embeddings", async () => {
    const provider = new FakeEmbeddingProvider();
    const first = await provider.embed(["hello"]);
    const again = await provider.embed(["hello"]);

    expect(first[0]).toHaveLength(768);
    expect(again).toEqual(first);
  });

  it("returns a fixed LLM response", async () => {
    const provider = new FakeLlmProvider();
    const response = await provider.generate();
    expect(response.text).toBe("fake response");
  });
});