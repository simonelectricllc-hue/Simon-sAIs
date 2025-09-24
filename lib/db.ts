// lib/db.ts
import { Pool } from 'pg';

// Last-resort fix for serverless cert chains
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const connStr = process.env.DATABASE_URL || '';
if (!connStr) {
  console.error('DATABASE_URL is missing');
}

export const pool = new Pool({
  connectionString: connStr,
  ssl: { require: true, rejectUnauthorized: false },
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
