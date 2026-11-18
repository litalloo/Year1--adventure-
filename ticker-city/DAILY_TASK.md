# Daily refresh task

A scheduled task ("Ticker City daily refresh") runs every weekday at 6:13pm New York time,
after the US market closes. It starts a fresh Claude session with the prompt below.
It writes to the artifact's database; it never republishes the page.

Artifact: https://claude.ai/artifact/YA6SqcKgFAT7paumaF8mVg

## Prompt

1. Read collections `stocks` and `mywatch` (note each doc's `version`).
2. Find each stock's latest close and % change by web search. Update `price`, `changePct`, `priceDate`.
   If a close can't be confirmed, keep the old price.
3. Re-grade with the `stock-fundamental-analysis` skill (quick-screen mode) when there is material news
   or `analyzedAt` is 30+ days old.
4. Create a `stocks` doc for every `mywatch` ticker that doesn't have one yet.
5. Refresh Buzz Boulevard (`district: "buzz"`): about 5 of the most-mentioned tickers on
   X, r/wallstreetbets, r/stocks and StockTwits. Skip ETFs/indexes.
6. Write changes in `batch` calls pinned with `if_version`, then update `meta/status`.
