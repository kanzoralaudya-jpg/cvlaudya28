import React, { useState } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  User,
  FolderGit2,
  BarChart3,
  RotateCcw,
  Download,
  Check,
  Plus,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { PersonalInfo, Project, StatItem, Language } from '../types';
import { PRESET_HERO_IMAGES, PRESET_PROJECT_IMAGES } from '../data/portfolioData';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  personalInfo: PersonalInfo;
  onUpdatePersonalInfo: (info: PersonalInfo) => void;
  projects: Project[];
  onUpdateProjects: (projects: Project[]) => void;
  onResetToDefault: () => void;
}

export const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  lang,
  personalInfo,
  onUpdatePersonalInfo,
  projects,
  onUpdateProjects,
  onResetToDefault,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'stats' | 'backup'>('profile');
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [savedToast, setSavedToast] = useState(false);

  // Local editable draft state
  const [draftProfile, setDraftProfile] = useState<PersonalInfo>(personalInfo);
  const [draftProjects, setDraftProjects] = useState<Project[]>(projects);

  // Sync draft when modal opens or props change
  React.useEffect(() => {
    setDraftProfile(personalInfo);
    setDraftProjects(projects);
  }, [personalInfo, projects, isOpen]);

  if (!isOpen) return null;

  const showToast = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2200);
  };

  const handleSaveProfile = () => {
    onUpdatePersonalInfo(draftProfile);
    showToast();
  };

  const handleSaveProjects = () => {
    onUpdateProjects(draftProjects);
    showToast();
  };

  // Profile image upload handler (FileReader Data URL)
  const handleHeroFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const updated = { ...draftProfile, heroImage: reader.result };
          setDraftProfile(updated);
          onUpdatePersonalInfo(updated);
          showToast();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Selected project handlers
  const currentProjectIndex = draftProjects.findIndex((p) => p.id === selectedProjectId);
  const currentProject = draftProjects[currentProjectIndex] || draftProjects[0];

  const handleUpdateCurrentProject = (updatedFields: Partial<Project>) => {
    if (currentProjectIndex === -1) return;
    const nextProjects = [...draftProjects];
    nextProjects[currentProjectIndex] = {
      ...nextProjects[currentProjectIndex],
      ...updatedFields,
    };
    setDraftProjects(nextProjects);
    onUpdateProjects(nextProjects);
    showToast();
  };

  // Project image upload handler
  const handleProjectFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && currentProjectIndex !== -1) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          handleUpdateCurrentProject({ image: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new project
  const handleAddNewProject = () => {
    const newId = `project-${Date.now()}`;
    const newProj: Project = {
      id: newId,
      title: lang === 'id' ? 'Proyek Baru' : 'New Project',
      tagline: {
        id: 'Deskripsi singkat mengenai solusi dan teknologi yang dirancang.',
        en: 'Brief description of the solution and architectural tech stack.',
      },
      category: 'saas',
      client: 'Klien Kustom',
      year: '2026',
      role: {
        id: 'Full-Stack Developer & Designer',
        en: 'Full-Stack Developer & Designer',
      },
      deliverables: ['Web Application', 'Responsive UI'],
      techStack: ['React', 'TypeScript', 'Tailwind CSS'],
      metrics: [
        { label: { id: 'Peningkatan Kinerja', en: 'Performance Boost' }, value: '+120%' },
      ],
      image: PRESET_PROJECT_IMAGES[0].url,
      overview: {
        id: 'Ringkasan komprehensif tentang proyek.',
        en: 'Comprehensive summary of the project.',
      },
      challenge: {
        id: 'Tantangan teknis yang dihadapi.',
        en: 'Technical obstacles encountered.',
      },
      solution: {
        id: 'Solusi arsitektur yang diimplementasikan.',
        en: 'Architectural solution engineered.',
      },
      features: [
        {
          title: { id: 'Fitur Utama', en: 'Core Feature' },
          desc: { id: 'Deskripsi fitur terperinci.', en: 'Detailed feature description.' },
        },
      ],
      demoUrl: '#',
      githubUrl: 'https://github.com',
      hasInteractiveDemo: false,
    };

    const nextList = [newProj, ...draftProjects];
    setDraftProjects(nextList);
    setSelectedProjectId(newId);
    onUpdateProjects(nextList);
    showToast();
  };

  // Delete project
  const handleDeleteProject = (id: string) => {
    if (draftProjects.length <= 1) return;
    const nextList = draftProjects.filter((p) => p.id !== id);
    setDraftProjects(nextList);
    setSelectedProjectId(nextList[0]?.id || '');
    onUpdateProjects(nextList);
    showToast();
  };

  // Export JSON
  const handleExportJSON = () => {
    const payload = {
      personalInfo: draftProfile,
      projects: draftProjects,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-data-${draftProfile.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result as string);
          if (parsed.personalInfo) {
            setDraftProfile(parsed.personalInfo);
            onUpdatePersonalInfo(parsed.personalInfo);
          }
          if (parsed.projects && Array.isArray(parsed.projects)) {
            setDraftProjects(parsed.projects);
            onUpdateProjects(parsed.projects);
          }
          showToast();
        } catch {
          // ignore corrupted json
        }
      };
      reader.readAsText(file);
    }
  };

  const t = {
    title: lang === 'id' ? 'Edit & Kustomisasi Portofolio' : 'Portfolio Content & Media Editor',
    subtitle: lang === 'id'
      ? 'Ubah foto, nama, headline, proyek, gambar sampul, dan data lainnya secara langsung dengan pratinjau instan.'
      : 'Customize your photos, name, headlines, projects, and metrics with real-time live preview.',
    tabProfile: lang === 'id' ? 'Profil & Foto' : 'Profile & Photo',
    tabProjects: lang === 'id' ? 'Proyek & Karya' : 'Projects & Media',
    tabStats: lang === 'id' ? 'Statistik & KPI' : 'Key Metrics',
    tabBackup: lang === 'id' ? 'Ekspor & Reset' : 'Backup & Reset',
    saveChanges: lang === 'id' ? 'Simpan Perubahan' : 'Save Changes',
    savedMsg: lang === 'id' ? 'Perubahan Berhasil Disimpan!' : 'Changes Saved Successfully!',
    close: lang === 'id' ? 'Tutup' : 'Close',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-zinc-950/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-4xl my-auto rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-modal-title"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm shrink-0">
          <div>
            <h2 id="edit-modal-title" className="text-base font-bold text-zinc-950 dark:text-white flex items-center gap-2">
              <span>{t.title}</span>
              {savedToast && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 rounded-md">
                  <Check className="w-3 h-3" />
                  {t.savedMsg}
                </span>
              )}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {t.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-zinc-950 dark:border-white text-zinc-950 dark:text-white font-semibold'
                : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>{t.tabProfile}</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'projects'
                ? 'border-zinc-950 dark:border-white text-zinc-950 dark:text-white font-semibold'
                : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>{t.tabProjects}</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'stats'
                ? 'border-zinc-950 dark:border-white text-zinc-950 dark:text-white font-semibold'
                : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{t.tabStats}</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'backup'
                ? 'border-zinc-950 dark:border-white text-zinc-950 dark:text-white font-semibold'
                : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.tabBackup}</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: PROFILE & HERO IMAGE */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Image Editor Section */}
              <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                      {lang === 'id' ? 'Foto Profil & Hero' : 'Hero Profile Photo'}
                    </h3>
                    <p className="text-xs text-zinc-500">
                      {lang === 'id' ? 'Ganti dengan upload foto sendiri, masukkan URL, atau pilih preset studio.' : 'Upload your own portrait, paste an image URL, or choose studio presets.'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Current Image Preview */}
                  <div className="w-32 h-36 rounded-xl overflow-hidden border border-zinc-300 dark:border-zinc-700 bg-zinc-200 dark:bg-zinc-800 shrink-0 relative">
                    <img
                      src={draftProfile.heroImage}
                      alt="Hero Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Upload Controls & URL input */}
                  <div className="flex-1 w-full space-y-3">
                    <div>
                      <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                        {lang === 'id' ? 'Upload Foto Sendiri (Komputer / HP)' : 'Upload Your Photo (Local File)'}
                      </label>
                      <label className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 cursor-pointer transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{lang === 'id' ? 'Pilih Berkas Gambar...' : 'Choose Image File...'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleHeroFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                        {lang === 'id' ? 'Atau Masukkan URL Gambar Kustom' : 'Or Custom Image URL'}
                      </label>
                      <input
                        type="url"
                        value={draftProfile.heroImage}
                        onChange={(e) => {
                          const updated = { ...draftProfile, heroImage: e.target.value };
                          setDraftProfile(updated);
                          onUpdatePersonalInfo(updated);
                        }}
                        placeholder="https://..."
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono"
                      />
                    </div>

                    {/* Presets */}
                    <div>
                      <span className="text-[11px] font-medium text-zinc-500 block mb-1.5">
                        {lang === 'id' ? 'Preset Studio Pilihan:' : 'Or Select Studio Preset:'}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {PRESET_HERO_IMAGES.map((preset) => (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => {
                              const updated = { ...draftProfile, heroImage: preset.url };
                              setDraftProfile(updated);
                              onUpdatePersonalInfo(updated);
                              showToast();
                            }}
                            className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                              draftProfile.heroImage === preset.url
                                ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-900 dark:border-white font-medium'
                                : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
                            }`}
                          >
                            {preset.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1.5">
                    {lang === 'id' ? 'Nama Lengkap' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    value={draftProfile.name}
                    onChange={(e) => {
                      const updated = { ...draftProfile, name: e.target.value };
                      setDraftProfile(updated);
                      onUpdatePersonalInfo(updated);
                    }}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1.5">
                    {lang === 'id' ? 'Alamat Email' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    value={draftProfile.email}
                    onChange={(e) => {
                      const updated = { ...draftProfile, email: e.target.value };
                      setDraftProfile(updated);
                      onUpdatePersonalInfo(updated);
                    }}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1.5">
                    {lang === 'id' ? 'Jabatan / Judul Profesional' : 'Professional Title'}
                  </label>
                  <input
                    type="text"
                    value={draftProfile.title[lang]}
                    onChange={(e) => {
                      const updated = {
                        ...draftProfile,
                        title: { ...draftProfile.title, [lang]: e.target.value },
                      };
                      setDraftProfile(updated);
                      onUpdatePersonalInfo(updated);
                    }}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1.5">
                    {lang === 'id' ? 'Lokasi' : 'Location'}
                  </label>
                  <input
                    type="text"
                    value={draftProfile.location}
                    onChange={(e) => {
                      const updated = { ...draftProfile, location: e.target.value };
                      setDraftProfile(updated);
                      onUpdatePersonalInfo(updated);
                    }}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1.5">
                  {lang === 'id' ? 'Bio & Filosofi Teknik' : 'Bio & Engineering Philosophy'} ({lang.toUpperCase()})
                </label>
                <textarea
                  rows={4}
                  value={draftProfile.bio[lang]}
                  onChange={(e) => {
                    const updated = {
                      ...draftProfile,
                      bio: { ...draftProfile.bio, [lang]: e.target.value },
                    };
                    setDraftProfile(updated);
                    onUpdatePersonalInfo(updated);
                  }}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 leading-relaxed"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="px-5 py-2.5 text-xs font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-950 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm"
                >
                  {t.saveChanges}
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS & MEDIA */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              {/* Project selector & Add button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2 overflow-x-auto">
                  {draftProjects.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProjectId(p.id)}
                      className={`px-3 py-1.5 text-xs rounded-lg whitespace-nowrap transition-colors ${
                        currentProject?.id === p.id
                          ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-bold'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
                      }`}
                    >
                      {p.title}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleAddNewProject}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-950 rounded-lg hover:bg-zinc-800"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{lang === 'id' ? 'Tambah Proyek' : 'Add Project'}</span>
                  </button>

                  {draftProjects.length > 1 && (
                    <button
                      onClick={() => handleDeleteProject(currentProject?.id)}
                      className="p-1.5 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg"
                      title="Hapus Proyek Ini"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {currentProject && (
                <div className="space-y-5">
                  {/* Project Image Editor */}
                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3">
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider block">
                      {lang === 'id' ? 'Gambar Sampul Proyek' : 'Project Cover Media'}
                    </span>

                    <div className="flex flex-col sm:flex-row items-center gap-5">
                      <div className="w-44 aspect-16/10 rounded-lg overflow-hidden border border-zinc-300 dark:border-zinc-700 bg-zinc-200 shrink-0">
                        <img
                          src={currentProject.image}
                          alt={currentProject.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 w-full space-y-2">
                        <label className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 rounded-lg hover:bg-zinc-800 cursor-pointer transition-colors">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{lang === 'id' ? 'Upload Gambar Proyek...' : 'Upload Project Image...'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleProjectFileUpload}
                            className="hidden"
                          />
                        </label>

                        <div>
                          <input
                            type="url"
                            value={currentProject.image}
                            onChange={(e) => handleUpdateCurrentProject({ image: e.target.value })}
                            placeholder="URL gambar..."
                            className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono"
                          />
                        </div>

                        {/* Preset project mockups */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {PRESET_PROJECT_IMAGES.map((preset) => (
                            <button
                              key={preset.id}
                              type="button"
                              onClick={() => handleUpdateCurrentProject({ image: preset.url })}
                              className={`px-2 py-1 text-[11px] rounded-md border transition-colors ${
                                currentProject.image === preset.url
                                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-medium'
                                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800'
                              }`}
                            >
                              {preset.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                        {lang === 'id' ? 'Judul Proyek' : 'Project Title'}
                      </label>
                      <input
                        type="text"
                        value={currentProject.title}
                        onChange={(e) => handleUpdateCurrentProject({ title: e.target.value })}
                        className="w-full px-3 py-2 text-sm rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                        {lang === 'id' ? 'Nama Klien / Organisasi' : 'Client / Org'}
                      </label>
                      <input
                        type="text"
                        value={currentProject.client}
                        onChange={(e) => handleUpdateCurrentProject({ client: e.target.value })}
                        className="w-full px-3 py-2 text-sm rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                        {lang === 'id' ? 'Tahun Rilis' : 'Year'}
                      </label>
                      <input
                        type="text"
                        value={currentProject.year}
                        onChange={(e) => handleUpdateCurrentProject({ year: e.target.value })}
                        className="w-full px-3 py-2 text-sm rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                      {lang === 'id' ? 'Tagline / Ringkasan' : 'Tagline / Summary'} ({lang.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={currentProject.tagline[lang]}
                      onChange={(e) =>
                        handleUpdateCurrentProject({
                          tagline: { ...currentProject.tagline, [lang]: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-sm rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>

                  {/* Primary Metric */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                    <div>
                      <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                        {lang === 'id' ? 'Angka Metrik Utama' : 'Key Metric Figure'}
                      </label>
                      <input
                        type="text"
                        value={currentProject.metrics[0]?.value || ''}
                        onChange={(e) => {
                          const nextMetrics = [...currentProject.metrics];
                          nextMetrics[0] = {
                            ...nextMetrics[0],
                            value: e.target.value,
                          };
                          handleUpdateCurrentProject({ metrics: nextMetrics });
                        }}
                        className="w-full px-3 py-2 text-sm font-mono font-bold rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                        {lang === 'id' ? 'Label Metrik' : 'Metric Label'} ({lang.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={currentProject.metrics[0]?.label[lang] || ''}
                        onChange={(e) => {
                          const nextMetrics = [...currentProject.metrics];
                          nextMetrics[0] = {
                            ...nextMetrics[0],
                            label: { ...nextMetrics[0].label, [lang]: e.target.value },
                          };
                          handleUpdateCurrentProject({ metrics: nextMetrics });
                        }}
                        className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
                      />
                    </div>
                  </div>

                  {/* Tech Stack list as comma-separated */}
                  <div>
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                      {lang === 'id' ? 'Teknologi (pisahkan dengan koma)' : 'Tech Stack (comma-separated)'}
                    </label>
                    <input
                      type="text"
                      value={currentProject.techStack.join(', ')}
                      onChange={(e) => {
                        const parsed = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                        handleUpdateCurrentProject({ techStack: parsed });
                      }}
                      className="w-full px-3 py-2 text-sm font-mono rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: KEY METRICS & STATS */}
          {activeTab === 'stats' && (
            <div className="space-y-5">
              <p className="text-xs text-zinc-500">
                {lang === 'id'
                  ? 'Ubah 4 angka metrik utama yang muncul di bawah bagian Hero.'
                  : 'Customize the 4 core metric figures displayed in the full-width strip below the Hero.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {draftProfile.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3"
                  >
                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                        METRIC #{idx + 1} VALUE
                      </label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => {
                          const nextStats = [...draftProfile.stats];
                          nextStats[idx] = { ...nextStats[idx], value: e.target.value };
                          const updated = { ...draftProfile, stats: nextStats };
                          setDraftProfile(updated);
                          onUpdatePersonalInfo(updated);
                        }}
                        className="w-full px-3 py-1.5 text-base font-mono font-bold rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-950 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                        LABEL ({lang.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={stat.label[lang]}
                        onChange={(e) => {
                          const nextStats = [...draftProfile.stats];
                          nextStats[idx] = {
                            ...nextStats[idx],
                            label: { ...nextStats[idx].label, [lang]: e.target.value },
                          };
                          const updated = { ...draftProfile, stats: nextStats };
                          setDraftProfile(updated);
                          onUpdatePersonalInfo(updated);
                        }}
                        className="w-full px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: BACKUP & RESET */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-4">
                <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                  {lang === 'id' ? 'Cadangkan & Impor Konfigurasi' : 'Backup & Import Data'}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {lang === 'id'
                    ? 'Anda dapat mengunduh seluruh data teks, proyek, dan gambar ke dalam file JSON untuk disimpan di komputer, atau mengunggah kembali file cadangan kapan saja.'
                    : 'Download your full portfolio configuration as a JSON file, or restore from a previously exported backup file.'}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={handleExportJSON}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-950 rounded-lg hover:bg-zinc-800"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{lang === 'id' ? 'Unduh Backup Portofolio (JSON)' : 'Download Backup (JSON)'}</span>
                  </button>

                  <label className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{lang === 'id' ? 'Impor File Backup (JSON)...' : 'Import Backup File...'}</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJSON}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-rose-200 dark:border-rose-950/60 bg-rose-50/50 dark:bg-rose-950/20 space-y-3">
                <h3 className="text-sm font-bold text-rose-900 dark:text-rose-200">
                  {lang === 'id' ? 'Kembalikan ke Pengaturan Awal' : 'Reset to Default Template'}
                </h3>
                <p className="text-xs text-rose-700 dark:text-rose-400 leading-relaxed">
                  {lang === 'id'
                    ? 'Tindakan ini akan mengembalikan seluruh teks, gambar, dan proyek kembali ke data portofolio awal Kanzora Laudya.'
                    : 'This will revert all customizations, photos, and project texts back to the original portfolio dataset.'}
                </p>
                <button
                  onClick={() => {
                    onResetToDefault();
                    onClose();
                  }}
                  className="px-4 py-2 text-xs font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors"
                >
                  {lang === 'id' ? 'Reset Semua Perubahan' : 'Reset All to Default'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 flex items-center justify-between shrink-0">
          <div className="text-xs text-zinc-500 font-mono">
            {lang === 'id' ? '*Perubahan tersimpan otomatis di browser' : '*Changes auto-saved in local browser state'}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-950 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
