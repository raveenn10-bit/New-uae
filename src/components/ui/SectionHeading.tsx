import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  theme?: 'light' | 'dark';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  theme = 'light',
  className = '',
}: SectionHeadingProps) {
  const isDark = theme === 'dark';

  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            'mb-3 inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widecaps',
            isDark ? 'text-[#7CC4F0]' : 'text-petro-blue'
          )}
        >
          <span
            className={cn(
              'h-[2px] w-7',
              isDark ? 'bg-[#7CC4F0]' : 'bg-petro-blue'
            )}
          />
          <span>{eyebrow}</span>
        </div>
      )}
      <h2
        className={cn(
          'font-heading text-3xl font-bold tracking-industrial sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]',
          isDark ? 'text-white' : 'text-petro-navy'
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 text-base leading-relaxed sm:text-lg',
            isDark ? 'text-slate-300' : 'text-petro-steel'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
