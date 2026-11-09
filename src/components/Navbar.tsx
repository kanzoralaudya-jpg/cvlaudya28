import React from 'react';
import { Sun, Moon, Globe, ArrowUpRight, Menu, X } from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenContact: () => void;
  onOpenEdit: () => void;
  brandName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  isDark,
  onToggleTheme,
  onOpenContact,
  onOpenEdit,
  brandName = 'Kanzora Laudya',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const t = {
    works: lang === 'id' ? 'Karya' : 'Works',
    lab: lang === 'id' ? 'Lab Interaktif' : 'Live Lab',
    expertise: lang === 'id' ? 'Keahlian' : 'Expertise',
    experience: lang === 'id' ? 'Pengalaman' : 'Experience',
    about: lang === 'id' ? 'Tentang' : 'About',
    contact: lang === 'id' ? 'Mulai Diskusi' : 'Start Discussion',
    edit: lang === 'id' ? 'Edit Konten & Foto' : 'Edit Content & Photos',
  };

  const navLinks = [
    { label: t.works, href: '#works' },
    { label: t.lab, href: '#lab' },
    { label: t.expertise, href: '#expertise' },
    { label: t.experience, href: '#experience' },
    { label: t.about, href: '#about' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-base font-bold tracking-tight text-zinc-950 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors whitespace-nowrap shrink-0"
        >
          {brandName}
        </a>

        {/* Zone 2: 4-5 single-line clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-zinc-900 dark:after:bg-zinc-100 hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + compact controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Edit Customizer Trigger */}
          <button
            onClick={onOpenEdit}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap shrink-0"
            title={t.edit}
            aria-label="Edit portofolio"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{lang === 'id' ? 'Edit' : 'Edit'}</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono font-medium rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors whitespace-nowrap shrink-0"
            title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang.toUpperCase()}</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={onToggleTheme}
            className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md transition-colors shrink-0"
            title={isDark ? 'Mode Terang' : 'Mode Gelap'}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Primary CTA */}
          <button
            onClick={onOpenContact}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-950 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            <span>{t.contact}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-md"
            aria-label="Open mobile navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 px-6 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium py-2 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-950 rounded-lg"
          >
            <span>{t.contact}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </header>
  );
};
