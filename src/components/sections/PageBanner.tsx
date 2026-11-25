import { getImageProps } from 'next/image';
import { KineticText, ScrambleEyebrow } from '@/components/ui/KineticText';
import { Reveal } from '@/components/ui/motion/Reveal';
import { Breadcrumbs, type BreadcrumbItem } from '@/components/ui/Breadcrumbs';

interface PageBannerProps {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  mobileImage?: string;
  imageAlt: string;
  breadcrumbs: BreadcrumbItem[];
}

export function PageBanner({
  eyebrow,
  title,
  description,
  image,
  mobileImage,
  imageAlt,
  breadcrumbs,
}: PageBannerProps) {
  const common = { alt: imageAlt, fill: true, priority: true, sizes: '100vw', quality: 70 } as const;
  const { props: desktop } = getImageProps({ ...common, src: image });
  const { props: mobile } = getImageProps({ ...common, src: mobileImage || image });

  return (
    <section className="relative overflow-hidden bg-petro-navy pb-16 pt-32 text-white sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40">
      <div className="absolute inset-0">
        {/* Art-directed: phones download only the mobile crop */}
        <picture>
          {mobileImage && <source media="(min-width: 768px)" srcSet={desktop.srcSet} sizes="100vw" />}
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img
            {...(mobileImage ? mobile : desktop)}
            alt={imageAlt}
            className="banner-kenburns absolute inset-0 h-full w-full object-cover opacity-35"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-[#101820] via-[#101820]/85 to-[#101820]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101820] via-transparent to-[#101820]/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 2xl:px-16">
        <Breadcrumbs items={breadcrumbs} theme="dark" />
        <ScrambleEyebrow text={eyebrow} className="text-[#B8D0DE]" />
        <KineticText
          as="h1"
          mode="words"
          triggerOnScroll={false}
          text={title}
          className="mt-3 max-w-3xl font-heading text-3xl font-bold leading-tight tracking-industrial text-white sm:text-5xl"
        />
        <Reveal delay={0.35}>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {description}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
