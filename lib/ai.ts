
import OpenAI from 'openai';
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
export async function embed(text: string): Promise<number[]> {
  const resp = await client.embeddings.create({ model: 'text-embedding-3-small', input: text });
  return resp.data[0].embedding as unknown as number[];
}
export async function summarize(contextSnippets: string[], question: string) {
  const prompt = `Summarize licensed pro answers. Cite answer IDs in brackets like [answer:UUID].\nQuestion: ${question}\nContext:\n${contextSnippets.join("\n---\n")}`;
  const chat = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.2,
  });
  return chat.choices[0].message?.content || '';
}
