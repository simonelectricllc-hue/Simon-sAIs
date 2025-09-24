
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { summarize, embed } from '@/lib/ai';
export async function POST(req: NextRequest) {
  const { q } = await req.json();
  if (!q) return NextResponse.json({ error: 'q required' }, { status: 400 });
  const vec = await embed(q);
  const { rows } = await query(`
    WITH knn AS (
      SELECT a.id, a.body_md, 1 - (a.embedding <=> $1::vector) AS score
      FROM answers a
      ORDER BY a.embedding <=> $1::vector
      LIMIT 8
    )
    SELECT id, body_md FROM knn`, [vec]);
  const snippets = rows.map((r:any) => `[answer:${r.id}]\n${r.body_md?.slice(0,800)}`);
  const summary = await summarize(snippets, q);
  return NextResponse.json({ summary, answers: rows });
}
