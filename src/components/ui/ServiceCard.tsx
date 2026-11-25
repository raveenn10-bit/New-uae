import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Compass,
  Flame,
  HardHat,
  RefreshCw,
  Settings,
  Users,
  Wrench,
  Zap,
} from 'lucide-react';
import type { ServiceIconName, ServiceItem } from '@/config/services';
import { cn } from '@/lib/utils';

const iconMap: Record<ServiceIconName, React.ComponentType<{ className?: string }>> = {
  HardHat,
  Users,
  Wrench,
  Zap,
  Settings,
  Flame,
  RefreshCw,
  Compass,
};

export function ServiceCard({
  service,
  className = '',
}: {
  service: ServiceItem;
  className?: string;
}) {
  const Icon = iconMap[service.iconName];

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-sm border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-petro-blue/40 hover:shadow-industrial',
        className
      )}
    >
      {/* Responsive Image: dedicated 3:4 portrait on mobile, 4:3 on tablet/desktop */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-petro-navy md:aspect-[4/3]">
        <Image
          src={service.mobileImage}
          alt={service.imageAlt}
          fill
          sizes="(max-width: 767px) 85vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105 md:hidden"
        />
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="hidden object-cover transition-transform duration-700 group-hover:scale-105 md:block"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-petro-navy/80 via-petro-navy/20 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
          <span className="font-heading text-xs font-bold tracking-widest text-[#7CC4F0]">
            {service.code}
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-petro-blue text-white shadow-md">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-heading text-lg font-bold tracking-industrial text-petro-navy transition-colors group-hover:text-petro-blue">
          {service.title}
        </h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-petro-steel">
          {service.shortDescription}
        </p>
        <div className="mt-5 border-t border-slate-100 pt-4">
          <Link
            href={`/services#${service.slug}`}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-petro-navy transition-colors group-hover:text-petro-blue"
          >
            <span>Learn More</span>
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
