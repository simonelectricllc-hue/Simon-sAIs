// lib/db.ts
import { Pool } from 'pg';

const connStr = process.env.DATABASE_URL;
if (!connStr) {
  console.error('DATABASE_URL is missing');
}

const pool = new Pool({
  connectionString: connStr,                 // e.g. ...postgres?sslmode=require
  ssl: { rejectUnauthorized: false },        // needed for Supabase from serverless
});

export async function query<T = any>(text: string, params?: any[]): Promise<{ rows: T[] }> {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return { rows: res.rows as T[] };
  } catch (err) {
    console.error('DB query error:', err);
    throw err;
  } finally {
    client.release();
  }
}

export default pool;
