/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeDivider } from './components/MarqueeDivider';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { InteractiveLab } from './components/InteractiveLab';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ResumeModal } from './components/ResumeModal';
import { EditModal } from './components/EditModal';
import { PERSONAL_INFO, PROJECTS } from './data/portfolioData';
import { Language, Project, PersonalInfo } from './types';

const STORAGE_KEY_PROFILE = 'laudya_portfolio_profile_v3';
const STORAGE_KEY_PROJECTS = 'laudya_portfolio_projects_v3';

export default function App() {
  const [lang, setLang] = useState<Language>('id');
  const [isDark, setIsDark] = useState<boolean>(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [prefilledContactMessage, setPrefilledContactMessage] = useState<string>('');
  const [activeLabTab, setActiveLabTab] = useState<'market' | 'audio' | 'calculator'>('market');

  // Load customizable personal info from localStorage with fallback
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.name && parsed.name !== 'Kanzora Laudya') {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return PERSONAL_INFO;
  });

  // Load customizable projects from localStorage with fallback
  const [projectsList, setProjectsList] = useState<Project[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PROJECTS);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return PROJECTS;
  });

  // Sync dark class on document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [isDark]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'id' ? 'en' : 'id'));
  };

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleUpdatePersonalInfo = (newInfo: PersonalInfo) => {
    setPersonalInfo(newInfo);
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(newInfo));
    } catch {
      // storage full or blocked
    }
  };

  const handleUpdateProjects = (newProjects: Project[]) => {
    setProjectsList(newProjects);
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(newProjects));
    } catch {
      // storage full or blocked
    }
  };

  const handleResetToDefault = () => {
    localStorage.removeItem(STORAGE_KEY_PROFILE);
    localStorage.removeItem(STORAGE_KEY_PROJECTS);
    setPersonalInfo(PERSONAL_INFO);
    setProjectsList(PROJECTS);
  };

  const handleOpenContact = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenLiveLabWithProject = (projectId: string) => {
    if (projectId === 'nexus-intelligence') {
      setActiveLabTab('market');
    } else if (projectId === 'aether-resonance') {
      setActiveLabTab('audio');
    } else {
      setActiveLabTab('calculator');
    }
    const labEl = document.getElementById('lab');
    if (labEl) {
      labEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyEstimateToContact = (estimateText: string) => {
    setPrefilledContactMessage(estimateText);
    const contactEl = document.getElementById('about');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      {/* 3-Zone Top Bar Navigation */}
      <Navbar
        lang={lang}
        brandName={personalInfo.name}
        onToggleLang={toggleLang}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenContact={handleOpenContact}
        onOpenEdit={() => setIsEditOpen(true)}
      />

      {/* Main Content Layout */}
      <main>
        {/* Split-Screen Hero with full-width metric strip below */}
        <Hero
          lang={lang}
          personalInfo={personalInfo}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenContact={handleOpenContact}
          onOpenEdit={() => setIsEditOpen(true)}
        />

        {/* Section Divider Ribbon */}
        <MarqueeDivider lang={lang} />

        {/* Selected Works & Bento Case Studies */}
        <ProjectsShowcase
          lang={lang}
          projects={projectsList}
          onSelectProject={(p) => setSelectedProject(p)}
          onOpenLiveLabWithProject={handleOpenLiveLabWithProject}
          onOpenEdit={() => setIsEditOpen(true)}
        />

        {/* Live Interactive Prototyping Lab (Streaming, Web Audio, Scope Calculator) */}
        <InteractiveLab
          lang={lang}
          initialTab={activeLabTab}
          key={activeLabTab}
          onApplyEstimateToContact={handleApplyEstimateToContact}
        />

        {/* Technical Domain Matrix */}
        <SkillsSection lang={lang} />

        {/* Career Trajectory & Experience */}
        <ExperienceSection lang={lang} />

        {/* Social Proof & Attributable Testimonials */}
        <TestimonialsSection lang={lang} />

        {/* Contact, Inquiries & Local Time */}
        <ContactSection
          lang={lang}
          personalInfo={personalInfo}
          prefilledMessage={prefilledContactMessage}
        />
      </main>

      {/* Clean Quiet Footer */}
      <Footer lang={lang} personalInfo={personalInfo} />

      {/* Project Deep-Dive Modal */}
      <ProjectDetailModal
        project={selectedProject}
        lang={lang}
        onClose={() => setSelectedProject(null)}
        onOpenLiveLabWithProject={handleOpenLiveLabWithProject}
      />

      {/* Resume / CV Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        lang={lang}
        personalInfo={personalInfo}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Full Live Content & Media Customizer / Editor */}
      <EditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        lang={lang}
        personalInfo={personalInfo}
        onUpdatePersonalInfo={handleUpdatePersonalInfo}
        projects={projectsList}
        onUpdateProjects={handleUpdateProjects}
        onResetToDefault={handleResetToDefault}
      />
    </div>
  );
}
