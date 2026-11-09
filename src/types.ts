export type Language = 'id' | 'en';

export interface StatItem {
  value: string;
  label: { id: string; en: string };
  detail: { id: string; en: string };
}

export interface PersonalInfo {
  name: string;
  title: { id: string; en: string };
  bio: { id: string; en: string };
  status: { id: string; en: string };
  email: string;
  github: string;
  linkedin: string;
  location: string;
  heroImage: string;
  stats: StatItem[];
}

export interface Project {
  id: string;
  title: string;
  tagline: {
    id: string;
    en: string;
  };
  category: 'saas' | 'ai' | 'commerce' | 'creative';
  client: string;
  year: string;
  role: {
    id: string;
    en: string;
  };
  deliverables: string[];
  techStack: string[];
  metrics: {
    label: { id: string; en: string };
    value: string;
  }[];
  image: string;
  overview: {
    id: string;
    en: string;
  };
  challenge: {
    id: string;
    en: string;
  };
  solution: {
    id: string;
    en: string;
  };
  features: {
    title: { id: string; en: string };
    desc: { id: string; en: string };
  }[];
  demoUrl?: string;
  githubUrl?: string;
  hasInteractiveDemo?: boolean;
}

export interface Experience {
  period: string;
  role: {
    id: string;
    en: string;
  };
  company: string;
  location: string;
  type: {
    id: string;
    en: string;
  };
  description: {
    id: string;
    en: string;
  };
  achievements: {
    id: string;
    en: string;
  }[];
  technologies: string[];
}

export interface SkillCategory {
  title: {
    id: string;
    en: string;
  };
  skills: {
    name: string;
    level: string; // e.g. "Expert", "Advanced"
    highlight?: boolean;
  }[];
}

export interface Testimonial {
  quote: {
    id: string;
    en: string;
  };
  name: string;
  role: string;
  company: string;
  initials: string;
}
