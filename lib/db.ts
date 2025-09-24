// lib/db.ts
import { Pool } from 'pg';

// Allow Supabase pooler certs from serverless environments
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const connStr = process.env.DATABASE_URL || '';
if (!connStr) console.error('DATABASE_URL is missing');

export const pool = new Pool({
  connectionString: connStr,                       // must include ?sslmode=require
  ssl: { require: true, rejectUnauthorized: false }
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
