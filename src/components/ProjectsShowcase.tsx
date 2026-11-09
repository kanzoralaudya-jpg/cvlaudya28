import React, { useState } from 'react';
import { ArrowUpRight, Play, Layers, ExternalLink } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Language, Project } from '../types';

interface ProjectsShowcaseProps {
  lang: Language;
  projects?: Project[];
  onSelectProject: (project: Project) => void;
  onOpenLiveLabWithProject?: (projectId: string) => void;
  onOpenEdit?: () => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({
  lang,
  projects = PROJECTS,
  onSelectProject,
  onOpenLiveLabWithProject,
  onOpenEdit,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: lang === 'id' ? 'Semua Proyek' : 'All Projects' },
    { id: 'saas', label: lang === 'id' ? 'SaaS & FinTech' : 'SaaS & FinTech' },
    { id: 'ai', label: lang === 'id' ? 'Workspace AI' : 'AI Workspaces' },
    { id: 'commerce', label: lang === 'id' ? 'E-Commerce Mewah' : 'Artisanal Commerce' },
    { id: 'creative', label: lang === 'id' ? 'Audio & WebGL' : 'Audio & WebGL' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const t = {
    sectionNum: '01',
    heading: lang === 'id' ? 'Studi Kasus & Karya Pilihan' : 'Selected Works & Case Studies',
    subtitle: lang === 'id'
      ? 'Setiap proyek dirancang dengan fokus pada ketahanan sistem, arsitektur data presisi, dan pengalaman pengguna tingkat tinggi.'
      : 'Each engagement is executed with a relentless focus on system resiliency, data fidelity, and top-tier user craft.',
    viewDetails: lang === 'id' ? 'Baca Studi Kasus' : 'Read Case Study',
    interactiveLab: lang === 'id' ? 'Uji Coba Interaktif' : 'Launch Interactive Lab',
  };

  return (
    <section id="works" className="py-20 lg:py-28 max-w-7xl mx-auto px-6">
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <div className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-2 tracking-wider">
            {t.sectionNum}. PORTFOLIO OVERVIEW
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white [text-wrap:balance]">
            {t.heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Interactive Filter Tabs and Edit Trigger */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-end">
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {onOpenEdit && (
            <button
              onClick={onOpenEdit}
              className="px-3 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-xl transition-colors whitespace-nowrap shrink-0"
              title="Edit atau tambah proyek"
            >
              {lang === 'id' ? 'Edit Proyek / Gambar' : 'Edit Projects / Media'}
            </button>
          )}
        </div>
      </div>

      {/* Bento Grid Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {filteredProjects.map((project, idx) => {
          // Asymmetric Bento rhythm: First project is wide 12-col spotlight, next two are 6-col, etc.
          const isLead = idx === 0 && activeCategory === 'all';
          const colSpan = isLead ? 'lg:col-span-12' : 'lg:col-span-6';

          return (
            <div
              key={project.id}
              className={`${colSpan} group flex flex-col justify-between rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/90 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 shadow-xs hover:shadow-md`}
            >
              {/* Media Slot */}
              <div
                className="relative overflow-hidden cursor-pointer bg-zinc-100 dark:bg-zinc-800 aspect-16/10"
                onClick={() => onSelectProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-transparent transition-colors duration-300" />
                
                {/* Clean hover action pill replacement: quiet corner prompt */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950/80 backdrop-blur-md text-white text-xs font-medium">
                    <span>{t.viewDetails}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Project Card Content */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  {/* Clean unboxed metadata with typographic separator · */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-3">
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">{project.client}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.year}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.role[lang]}</span>
                  </div>

                  {/* Title and Tagline */}
                  <h3
                    onClick={() => onSelectProject(project)}
                    className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white cursor-pointer hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors mb-2"
                  >
                    {project.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                    {project.tagline[lang]}
                  </p>

                  {/* Tech stack metadata (clean unboxed text) */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400 mb-6 font-mono">
                    {project.techStack.map((tech, i) => (
                      <React.Fragment key={tech}>
                        <span className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">{tech}</span>
                        {i < project.techStack.length - 1 && <span aria-hidden="true">/</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Metrics & Actions */}
                <div className="pt-5 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Key quantifiable metric */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl sm:text-2xl font-mono font-bold tabular-nums text-zinc-900 dark:text-zinc-100">
                      {project.metrics[0].value}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      {project.metrics[0].label[lang]}
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    {project.hasInteractiveDemo && onOpenLiveLabWithProject && (
                      <button
                        onClick={() => onOpenLiveLabWithProject(project.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200/70 dark:hover:bg-zinc-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                        title="Lihat simulasi interaktif di lab"
                      >
                        <Play className="w-3 h-3 text-zinc-600 dark:text-zinc-300 fill-current" />
                        <span>{t.interactiveLab}</span>
                      </button>
                    )}

                    <button
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-950 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>{t.viewDetails}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
