import AnimatedNumber from './AnimatedNumber';

export default function StatCard({ label, value, sublabel, accent = 'brand' }) {
  const styles = {
    brand: {
      border: 'accent-left-brand',
      text: 'text-brand',
      badge: 'bg-brand-light text-brand-dark',
      dot: 'bg-brand',
    },
    rose: {
      border: 'accent-left-rose',
      text: 'text-accent-rose',
      badge: 'bg-accent-rose-light text-accent-rose-dark',
      dot: 'bg-accent-rose',
    },
  };

  const s = styles[accent] || styles.brand;

  return (
    <div className={`card ${s.border} p-6 transition-all duration-300 hover:-translate-y-1`}>
      <div className="flex items-center gap-2">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${s.badge}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${s.dot} animate-pulse-soft`} />
          {label}
        </span>
      </div>
      <p className={`mt-4 font-display text-5xl ${s.text}`}>
        <AnimatedNumber value={value} />
      </p>
      {sublabel && (
        <p className="mt-2 text-xs text-gray-400">{sublabel}</p>
      )}
    </div>
  );
}
