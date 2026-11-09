import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Language, PersonalInfo } from '../types';

interface FooterProps {
  lang: Language;
  personalInfo?: PersonalInfo;
}

export const Footer: React.FC<FooterProps> = ({ lang, personalInfo = PERSONAL_INFO }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const t = {
    backToTop: lang === 'id' ? 'Kembali ke Atas' : 'Back to Top',
    copyright: `© ${new Date().getFullYear()} ${personalInfo.name}. Hak Cipta Dilindungi.`,
    curatedWith: lang === 'id'
      ? 'Dirancang dengan disiplin tipografi presisi, React 19, dan Tailwind CSS.'
      : 'Built with typographical discipline, React 19, and Tailwind CSS.',
  };

  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-12 px-6 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <a
            href="#"
            className="text-base font-bold tracking-tight text-zinc-950 dark:text-white"
          >
            {personalInfo.name}
          </a>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            {t.curatedWith}
          </p>
        </div>

        {/* Social Links & Back to Top */}
        <div className="flex items-center gap-6 text-xs text-zinc-500 dark:text-zinc-400">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Email
          </a>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
          >
            <span>{t.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
