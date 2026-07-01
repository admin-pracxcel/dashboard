export async function fetchLeads({ fresh = false } = {}) {
  const url = fresh ? '/api/leads?fresh=1' : '/api/leads';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch leads: ${res.status}`);
  return res.json();
}

export async function fetchAdsMetrics(startDate, endDate) {
  const res = await fetch(`/api/ads-metrics?startDate=${startDate}&endDate=${endDate}`);
  if (!res.ok) throw new Error(`Failed to fetch ads metrics: ${res.status}`);
  return res.json();
}
