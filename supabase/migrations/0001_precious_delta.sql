/*
  # Create polls and votes tables

  1. New Tables
    - `polls`
      - `id` (uuid, primary key)
      - `title` (text)
      - `deadline` (timestamptz)
      - `created_at` (timestamptz)
    - `votes`
      - `id` (uuid, primary key)
      - `poll_id` (uuid, foreign key)
      - `choice` (text)
      - `device_hash` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Allow anonymous read access to polls and votes
    - Allow anonymous vote creation with device hash uniqueness
*/

CREATE TABLE polls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  deadline timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id uuid REFERENCES polls(id) NOT NULL,
  choice text NOT NULL,
  device_hash text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(poll_id, device_hash)
);

ALTER TABLE polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous read access to polls"
  ON polls
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow anonymous vote creation"
  ON votes
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous read access to votes"
  ON votes
  FOR SELECT
  TO anon
  USING (true);