import { api } from "./api";

const LLM_SEARCH_URL: string = "/llm/search";

export const llmSearchRequest = async (prompt: string) => {
    return await api.post(LLM_SEARCH_URL, {}, { params: { q: prompt } });
}
