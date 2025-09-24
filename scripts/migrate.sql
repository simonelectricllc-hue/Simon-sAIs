
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  display_name TEXT,
  role TEXT NOT NULL DEFAULT 'homeowner',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS licenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  trade TEXT NOT NULL CHECK (trade IN ('electric','plumbing','hvac','gc')),
  state TEXT NOT NULL,
  license_number TEXT NOT NULL,
  doc_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID,
  title TEXT NOT NULL,
  body_md TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  state TEXT NOT NULL DEFAULT 'open',
  accepted_answer_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  embedding vector(1536)
);
CREATE TABLE IF NOT EXISTS answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL,
  author_id UUID,
  body_md TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  embedding vector(1536)
);
CREATE INDEX IF NOT EXISTS idx_q_fts ON questions USING GIN (to_tsvector('english', title || ' ' || body_md));
CREATE INDEX IF NOT EXISTS idx_a_qid ON answers(question_id);
CREATE INDEX IF NOT EXISTS idx_q_vec ON questions USING ivfflat (embedding vector_cosine_ops) WITH (lists=100);
CREATE INDEX IF NOT EXISTS idx_a_vec ON answers USING ivfflat (embedding vector_cosine_ops) WITH (lists=100);
