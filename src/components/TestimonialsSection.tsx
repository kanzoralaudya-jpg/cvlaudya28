import React from 'react';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/portfolioData';
import { Language } from '../types';

interface TestimonialsSectionProps {
  lang: Language;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ lang }) => {
  const t = {
    sectionNum: '05',
    heading: lang === 'id' ? 'Testimoni & Suara Kolaborator' : 'Partner Endorsements & Client Voices',
    subtitle: lang === 'id'
      ? 'Kemitraan nyata dengan para pemimpin teknologi dan kepala divisi produk.'
      : 'Firsthand perspectives from technology executives and product directors.',
  };

  return (
    <section className="py-20 lg:py-28 max-w-7xl mx-auto px-6 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-2xl mb-12">
        <div className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-2 tracking-wider">
          {t.sectionNum}. COLLABORATION TRUST
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white [text-wrap:balance]">
          {t.heading}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* 3-Column Testimonial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((test, idx) => (
          <div
            key={idx}
            className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800 flex flex-col justify-between"
          >
            <div>
              <Quote className="w-6 h-6 text-zinc-400 dark:text-zinc-600 mb-6 stroke-1" />
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed italic mb-8">
                &ldquo;{test.quote[lang]}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-200/60 dark:border-zinc-800 flex items-center gap-3">
              {/* Minimal avatar with initials */}
              <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-mono font-bold text-xs text-zinc-800 dark:text-zinc-200 shrink-0">
                {test.initials}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-zinc-950 dark:text-white truncate">
                  {test.name}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                  {test.role} · {test.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
