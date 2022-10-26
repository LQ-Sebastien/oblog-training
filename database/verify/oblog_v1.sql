-- Verify oblog_sqitch:oblog_v1 on pg

BEGIN;

SELECT * FROM post, category;

ROLLBACK;
