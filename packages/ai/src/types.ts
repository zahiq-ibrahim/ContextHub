export interface EmbeddingProvider {
  readonly id: string;
  readonly dimension: number;
  embed(texts: string[], purpose: "document" | "query"): Promise<number[][]>;
}

export interface LlmRequest {
  messages: { role: "system" | "user" | "assistant"; content: string }[];
  // tools and output schema are added in Phase 5 and Phase 7
}

export interface LlmResponse {
  text: string;
}

export interface LlmProvider {
  readonly id: string;
  generate(input: LlmRequest): Promise<LlmResponse>;
}