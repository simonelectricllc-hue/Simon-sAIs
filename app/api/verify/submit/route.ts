// app/api/verify/submit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { query } from '@/lib/db';

const Body = z.object({
  trade: z.enum(['electric','plumbing','hvac','gc']),
  state: z.string().min(2).max(2),          // e.g. FL
  license_number: z.string().min(3),
});

export async function POST(req: NextRequest) {
  try {
    const data = Body.parse(await req.json());

    const { rows } = await query<{ id: string }>(
      `INSERT INTO licenses (user_id, trade, state, license_number, status)
       VALUES (gen_random_uuid(), $1, $2, $3, 'pending')
       RETURNING id`,
      [data.trade, data.state.toUpperCase(), data.license_number]
    );

    return NextResponse.json({ ok: true, id: rows[0].id });
  } catch (err: any) {
    console.error('Verify submit error:', err?.message || err);
    return NextResponse.json(
      { ok: false, error: err?.message || String(err) },
      { status: 500 }
    );
  }
}
