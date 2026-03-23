export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { token_id } = req.query;
  if (!token_id) return res.status(400).json({ error: 'token_id required' });

  try {
    const [buyRes, sellRes, midRes] = await Promise.all([
      fetch(`https://clob.polymarket.com/price?token_id=${token_id}&side=BUY`, { headers: { 'User-Agent': 'Mozilla/5.0' } }),
      fetch(`https://clob.polymarket.com/price?token_id=${token_id}&side=SELL`, { headers: { 'User-Agent': 'Mozilla/5.0' } }),
      fetch(`https://clob.polymarket.com/midpoint?token_id=${token_id}`, { headers: { 'User-Agent': 'Mozilla/5.0' } }),
    ]);

    const [buy, sell, mid] = await Promise.all([buyRes.json(), sellRes.json(), midRes.json()]);
    res.status(200).json({ buy, sell, mid });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
