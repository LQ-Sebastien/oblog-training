-- Revert oblog_sqitch:oblog_v1 from pg

BEGIN;

DROP TABLE IF EXISTS post, category;

COMMIT;
