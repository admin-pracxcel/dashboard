import { useQuery } from '@tanstack/react-query';
import { fetchAdsMetrics } from '../lib/api';

export function useAdsMetrics(startDate, endDate) {
  return useQuery({
    queryKey: ['ads-metrics', startDate, endDate],
    queryFn: () => fetchAdsMetrics(startDate, endDate),
    enabled: !!startDate && !!endDate,
  });
}
