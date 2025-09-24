
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

function isAuthed(req: NextRequest) {
  const token = req.headers.get('x-admin-token') || req.headers.get('X-ADMIN-TOKEN');
  const expected = process.env.ADMIN_TOKEN;
  return expected && token === expected;
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { rows } = await query(`SELECT l.id, l.trade, l.state, l.license_number, l.status, l.created_at FROM licenses l WHERE l.status='pending' ORDER BY l.created_at ASC`);
  return NextResponse.json(rows);
}
export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id, action } = await req.json();
  if (action === 'verify') {
    await query(`UPDATE licenses SET status='verified', reviewed_at=now() WHERE id=$1`, [id]);
  } else {
    await query(`UPDATE licenses SET status='rejected', reviewed_at=now() WHERE id=$1`, [id]);
  }
  return NextResponse.json({ ok: true });
}
