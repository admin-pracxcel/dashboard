import ChannelCard from './ChannelCard';

const config = {
  SEO: {
    accent: 'text-accent-teal',
    tagBg: 'bg-accent-teal-light text-accent-teal-dark',
    websiteIcon: '🌐',
    callIcon: '📞',
  },
  PPC: {
    accent: 'text-brand',
    tagBg: 'bg-brand-light text-brand-dark',
    websiteIcon: '🎯',
    callIcon: '📱',
  },
};

export default function SourceSection({
  title,
  subtitle,
  websiteNewCount,
  callsNewCount,
  onViewWebsite,
  onViewCalls,
}) {
  const c = config[title] || config.SEO;

  return (
    <section>
      <div className="mb-5 flex items-baseline gap-3">
        <span className={`inline-flex rounded-lg px-3 py-1.5 text-sm font-bold uppercase tracking-wider ${c.tagBg}`}>
          {title}
        </span>
        {subtitle && (
          <span className="text-base font-medium text-gray-600">{subtitle}</span>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ChannelCard
          label="Website"
          icon={c.websiteIcon}
          count={websiteNewCount}
          buttonLabel="View leads"
          onButtonClick={onViewWebsite}
          accentClass={c.accent}
        />
        <ChannelCard
          label="Phone Call"
          icon={c.callIcon}
          count={callsNewCount}
          buttonLabel="View calls"
          onButtonClick={onViewCalls}
          accentClass={c.accent}
        />
      </div>
    </section>
  );
}
