
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { query } from '@/lib/db';
import { embed } from '@/lib/ai';

function isAuthed(req: NextRequest) {
  const token = req.headers.get('x-admin-token') || req.headers.get('X-ADMIN-TOKEN');
  const expected = process.env.ADMIN_TOKEN;
  return expected && token === expected;
}

const Body = z.object({ question_id: z.string().uuid(), body_md: z.string().min(5) });

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const payload = Body.parse(await req.json());
  const vec = await embed(payload.body_md);
  const { rows } = await query(`INSERT INTO answers (question_id, author_id, body_md, embedding) VALUES ($1, gen_random_uuid(), $2, $3) RETURNING id`, [payload.question_id, payload.body_md, vec]);
  return NextResponse.json({ id: rows[0].id }, { status: 201 });
}
