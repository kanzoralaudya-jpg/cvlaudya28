import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Language } from '../types';

interface SkillsSectionProps {
  lang: Language;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ lang }) => {
  const t = {
    sectionNum: '03',
    heading: lang === 'id' ? 'Keahlian Teknis & Domain Spesialisasi' : 'Technical Competencies & Domain Mastery',
    subtitle: lang === 'id'
      ? 'Daftar kapabilitas rekayasa yang teruji di lingkungan produksi berskala jutaan pengguna.'
      : 'Engineering disciplines and tooling battle-tested across mission-critical production environments.',
  };

  return (
    <section id="expertise" className="py-20 lg:py-28 max-w-7xl mx-auto px-6">
      <div className="max-w-2xl mb-12">
        <div className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-2 tracking-wider">
          {t.sectionNum}. TECHNICAL MATRIX
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white [text-wrap:balance]">
          {t.heading}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* 4-Column Domain Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {SKILL_CATEGORIES.map((category, catIdx) => (
          <div
            key={catIdx}
            className="p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-base font-bold text-zinc-950 dark:text-white mb-6 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                {category.title[lang]}
              </h3>

              {/* Skill list: clean unboxed typography without pills */}
              <ul className="space-y-3.5">
                {category.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="flex items-center justify-between text-xs">
                    <span className="font-medium text-zinc-800 dark:text-zinc-200">
                      {skill.name}
                    </span>
                    <span className="font-mono text-zinc-400 dark:text-zinc-500">
                      {skill.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Subtle bottom note */}
            <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
              DOM.{String(catIdx + 1).padStart(2, '0')} // PRODUCTION READY
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
