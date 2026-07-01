import AnimatedNumber from './AnimatedNumber';

function MetricCard({ label, children, icon }) {
  return (
    <div className="card p-5 transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-center gap-2">
        {icon && <span className="text-base">{icon}</span>}
        <p className="text-sm font-medium text-gray-400">{label}</p>
      </div>
      <div className="mt-2 font-display text-3xl text-gray-900">
        {children}
      </div>
    </div>
  );
}

export default function AdsMetricsSection({ data, isLoading, isError }) {
  if (isLoading) {
    return (
      <section className="animate-slide-up stagger-4 opacity-0">
        <div className="mb-5 flex items-baseline gap-3">
          <span className="inline-flex rounded-lg bg-brand-light px-3 py-1.5 text-sm font-bold uppercase tracking-wider text-brand-dark">
            Google Ads
          </span>
          <span className="text-base font-medium text-gray-600">Performance Metrics</span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 rounded-2xl skeleton-shimmer" />
          ))}
        </div>
      </section>
    );
  }

  if (isError || !data) return null;

  return (
    <section className="animate-slide-up stagger-4 opacity-0">
      <div className="mb-5 flex items-baseline gap-3">
        <span className="inline-flex rounded-lg bg-brand-light px-3 py-1.5 text-sm font-bold uppercase tracking-wider text-brand-dark">
          Google Ads
        </span>
        <span className="text-base font-medium text-gray-600">Performance Metrics</span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <MetricCard label="Clicks" icon="🖱️">
          <AnimatedNumber value={data.clicks} />
        </MetricCard>

        <MetricCard label="CTR" icon="📊">
          {data.ctr}%
        </MetricCard>

        <MetricCard label="Ad Spend" icon="💰">
          ${data.adSpend.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </MetricCard>
      </div>

      {data.conversionType && Object.keys(data.conversionType).length > 0 && (
        <div className="mt-4">
          <div className="card p-5">
            <p className="mb-3 text-sm font-medium text-gray-400">Conversion Breakdown</p>
            <div className="space-y-2">
              {Object.entries(data.conversionType)
                .sort(([, a], [, b]) => b - a)
                .map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{type}</span>
                    <span className="font-display text-lg text-brand">{count}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
