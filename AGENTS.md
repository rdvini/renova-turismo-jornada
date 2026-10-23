
- Metrics dashboard: the `metrics-overview` edge function returns raw rows (current + previous period) and all aggregation lives in `src/lib/metrics.ts`, so the logic stays unit-testable in one place.
- UTM attribution: `src/lib/utm.ts` stores the session UTMs; every tracker inserts them via `utmColumns()` so clicks inherit the campaign that brought the visitor.
- Traffic hygiene: `src/lib/bots.ts` decides what is real traffic; trackers skip recording via `shouldTrack()` and `src/lib/metrics.ts` (`cleanPayload`) filters past robot/internal/duplicate rows, so both new and historical data follow the same rules.
