import React, { useEffect } from 'react';
import { X, ArrowUpRight, Github, CheckCircle2, Play } from 'lucide-react';
import { Project, Language } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  lang: Language;
  onClose: () => void;
  onOpenLiveLabWithProject?: (projectId: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  lang,
  onClose,
  onOpenLiveLabWithProject,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const t = {
    overview: lang === 'id' ? 'Gambaran Umum' : 'Executive Overview',
    challenge: lang === 'id' ? 'Tantangan Rekayasa' : 'Engineering Challenge',
    solution: lang === 'id' ? 'Solusi Arsitektur' : 'Architectural Solution',
    features: lang === 'id' ? 'Fitur & Kapabilitas Kunci' : 'Key Technical Modules',
    metrics: lang === 'id' ? 'Dampak & Metrik Terukur' : 'Quantitative Impact',
    deliverables: lang === 'id' ? 'Hasil Kerja' : 'Deliverables',
    stack: lang === 'id' ? 'Teknologi Digunakan' : 'Technologies',
    testLab: lang === 'id' ? 'Uji di Interactive Lab' : 'Launch Interactive Simulator',
    close: lang === 'id' ? 'Tutup (ESC)' : 'Close (ESC)',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-zinc-950/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-4xl my-auto rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        {/* Sticky modal header with close button */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
            <span className="font-bold text-zinc-900 dark:text-zinc-100">{project.client}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto space-y-8">
          {/* Hero Banner */}
          <div className="relative w-full aspect-16/9 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-800">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Title & Tagline */}
          <div>
            <h2 id="project-modal-title" className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white mb-2">
              {project.title}
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {project.tagline[lang]}
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80">
            {project.metrics.map((m, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-2xl font-mono font-bold text-zinc-950 dark:text-white tabular-nums">
                  {m.value}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {m.label[lang]}
                </span>
              </div>
            ))}
          </div>

          {/* Overview, Challenge, Solution */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                {t.overview}
              </h3>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {project.overview[lang]}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <div>
                <h3 className="text-sm font-mono uppercase tracking-wider text-rose-500 dark:text-rose-400 mb-2">
                  {t.challenge}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {project.challenge[lang]}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                  {t.solution}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {project.solution[lang]}
                </p>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4">
              {t.features}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.features.map((feat, i) => (
                <div key={i} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/60 dark:border-zinc-800">
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                    {feat.title[lang]}
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {feat.desc[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Metadata (Unboxed) */}
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              {t.stack}
            </h3>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-zinc-600 dark:text-zinc-400">
              {project.techStack.map((tech, i) => (
                <React.Fragment key={tech}>
                  <span>{tech}</span>
                  {i < project.techStack.length - 1 && <span aria-hidden="true">·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {project.hasInteractiveDemo && onOpenLiveLabWithProject && (
              <button
                onClick={() => {
                  onClose();
                  onOpenLiveLabWithProject(project.id);
                }}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-950 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{t.testLab}</span>
              </button>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Source Archive</span>
            </a>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
