
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { query } from '@/lib/db';
import { embed } from '@/lib/ai';
const Body = z.object({ title: z.string().min(5), body_md: z.string().min(10) });
export async function POST(req: NextRequest) {
  const payload = Body.parse(await req.json());
  const vec = await embed(`${payload.title}\n${payload.body_md}`);
  const { rows } = await query(`INSERT INTO questions (title, body_md, embedding) VALUES ($1,$2,$3) RETURNING id`, [payload.title, payload.body_md, vec]);
  return NextResponse.json({ id: rows[0].id }, { status: 201 });
}
export async function GET() {
  const { rows } = await query(`SELECT id, title, created_at FROM questions ORDER BY created_at DESC LIMIT 20`);
  return NextResponse.json(rows);
}
