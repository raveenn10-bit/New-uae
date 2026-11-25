import { cn } from '@/lib/utils';
import { KineticText, ScrambleEyebrow } from '@/components/ui/KineticText';
import { Reveal } from '@/components/ui/motion/Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  theme?: 'light' | 'dark';
  className?: string;
}

/**
 * Section heading with typography motion: scrambled eyebrow,
 * word-by-word kinetic title, and blurred description reveal.
 */
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
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <div
          className={cn(
            'mb-4 inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5',
            isDark
              ? 'border-[#7CC4F0]/30 bg-white/5 text-[#7CC4F0]'
              : 'border-petro-blue/20 bg-petro-blue-light text-petro-blue'
          )}
        >
          <span className="relative flex h-2 w-2">
            <span
              className={cn(
                'absolute inline-flex h-full w-full animate-ping rounded-full opacity-60',
                isDark ? 'bg-[#7CC4F0]' : 'bg-petro-blue'
              )}
            />
            <span
              className={cn(
                'relative inline-flex h-2 w-2 rounded-full',
                isDark ? 'bg-[#7CC4F0]' : 'bg-petro-blue'
              )}
            />
          </span>
          <ScrambleEyebrow text={eyebrow} className="font-sans" />
        </div>
      )}
      <KineticText
        as="h2"
        mode="words"
        text={title}
        className={cn(
          'font-heading text-3xl font-bold tracking-industrial sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]',
          isDark ? 'text-white' : 'text-petro-navy'
        )}
      />
      {description && (
        <Reveal delay={0.15}>
          <p
            className={cn(
              'mt-4 text-base leading-relaxed sm:text-lg',
              isDark ? 'text-slate-300' : 'text-petro-steel'
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
