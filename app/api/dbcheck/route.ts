import { NextResponse } from "next/server";
import { Pool } from "pg";

export async function GET() {
  try {
    const raw = process.env.DATABASE_URL;
    if (!raw) {
      throw new Error("DATABASE_URL is not set");
    }

    const pool = new Pool({
      connectionString: raw,
      ssl: {
        rejectUnauthorized: false, // ✅ Fixes "self-signed certificate" error
      },
    });

    const client = await pool.connect();
    const result = await client.query("SELECT NOW()");
    client.release();

    return NextResponse.json({
      ok: true,
      time: result.rows[0],
    });
  } catch (err: any) {
    return NextResponse.json({
      ok: false,
      error: err.message,
    });
  }
}
