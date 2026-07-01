export default async function handler(req, res) {
  const { startDate, endDate } = req.query;
  if (!startDate || !endDate) {
    return res.status(400).json({ error: 'startDate and endDate are required' });
  }

  const webhookUrl = process.env.N8N_ADS_WEBHOOK_URL;
  if (!webhookUrl) {
    return res.status(500).json({ error: 'N8N_ADS_WEBHOOK_URL is not configured' });
  }

  try {
    const url = `${webhookUrl}?startDate=${startDate}&endDate=${endDate}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`n8n returned ${response.status}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Ads metrics error:', err);
    res.status(500).json({ error: 'Failed to fetch ads metrics' });
  }
}
