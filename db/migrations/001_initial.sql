CREATE TABLE IF NOT EXISTS profiles (
 id text PRIMARY KEY, name text NOT NULL, username text NOT NULL UNIQUE,
 bio text NOT NULL DEFAULT '', avatar text, banner text,
 role text NOT NULL DEFAULT 'member' CHECK(role IN ('member','admin','demo')),
 xp integer NOT NULL DEFAULT 0 CHECK(xp>=0),status text NOT NULL DEFAULT 'Online',created bigint NOT NULL
);
CREATE TABLE IF NOT EXISTS anime (
 id text PRIMARY KEY,title text NOT NULL,genre text NOT NULL,year integer NOT NULL,rating integer NOT NULL,data text NOT NULL
);
CREATE INDEX IF NOT EXISTS anime_genre_year ON anime(genre,year);
CREATE TABLE IF NOT EXISTS records (
 id text PRIMARY KEY,owner text NOT NULL REFERENCES profiles(id),kind text NOT NULL,target text NOT NULL DEFAULT '',
 visibility text NOT NULL DEFAULT 'public' CHECK(visibility IN ('public','private')),data text NOT NULL,created bigint NOT NULL,updated bigint NOT NULL
);
CREATE INDEX IF NOT EXISTS records_kind_target ON records(kind,target,created);
CREATE INDEX IF NOT EXISTS records_owner_kind ON records(owner,kind);
CREATE INDEX IF NOT EXISTS records_visibility ON records(visibility,kind);
CREATE TABLE IF NOT EXISTS uploads (
 id text PRIMARY KEY,owner text NOT NULL REFERENCES profiles(id),name text NOT NULL,type text NOT NULL,size integer NOT NULL,created bigint NOT NULL
);
CREATE INDEX IF NOT EXISTS uploads_owner ON uploads(owner);
CREATE TABLE IF NOT EXISTS rate_limits(key text PRIMARY KEY,count integer NOT NULL,window_id bigint NOT NULL);
-- Server-only access: the API verifies identity and authorizes each operation.
-- Supabase Data API must not expose these tables directly to browser roles.
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE anime ENABLE ROW LEVEL SECURITY;
ALTER TABLE records ENABLE ROW LEVEL SECURITY;
ALTER TABLE uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON profiles,anime,records,uploads,rate_limits FROM anon,authenticated;
