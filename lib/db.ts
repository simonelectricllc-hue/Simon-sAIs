// lib/db.ts
import { Pool } from 'pg';

const connStr = process.env.DATABASE_URL || '';
if (!connStr) console.error('DATABASE_URL is missing');

// Accept Supabase Pooler certs from serverless (no "require" key here)
export const pool = new Pool({
  connectionString: connStr,          // must include ?sslmode=require in the URL
  ssl: { rejectUnauthorized: false }, // correct TS shape for pg TLS options
});

export async function query<T = any>(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return { rows: res.rows as T[] };
  } finally {
    client.release();
  }
}

export default pool;
