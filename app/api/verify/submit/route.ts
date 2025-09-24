
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { query } from '@/lib/db';
const Body = z.object({ trade: z.enum(['electric','plumbing','hvac','gc']), state: z.string(), license_number: z.string() });
export async function POST(req: NextRequest) {
  const data = Body.parse(await req.json());
  await query(`INSERT INTO licenses (user_id, trade, state, license_number, status) VALUES (gen_random_uuid(), $1,$2,$3,'pending')`, [data.trade, data.state, data.license_number]);
  return NextResponse.json({ ok: true });
}
