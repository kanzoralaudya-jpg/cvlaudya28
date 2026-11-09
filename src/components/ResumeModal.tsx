import React, { useEffect } from 'react';
import { X, Printer, Download, Mail, MapPin, Globe, Check, Copy } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, CV_DATA, SKILL_CATEGORIES } from '../data/portfolioData';
import { Language, PersonalInfo } from '../types';

interface ResumeModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
  personalInfo?: PersonalInfo;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  lang,
  onClose,
  personalInfo = PERSONAL_INFO,
}) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    const md = `# ${personalInfo.name}
${personalInfo.title[lang]} | ${personalInfo.email} | ${personalInfo.location}

## Summary
${CV_DATA.summary[lang]}

## Experience
${EXPERIENCES.map(
  (e) => `### ${e.role[lang]} — ${e.company} (${e.period})
${e.description[lang]}
Key Achievements:
${e.achievements.map((a) => `- ${a[lang]}`).join('\n')}
Technologies: ${e.technologies.join(', ')}
`
).join('\n')}

## Education
${CV_DATA.education.map((ed) => `- ${ed.degree[lang]} — ${ed.institution} (${ed.period})\n  ${ed.honors[lang]}`).join('\n')}

## Certifications
${CV_DATA.certifications.map((c) => `- ${c.name} (${c.issuer}, ${c.year})`).join('\n')}
`;
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const t = {
    title: lang === 'id' ? 'Curriculum Vitae / Profil Pribadi' : 'Curriculum Vitae / Personal Profile',
    printBtn: lang === 'id' ? 'Cetak / Simpan PDF' : 'Print / Export PDF',
    copyMd: lang === 'id' ? 'Salin Format Markdown' : 'Copy as Markdown',
    copied: lang === 'id' ? 'Markdown Tersalin' : 'Markdown Copied',
    summary: lang === 'id' ? 'Riwayat Pendidikan' : 'Educational Trajectory',
    experience: lang === 'id' ? 'Pengalaman & Pembelajaran' : 'Experience & Learning',
    education: lang === 'id' ? 'Daftar Jenjang Pendidikan' : 'Formal Education Records',
    aspiration: lang === 'id' ? 'Cita-cita Karier' : 'Career Aspiration',
    motivation: lang === 'id' ? 'Motivasi Hidup' : 'Core Motivation',
    certifications: lang === 'id' ? 'Keahlian & Sertifikasi' : 'Certifications & Skills',
    languages: lang === 'id' ? 'Kemampuan Bahasa' : 'Languages',
    skills: lang === 'id' ? 'Keahlian Inti' : 'Core Proficiencies',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-zinc-950/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-4xl my-auto rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
      >
        {/* Modal Toolbar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <h2 id="resume-modal-title" className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              {t.title}
            </h2>
            <span className="text-xs font-mono text-zinc-400">· 2026 EDITION</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? t.copied : t.copyMd}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-lg transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.printBtn}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-white rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Sheet */}
        <div className="p-6 sm:p-12 max-h-[80vh] overflow-y-auto space-y-8 print:p-0 print:max-h-none">
          {/* Resume Header */}
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-8">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white mb-2">
              {personalInfo.name}
            </h1>
            <p className="text-base font-medium text-zinc-700 dark:text-zinc-300 mb-4">
              {personalInfo.title[lang]}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                {personalInfo.email}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {personalInfo.location}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" />
                portfolio.dev
              </span>
            </div>
          </div>

          {/* Riwayat Pendidikan Section */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
              {t.summary}
            </h3>
            <div className="space-y-3 p-5 rounded-xl bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800">
              <div className="flex flex-col gap-2.5 text-xs text-zinc-800 dark:text-zinc-200">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60 dark:border-zinc-800">
                  <span className="font-semibold text-zinc-950 dark:text-white">Perguruan Tinggi</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">Universitas Komputama Cilacap</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60 dark:border-zinc-800">
                  <span className="font-semibold text-zinc-950 dark:text-white">Sekolah Menengah Atas (SMA)</span>
                  <span className="text-zinc-600 dark:text-zinc-300">SMA Negeri 01 Salem (Jurusan IPA)</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60 dark:border-zinc-800">
                  <span className="font-semibold text-zinc-950 dark:text-white">Sekolah Menengah Pertama (SMP)</span>
                  <span className="text-zinc-600 dark:text-zinc-300">SMP Negeri 01 Salem</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60 dark:border-zinc-800">
                  <span className="font-semibold text-zinc-950 dark:text-white">Sekolah Dasar (SD)</span>
                  <span className="text-zinc-600 dark:text-zinc-300">SD Negeri 02 Salem</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-zinc-950 dark:text-white">Taman Kanak-Kanak (TK)</span>
                  <span className="text-zinc-600 dark:text-zinc-300">TK Silih Asih Salem</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cita-cita & Motivasi Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block mb-2">
                {t.aspiration}
              </span>
              <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                {CV_DATA.careerGoal[lang]}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-2">
                {t.motivation}
              </span>
              <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-semibold italic">
                &ldquo;{CV_DATA.motivation[lang]}&rdquo;
              </p>
            </div>
          </div>

          {/* Experience Section */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-6">
              {t.experience}
            </h3>
            <div className="space-y-6">
              {EXPERIENCES.map((exp, i) => (
                <div key={i} className="space-y-2 p-4 rounded-xl bg-zinc-50/50 dark:bg-zinc-950/40 border border-zinc-100 dark:border-zinc-900">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {exp.role[lang]} — <span className="font-semibold text-zinc-700 dark:text-zinc-300">{exp.company}</span>
                    </h4>
                    <span className="text-xs font-mono text-zinc-500 shrink-0">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {exp.description[lang]}
                  </p>
                  <ul className="space-y-1 pt-1">
                    {exp.achievements.map((ach, aI) => (
                      <li key={aI} className="text-xs text-zinc-700 dark:text-zinc-300 flex items-start gap-2">
                        <span className="text-zinc-400 font-mono mt-0.5">•</span>
                        <span>{ach[lang]}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 pt-1">
                    Fokus: {exp.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Languages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
                {t.certifications}
              </h3>
              <ul className="space-y-2 text-xs">
                {CV_DATA.certifications.map((cert, i) => (
                  <li key={i} className="text-zinc-700 dark:text-zinc-300">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">{cert.name}</span>
                    <span className="text-zinc-500"> · {cert.issuer} ({cert.year})</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
                {t.languages}
              </h3>
              <ul className="space-y-2 text-xs">
                {CV_DATA.languages.map((l, i) => (
                  <li key={i} className="text-zinc-700 dark:text-zinc-300 flex justify-between">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">{l.name}</span>
                    <span className="text-zinc-500 font-mono">{l.proficiency[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
