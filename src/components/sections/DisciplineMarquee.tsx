import {
  Cable,
  Construction,
  Cog,
  Flame,
  Forklift,
  Gauge,
  HardHat,
  Pipette,
  ShieldCheck,
  Wrench,
  Zap,
  Ruler,
} from 'lucide-react';

const rowA = [
  { icon: HardHat, label: 'Site Supervision' },
  { icon: Flame, label: 'Pipeline Welding' },
  { icon: Zap, label: 'Electrical Works' },
  { icon: Gauge, label: 'Instrumentation' },
  { icon: Wrench, label: 'Mechanical Maintenance' },
  { icon: Forklift, label: 'Crane Operation' },
];
const rowB = [
  { icon: Construction, label: 'Scaffolding' },
  { icon: Cog, label: 'Rotating Equipment' },
  { icon: Cable, label: 'Cable Pulling' },
  { icon: ShieldCheck, label: 'HSE Officers' },
  { icon: Pipette, label: 'Piping & Fitting' },
  { icon: Ruler, label: 'QA / QC Inspection' },
];

function Row({ items, reverse = false }: { items: typeof rowA; reverse?: boolean }) {
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div className={`animate-mobile-autoscroll gap-4 py-2 ${reverse ? 'marquee-reverse' : ''}`}>
        {[...items, ...items, ...items].map(({ icon: Icon, label }, i) => (
          <span
            key={`${label}-${i}`}
            className="flex shrink-0 items-center gap-3 rounded-full border border-white/10 bg-white/5 py-2.5 pl-2.5 pr-6 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-[#7CC4F0]/50 hover:bg-petro-blue/20"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-petro-blue/90">
              <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
            </span>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Two counter-scrolling rows of trade disciplines with icons. */
export function DisciplineMarquee() {
  return (
    <section aria-label="Trade disciplines" className="space-y-3 bg-[#071827] py-12">
      <Row items={rowA} />
      <Row items={rowB} reverse />
    </section>
  );
}
