import { useQuery } from '@tanstack/react-query';
import { fetchAdsMetrics } from '../lib/api';

const AD_SPEND_OVERRIDES = [
  { monthFrom: '2026-08-01', monthTo: '2026-08-31', adSpend: 1536.5 },
];

function findOverride(startDate, endDate) {
  if (!startDate || !endDate) return null;
  return AD_SPEND_OVERRIDES.find((o) => startDate <= o.monthFrom && endDate >= o.monthTo);
}

export function useAdsMetrics(startDate, endDate) {
  const override = findOverride(startDate, endDate);
  const needsSlice = !!override && (startDate !== override.monthFrom || endDate !== override.monthTo);

  const primary = useQuery({
    queryKey: ['ads-metrics', startDate, endDate],
    queryFn: () => fetchAdsMetrics(startDate, endDate),
    enabled: !!startDate && !!endDate,
  });

  const slice = useQuery({
    queryKey: ['ads-metrics', override?.monthFrom, override?.monthTo],
    queryFn: () => fetchAdsMetrics(override.monthFrom, override.monthTo),
    enabled: needsSlice,
  });

  if (!override || !primary.data) return primary;

  if (!needsSlice) {
    return { ...primary, data: { ...primary.data, adSpend: override.adSpend } };
  }

  if (!slice.data) {
    return { ...primary, isLoading: true, data: undefined };
  }

  const adSpend = primary.data.adSpend - slice.data.adSpend + override.adSpend;
  return { ...primary, data: { ...primary.data, adSpend } };
}
