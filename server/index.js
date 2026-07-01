import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { fetchLeadsFromSheets } from './sheets.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/leads', async (req, res) => {
  try {
    const fresh = req.query.fresh === '1';
    const data = await fetchLeadsFromSheets({ fresh });
    res.json(data);
  } catch (err) {
    console.error('Fatal error fetching leads:', err);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

const N8N_WEBHOOK_URL = process.env.N8N_ADS_WEBHOOK_URL;

app.get('/api/ads-metrics', async (req, res) => {
  const { startDate, endDate } = req.query;
  if (!startDate || !endDate) {
    return res.status(400).json({ error: 'startDate and endDate are required' });
  }
  if (!N8N_WEBHOOK_URL) {
    return res.status(500).json({ error: 'N8N_ADS_WEBHOOK_URL is not configured' });
  }
  try {
    const url = `${N8N_WEBHOOK_URL}?startDate=${startDate}&endDate=${endDate}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`n8n returned ${response.status}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Ads metrics error:', err);
    res.status(500).json({ error: 'Failed to fetch ads metrics' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on :${PORT}`);
});
