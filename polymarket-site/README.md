# Polymarket Live Markets

Live 5-minute and 15-minute crypto prediction market viewer. Mirrors Polymarket's BTC, ETH, SOL, XRP up/down markets with real-time odds, price-to-beat, countdown timer.

## Deploy to Vercel (free, ~3 minutes)

### Option A — No GitHub needed (drag & drop)

1. Go to https://vercel.com and sign up (free)
2. Click **Add New → Project**
3. Click **"Deploy from your computer"** or drag this entire folder
4. Click Deploy
5. Done — you get a live URL like `https://your-site.vercel.app`

### Option B — Via GitHub

1. Push this folder to a GitHub repo
2. Go to https://vercel.com → Import → select your repo
3. Click Deploy

## Project Structure

```
/
├── index.html          ← Frontend (the market viewer)
├── vercel.json         ← Vercel routing config
└── api/
    ├── market.js       ← Proxies gamma-api.polymarket.com
    └── price.js        ← Proxies clob.polymarket.com
```

## How it works

- `index.html` calls `/api/market` and `/api/price` (your own server)
- Those API routes fetch from Polymarket on the server side (no CORS issues)
- BTC/ETH prices come directly from Binance (CORS-friendly)
- Market slugs are calculated deterministically from the current timestamp
  - e.g. `btc-updown-5m-1774275000`
- Auto-refreshes every 30 seconds, and reloads when a window settles
