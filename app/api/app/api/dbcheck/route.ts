// app/api/dbcheck/route.ts
import { NextResponse } from "next/server";
import { Pool } from "pg";

// REDACT & show shape of the URL the server is actually using
const raw = process.env.DATABASE_URL || "";
const shape = raw
  ? raw
      .replace(/:[^@]+@/, ":***@") // hide password
      .replace(/([a-z0-9]{6})[a-z0-9]+(\.pooler\.supabase\.com)/, "$1***$2")
  : "MISSING";

export async function GET() {
  try {
    const pool = new Pool({
      connectionString: raw,
      ssl: { require: true, rejectUnauthorized: false },
    });
    const client = await pool.connect();
    const r = await client.query("select 1 as ok");
    client.release();

    return NextResponse.json({
      ok: true,
      urlShape: shape,
      result: r.rows[0],
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        urlShape: shape,
        error: String(err?.message || err),
        stack: err?.stack?.split("\n").slice(0, 3),
      },
      { status: 500 }
    );
  }
}
