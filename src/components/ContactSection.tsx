import React, { useState, useEffect } from 'react';
import { Mail, MessageSquare, Copy, Check, Clock, Send } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Language, PersonalInfo } from '../types';

interface ContactSectionProps {
  lang: Language;
  prefilledMessage?: string;
  personalInfo?: PersonalInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  lang,
  prefilledMessage = '',
  personalInfo = PERSONAL_INFO,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'saas',
    message: '',
  });

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [jakartaTime, setJakartaTime] = useState('');

  // Pre-fill message if passed from calculator
  useEffect(() => {
    if (prefilledMessage) {
      setFormData((prev) => ({ ...prev, message: prefilledMessage }));
    }
  }, [prefilledMessage]);

  // Live Jakarta clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'Asia/Jakarta',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        };
        const formatter = new Intl.DateTimeFormat([], options);
        setJakartaTime(formatter.format(now));
      } catch {
        setJakartaTime('18:30:00');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      lang === 'id'
        ? `Halo Kanzora, nama saya ${formData.name || '[Nama Anda]'}. Saya ingin berdiskusi mengenai proyek: ${formData.message || 'pengembangan produk web'}`
        : `Hi Kanzora, my name is ${formData.name || '[Your Name]'}. I would like to discuss: ${formData.message || 'a product engineering project'}`
    );
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
  };

  const t = {
    sectionNum: '06',
    heading: lang === 'id' ? 'Mulai Percakapan & Kolaborasi' : 'Initiate Collaboration & Discovery',
    subtitle: lang === 'id'
      ? 'Memiliki visi produk baru, butuh audit arsitektur sistem, atau ingin mendiskusikan peluang kerja sama? Kirimkan pesan singkat.'
      : 'Have an upcoming product launch, need an architectural audit, or exploring advisory? Let us start a dialogue.',
    nameLabel: lang === 'id' ? 'Nama Lengkap' : 'Full Name',
    emailLabel: lang === 'id' ? 'Alamat Email' : 'Email Address',
    typeLabel: lang === 'id' ? 'Tipe Kebutuhan' : 'Engagement Type',
    msgLabel: lang === 'id' ? 'Ringkasan Kebutuhan Proyek' : 'Project Scope or Brief',
    sendBtn: lang === 'id' ? 'Kirim Pesan' : 'Transmit Message',
    sending: lang === 'id' ? 'Mengirimkan...' : 'Transmitting...',
    sentSuccess: lang === 'id' ? 'Pesan Berhasil Terkirim!' : 'Message Successfully Dispatched!',
    sentNote: lang === 'id'
      ? 'Terima kasih atas pesan Anda. Kanzora akan merespons dalam waktu 1x24 jam kerja.'
      : 'Thank you for reaching out. Kanzora will review your brief and reply within 24 business hours.',
    resetBtn: lang === 'id' ? 'Kirim Pesan Lainnya' : 'Send Another Message',
    quickChannels: lang === 'id' ? 'Kanal Komunikasi Cepat' : 'Direct Communication Channels',
    directEmail: lang === 'id' ? 'Email Resmi' : 'Direct Email',
    whatsappText: lang === 'id' ? 'Diskusi Instan via WhatsApp' : 'Chat via WhatsApp',
    currentTime: lang === 'id' ? 'Waktu Lokal Jakarta (WIB · UTC+7)' : 'Local Time in Jakarta (WIB · UTC+7)',
  };

  return (
    <section id="about" className="py-20 lg:py-28 max-w-7xl mx-auto px-6 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-2xl mb-12">
        <div className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-2 tracking-wider">
          {t.sectionNum}. CONTACT & DISCOVERY
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white [text-wrap:balance]">
          {t.heading}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                {t.sentSuccess}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
                {t.sentNote}
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', projectType: 'saas', message: '' });
                }}
                className="mt-4 px-4 py-2 text-xs font-medium text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                {t.resetBtn}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1.5">
                    {t.nameLabel} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Aditya Nugraha"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1.5">
                    {t.emailLabel} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="aditya@perusahaan.com"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1.5">
                  {t.typeLabel}
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white transition-all cursor-pointer"
                >
                  <option value="saas">Enterprise SaaS / Web App Development</option>
                  <option value="mvp">Rapid MVP 0-to-1 Architecture</option>
                  <option value="design-system">Design System & WCAG AA Modernization</option>
                  <option value="advisory">Technical Advisory & Performance Audit</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1.5">
                  {t.msgLabel} <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={lang === 'id' ? 'Ceritakan tentang produk yang sedang Anda bangun, timeline yang diharapkan, dan tantangan teknis utama...' : 'Tell me about the product you are building, timeline expectations, and core engineering requirements...'}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white transition-all"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-950 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? t.sending : t.sendBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDirectWhatsApp}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{t.whatsappText}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Direct Info Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-base font-bold text-zinc-950 dark:text-white mb-6">
              {t.quickChannels}
            </h3>

            {/* Email quick copy */}
            <div className="mb-6 pb-6 border-b border-zinc-200/80 dark:border-zinc-800">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block mb-2">
                {t.directEmail}
              </span>
              <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                <span className="text-sm font-mono text-zinc-900 dark:text-zinc-100 font-medium truncate">
                  {personalInfo.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors shrink-0"
                  title="Copy email"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Live Clock & Timezone */}
            <div className="space-y-4">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">
                {t.currentTime}
              </span>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-2xl font-mono font-bold tracking-tight text-zinc-950 dark:text-white tabular-nums">
                  {jakartaTime || '18:30:00'} WIB
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {lang === 'id'
                  ? 'Kanzora berbasis di Jakarta (WIB / UTC+7) dan terbiasa berkolaborasi secara sinkron maupun asinkron dengan tim di zona waktu Pasifik, Eropa, dan Asia Pasifik.'
                  : 'Kanzora is based in Jakarta (UTC+7) with seasoned experience coordinating across PT, CET, and APAC time offsets.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
