// app/api/dbcheck/route.ts
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';

export async function GET() {
  try {
    const { count, error } = await supabaseAdmin
      .from('licenses')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;

    return NextResponse.json({ ok: true, table: 'licenses', count: count ?? 0 });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || String(e) },
      { status: 500 }
    );
  }
}
