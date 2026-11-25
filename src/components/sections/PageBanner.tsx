import Image from 'next/image';
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
  return (
    <section className="relative overflow-hidden bg-petro-navy pb-16 pt-32 text-white sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40">
      <div className="absolute inset-0">
        {mobileImage && (
          <Image
            src={mobileImage}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35 md:hidden"
          />
        )}
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className={`object-cover opacity-35 ${mobileImage ? 'hidden md:block' : ''}`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#101820] via-[#101820]/85 to-[#101820]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101820] via-transparent to-[#101820]/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 2xl:px-16">
        <Breadcrumbs items={breadcrumbs} theme="dark" />
        <p className="text-xs font-semibold uppercase tracking-widecaps text-[#B8D0DE]">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-3xl font-heading text-3xl font-bold leading-tight tracking-industrial text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
