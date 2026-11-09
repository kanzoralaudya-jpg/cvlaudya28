import React from 'react';
import { EXPERIENCES } from '../data/portfolioData';
import { Language } from '../types';

interface ExperienceSectionProps {
  lang: Language;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ lang }) => {
  const t = {
    sectionNum: '04',
    heading: lang === 'id' ? 'Pengalaman SMA, Pendidikan & Cita-cita' : 'Academic Journey, Experience & Aspiration',
    subtitle: lang === 'id'
      ? 'Perjalanan dari masa SMA jurusan IPA, pendidikan tinggi di Universitas Komputama Cilacap, hingga tekad menjadi Konsultan IT profesional.'
      : 'From high school science studies, university education at Universitas Komputama Cilacap, to the ambition of becoming a professional IT Consultant.',
    achievementsHeading: lang === 'id' ? 'Fokus & Pencapaian:' : 'Highlights & Learnings:',
  };

  return (
    <section id="experience" className="py-20 lg:py-28 max-w-7xl mx-auto px-6 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-2xl mb-14">
        <div className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-2 tracking-wider">
          {t.sectionNum}. CAREER TIMELINE
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white [text-wrap:balance]">
          {t.heading}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Editorial Timeline Items */}
      <div className="space-y-12">
        {EXPERIENCES.map((exp, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 pb-12 border-b border-zinc-100 dark:border-zinc-900 last:border-b-0"
          >
            {/* Left Column: Period & Company */}
            <div className="lg:col-span-4">
              <span className="text-xs font-mono font-semibold text-zinc-500 dark:text-zinc-400 tracking-wider">
                {exp.period}
              </span>
              <h3 className="text-lg font-bold text-zinc-950 dark:text-white mt-1">
                {exp.company}
              </h3>
              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                <span>{exp.location}</span>
                <span aria-hidden="true">·</span>
                <span>{exp.type[lang]}</span>
              </div>
            </div>

            {/* Right Column: Role, Description, and Impact */}
            <div className="lg:col-span-8">
              <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                {exp.role[lang]}
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                {exp.description[lang]}
              </p>

              {/* Achievements */}
              <div className="mb-6">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block mb-2">
                  {t.achievementsHeading}
                </span>
                <ul className="space-y-2">
                  {exp.achievements.map((ach, aIdx) => (
                    <li
                      key={aIdx}
                      className="text-xs text-zinc-700 dark:text-zinc-300 flex items-start gap-2.5 leading-relaxed"
                    >
                      <span className="text-zinc-400 dark:text-zinc-600 shrink-0 font-mono mt-0.5">—</span>
                      <span>{ach[lang]}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies unboxed list */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                {exp.technologies.map((tech, tIdx) => (
                  <React.Fragment key={tech}>
                    <span>{tech}</span>
                    {tIdx < exp.technologies.length - 1 && <span aria-hidden="true">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
