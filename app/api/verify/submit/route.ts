import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase';

const Body = z.object({
  trade: z.enum(['electric', 'plumbing', 'hvac', 'gc']),
  state: z.string().min(2).max(2),
  license_number: z.string().min(3),
});

export async function POST(req: NextRequest) {
  try {
    const data = Body.parse(await req.json());

    const { data: inserted, error } = await supabaseAdmin
      .from('licenses')
      .insert({
        user_id: null,               // fill later if you add auth
        trade: data.trade,
        state: data.state.toUpperCase(),
        license_number: data.license_number,
        status: 'pending',
      })
      .select('id')
      .single();

    if (error) throw new Error(error.message);

    return NextResponse.json({ ok: true, id: inserted!.id });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || String(err) },
      { status: 500 }
    );
  }
}
