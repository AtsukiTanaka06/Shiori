-- =============================================================
-- Shiori: reading_records.status に「読書中」(reading) を追加
-- =============================================================

ALTER TABLE reading_records DROP CONSTRAINT IF EXISTS reading_records_status_check;
ALTER TABLE reading_records
  ADD CONSTRAINT reading_records_status_check
  CHECK (status IN ('to_read', 'reading', 'finished'));
