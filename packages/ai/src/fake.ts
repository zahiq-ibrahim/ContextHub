import { createHash } from "node:crypto";
import type { EmbeddingProvider, LlmProvider, LlmResponse } from "./types.js";

function toVector(text: string, dimension: number): number[] {
  const values: number[] = [];
  let block = 0;
  while (values.length < dimension) {
    const digest = createHash("sha256").update(`${String(block)}:${text}`).digest();    for (const byte of digest) {
      if (values.length < dimension) {
        values.push(byte / 127.5 - 1);
      }
    }
    block += 1;
  }
  return values;
}

export class FakeEmbeddingProvider implements EmbeddingProvider {
  readonly id = "fake:embedding";
  readonly dimension = 768;

  embed(texts: string[]): Promise<number[][]> {
    return Promise.resolve(texts.map((text) => toVector(text, this.dimension)));
  }
}

export class FakeLlmProvider implements LlmProvider {
  readonly id = "fake:llm";

  generate(): Promise<LlmResponse> {
    return Promise.resolve({ text: "fake response" });
  }
}