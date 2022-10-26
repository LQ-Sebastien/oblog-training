-- Deploy oblog_sqitch:oblog_v1 to pg

BEGIN;

CREATE TABLE IF NOT EXISTS "category"
(
  "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "route" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "post" 
(
  "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "category_id" INT NOT NULL REFERENCES "category",
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "excerpt" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

COMMIT;
