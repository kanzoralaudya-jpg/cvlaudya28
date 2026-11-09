import React, { useState } from 'react';
import { ArrowDown, Copy, Check, FileText, MapPin, Edit3 } from 'lucide-react';
import { PersonalInfo, Language } from '../types';

interface HeroProps {
  lang: Language;
  personalInfo: PersonalInfo;
  onOpenResume: () => void;
  onOpenContact: () => void;
  onOpenEdit?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  personalInfo,
  onOpenResume,
  onOpenContact,
  onOpenEdit,
}) => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const t = {
    kicker: personalInfo.title[lang] || 'Senior Product Engineer & Creative Technologist',
    headlinePrefix: lang === 'id' ? 'Halo, saya' : 'Hello, I am',
    headlineHighlight: personalInfo.name || 'Laudya Salbech Kanzora',
    headlineSuffix: '',
    exploreWork: lang === 'id' ? 'Eksplorasi Proyek' : 'Explore Selected Works',
    viewResume: lang === 'id' ? 'Lihat Resume / CV' : 'View Resume / CV',
    copyEmail: lang === 'id' ? 'Salin Email' : 'Copy Email',
    copiedText: lang === 'id' ? 'Tersalin ke Clipboard' : 'Copied to Clipboard',
    activeStatus: personalInfo.status[lang] || (lang === 'id' ? 'Tersedia untuk Q2/Q3 2026' : 'Available for Q2/Q3 2026'),
    basedIn: personalInfo.location || (lang === 'id' ? 'Berbasis di Jakarta · Kolaborasi Global' : 'Based in Jakarta · Global Remote'),
    editPhoto: lang === 'id' ? 'Ganti Foto' : 'Change Photo',
  };

  return (
    <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Split Hero: Two-column grid matching height */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch mb-16 lg:mb-20">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-between py-2">
            <div>
              {/* Kicker with clean typographic separator */}
              <div className="flex items-center gap-2.5 text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-6 uppercase tracking-wider">
                <span>{t.kicker}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300">
                  <MapPin className="w-3.5 h-3.5" />
                  {personalInfo.location}
                </span>
              </div>

              {/* Display Headline with text-wrap: balance */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 dark:text-white leading-[1.1] mb-6 [text-wrap:balance]">
                {t.headlinePrefix}{' '}
                <span className="text-zinc-800 dark:text-zinc-200 underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-8">
                  {t.headlineHighlight}
                </span>
                {t.headlineSuffix ? ` ${t.headlineSuffix}` : ''}
              </h1>

              {/* Lead Paragraph */}
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mb-8">
                {personalInfo.bio[lang]}
              </p>
            </div>

            {/* CTAs and quick contact action */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href="#works"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-950 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors whitespace-nowrap shrink-0 shadow-sm"
              >
                <span>{t.exploreWork}</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 transition-colors whitespace-nowrap shrink-0"
              >
                <FileText className="w-4 h-4" />
                <span>{t.viewResume}</span>
              </button>

              <button
                onClick={copyEmail}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 border border-transparent hover:border-zinc-200 dark:border-zinc-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                title={personalInfo.email}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500 font-sans font-medium">{t.copiedText}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{personalInfo.email}</span>
                  </>
                )}
              </button>
            </div>

            {/* Subtle trust marker note */}
            <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-900 flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" aria-label="Available for hire" />
              <span>{t.activeStatus}</span>
              <span aria-hidden="true">·</span>
              <span>{t.basedIn}</span>
            </div>
          </div>

          {/* Right Column: Visual Container at Matching Height */}
          <div className="lg:col-span-5 relative group">
            <div className="relative w-full h-80 sm:h-96 lg:h-full min-h-[400px] rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
              <img
                src={personalInfo.heroImage}
                alt={`${personalInfo.name} working in architectural design studio`}
                className="w-full h-full object-cover object-center grayscale-[15%] group-hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              {/* Top Quick Edit Photo Trigger on hover */}
              {onOpenEdit && (
                <button
                  onClick={onOpenEdit}
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950/80 backdrop-blur-md text-white text-xs font-medium hover:bg-zinc-900"
                  title="Ganti foto atau edit profil"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{t.editPhoto}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Full-Width Row of Key Metrics below the split (§2.B rule) */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-8 rounded-2xl bg-zinc-100/70 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-sm">
          {personalInfo.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-3xl sm:text-4xl font-bold font-mono tracking-tight tabular-nums text-zinc-950 dark:text-white mb-1">
                {stat.value}
              </span>
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-200 mb-0.5">
                {stat.label[lang]}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {stat.detail[lang]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
