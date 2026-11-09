import { Project, Experience, SkillCategory, Testimonial, PersonalInfo } from '../types';

export const PRESET_HERO_IMAGES = [
  {
    id: 'studio-desk',
    name: 'Studio Architectural Workspace',
    url: '/src/assets/images/hero_creative_portrait_1794224031142.jpg',
  },
  {
    id: 'creative-engineer',
    name: 'Minimalist Creative Technologist',
    url: '/src/assets/images/portrait_creative_developer_1794224489272.jpg',
  },
];

export const PRESET_PROJECT_IMAGES = [
  {
    id: 'fintech-cockpit',
    name: 'FinTech Dark Terminal',
    url: '/src/assets/images/project_fintech_nebula_1794224031048.jpg',
  },
  {
    id: 'analytics-floating',
    name: 'Floating Analytics Dashboard',
    url: '/src/assets/images/project_dashboard_minimal_1794224489208.jpg',
  },
  {
    id: 'ai-workspace',
    name: 'Collaborative AI Canvas',
    url: '/src/assets/images/project_ai_workspace_1794224032719.jpg',
  },
  {
    id: 'commerce-artisanal',
    name: 'Luxury Artisanal E-Commerce',
    url: '/src/assets/images/project_artisanal_commerce_1794224032933.jpg',
  },
  {
    id: 'spatial-audio',
    name: '3D Spatial Audio Synthesizer',
    url: '/src/assets/images/project_spatial_audio_1794224032547.jpg',
  },
];

export const PERSONAL_INFO: PersonalInfo = {
  name: 'Laudya Salbech Kanzora',
  title: {
    id: 'Mahasiswa Universitas Komputama Cilacap · Calon Konsultan IT',
    en: 'Student at Universitas Komputama Cilacap · Aspiring IT Consultant',
  },
  bio: {
    id: 'Berasal dari jurusan IPA di SMA Negeri 01 Salem yang kini menempuh pendidikan tinggi di Universitas Komputama Cilacap. Memiliki semangat tinggi untuk mencoba hal baru dan memperluas wawasan di bidang teknologi, dengan cita-cita menjadi Konsultan IT profesional.',
    en: 'Alumnus of SMA Negeri 01 Salem (Science Major) currently pursuing higher education at Universitas Komputama Cilacap. Driven by curiosity to explore new domains and motivated to become a professional IT Consultant.',
  },
  status: {
    id: 'Terbuka untuk kolaborasi akademik & pengembangan proyek IT',
    en: 'Open for academic collaboration & IT projects',
  },
  email: 'kanzoralaudya@gmail.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  location: 'Cilacap / Salem, Jawa Tengah',
  heroImage: '/src/assets/images/portrait_creative_developer_1794224489272.jpg',
  stats: [
    {
      value: 'IPA',
      label: { id: 'Latar Belakang SMA', en: 'High School Major' },
      detail: { id: 'SMA Negeri 01 Salem', en: 'SMAN 01 Salem' },
    },
    {
      value: 'S1',
      label: { id: 'Jenjang Perguruan Tinggi', en: 'Higher Education' },
      detail: { id: 'Univ. Komputama Cilacap', en: 'Univ. Komputama Cilacap' },
    },
    {
      value: 'IT',
      label: { id: 'Cita-cita Karier', en: 'Career Goal' },
      detail: { id: 'Konsultan IT Profesional', en: 'Professional IT Consultant' },
    },
    {
      value: '100%',
      label: { id: 'Komitmen Belajar', en: 'Learning Spirit' },
      detail: { id: 'Berkembang esok hari', en: 'Continuous growth' },
    },
  ],
};

export const PROJECTS: Project[] = [
  {
    id: 'nexus-intelligence',
    title: 'Nexus OS',
    tagline: {
      id: 'Platform intelijen keuangan enterprise & visualisasi portofolio algoritmik berlatensi rendah',
      en: 'Enterprise financial intelligence & ultra-low latency algorithmic portfolio engine',
    },
    category: 'saas',
    client: 'Horizon Global Capital',
    year: '2026',
    role: {
      id: 'Lead Systems Architect & UI Engineer',
      en: 'Lead Systems Architect & UI Engineer',
    },
    deliverables: ['Design System', 'WebGL Rendering Core', 'Real-time WebSocket Pipeline', 'REST & GraphQL API'],
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'WebSockets', 'Canvas 2D / WebGL', 'Express'],
    metrics: [
      { label: { id: 'Aset Dipantau', en: 'Monitored Assets' }, value: '$2.7B+' },
      { label: { id: 'Waktu Render Frame', en: 'Frame Render Budget' }, value: '< 14ms' },
      { label: { id: 'Kecepatan Data Stream', en: 'Tick Latency' }, value: '38ms' },
    ],
    image: '/src/assets/images/project_fintech_nebula_1794224031048.jpg',
    overview: {
      id: 'Nexus OS adalah platform pemantauan portofolio aset multi-kelas yang dirancang untuk manajer dana lindung nilai dan analis kuantitatif. Menangani jutaan titik data pasar simultan dengan rendering grafis perangkat keras tanpa penurunan frame.',
      en: 'Nexus OS is a multi-asset quantitative intelligence cockpit engineered for hedge funds and high-velocity portfolio managers. It orchestrates millions of simultaneous market ticks with hardware-accelerated charting.',
    },
    challenge: {
      id: 'Dashboard keuangan konvensional sering mengalami freezing dan memory leak saat memproses ratusan aliran WebSocket bersamaan. Klien membutuhkan pembaruan real-time pada 60 FPS tanpa mengorbankan keterbacaan tipografi.',
      en: 'Legacy financial interfaces suffer from micro-stutters and browser heap bloating under heavy WebSocket tick loads. The objective was maintaining sub-16ms render cycles at 60 FPS without losing crisp typographic contrast.',
    },
    solution: {
      id: 'Merancang arsitektur buffer berbasis Web Worker terpisah dari thread UI utama, memanfaatkan offscreen Canvas untuk grafik tren dinamis, serta sistem state terdistribusi yang memangkas re-render tidak perlu hingga 82%.',
      en: 'Implemented a dedicated off-thread Web Worker ingest engine decoupled from UI paint cycles, combined with an offscreen Canvas time-series renderer and granular state atomics reducing wasted re-renders by 82%.',
    },
    features: [
      {
        title: { id: 'Pipeline Stream Asinkron', en: 'Asynchronous Ingestion Pipeline' },
        desc: { id: 'Normalisasi data harga otomatis dengan toleransi kehilangan paket jaringan.', en: 'Self-healing tick buffer with zero-allocation payload unpacking.' },
      },
      {
        title: { id: 'Kanvas Visualisasi WebGL', en: 'WebGL Vector Visualizer' },
        desc: { id: 'Rendering 50.000 titik histori lilin saham instan tanpa lag gulir.', en: 'Instantaneous multi-pane candlestick and allocation map visualization.' },
      },
      {
        title: { id: 'Matriks Risiko Real-time', en: 'Live Risk Factor Matrix' },
        desc: { id: 'Penghitungan Value-at-Risk (VaR) dan Sharpe Ratio otomatis setiap blok data.', en: 'Calculates Value-at-Risk (VaR) and Sharpe coefficients on-the-fly.' },
      },
    ],
    demoUrl: '#demo',
    githubUrl: 'https://github.com',
    hasInteractiveDemo: true,
  },
  {
    id: 'nova-studio',
    title: 'Nova Studio',
    tagline: {
      id: 'Ruang kerja kanvas kolaboratif tanpa batas dengan orkestrasi multi-agen AI',
      en: 'Infinite collaborative canvas workspace with multi-agent design orchestration',
    },
    category: 'ai',
    client: 'OpenCanvas Labs',
    year: '2025',
    role: {
      id: 'Principal Interaction Engineer',
      en: 'Principal Interaction Engineer',
    },
    deliverables: ['Infinite Zoomable Canvas', 'CRDT Collaboration Engine', 'Agent Node Interface'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'CRDTs (Yjs)', 'Gemini AI SDK', 'Zustand'],
    metrics: [
      { label: { id: 'Kreator Aktif', en: 'Active Creators' }, value: '140K+' },
      { label: { id: 'Latensi Kolaborasi', en: 'Sync Latency' }, value: '< 45ms' },
      { label: { id: 'Efisiensi Alur Kerja', en: 'Workflow Boost' }, value: '+3.4x' },
    ],
    image: '/src/assets/images/project_ai_workspace_1794224032719.jpg',
    overview: {
      id: 'Nova Studio mengubah cara tim produk merancang dan menyusun ide. Menyatukan papan tulis vektor bebas hambatan dengan model kecerdasan buatan terpadu yang membantu sintesis riset, penulisan spesifikasi, dan pembuatan wireframe.',
      en: 'Nova Studio reimagines spatial design thinking. It combines an ultra-smooth infinite vector whiteboard with embedded AI copilot nodes that synthesize user research, draft functional specs, and scaffold layout wireframes.',
    },
    challenge: {
      id: 'Sinkronisasi posisi kursor dan perubahan node antara ratusan pengguna dalam kanvas luas tanpa desinkronisasi atau jitter spasial.',
      en: 'Delivering conflict-free real-time document synchronization across hundreds of simultaneous peers while maintaining 120Hz smooth panning and zooming.',
    },
    solution: {
      id: 'Membangun arsitektur dokumen CRDT terdistribusi dengan viewport virtualisasi spasial QuadTree sehingga hanya elemen yang berada di dalam pandangan layar yang dirender ke DOM.',
      en: 'Architected a CRDT state layer integrated with a spatial QuadTree viewport frustum culling engine, keeping memory footprint flat regardless of canvas size.',
    },
    features: [
      {
        title: { id: 'QuadTree Spatial Culling', en: 'Frustum Culling Engine' },
        desc: { id: 'Dapat memuat 10.000 elemen kanvas dengan FPS konstan 60-120 FPS.', en: 'Effortlessly renders tens of thousands of cards without DOM degradation.' },
      },
      {
        title: { id: 'Sintesis Ide Berbasis AI', en: 'Autonomous AI Synthesis' },
        desc: { id: 'Memproses catatan tim menjadi ringkasan wawasan dan pemetaan fitur terstruktur.', en: 'Transforms messy brainstorm stickies into clean product requirements.' },
      },
    ],
    demoUrl: '#demo',
    githubUrl: 'https://github.com',
    hasInteractiveDemo: true,
  },
  {
    id: 'terra-atelier',
    title: 'Terra Atelier',
    tagline: {
      id: 'Pengalaman e-commerce artisanal berkelanjutan dengan tipografi editorial mewah dan performa tinggi',
      en: 'Luxury sustainable artisanal home goods e-commerce with editorial elegance',
    },
    category: 'commerce',
    client: 'Terra Living Nordic & Bali',
    year: '2025',
    role: {
      id: 'Full-Stack Developer & Brand Systems',
      en: 'Full-Stack Developer & Brand Systems',
    },
    deliverables: ['Headless Storefront', 'Micro-interactions', 'Stripe Payment Gateway', 'CMS Content Layer'],
    techStack: ['React', 'Next.js architecture', 'Tailwind CSS', 'Motion', 'Stripe', 'Node.js'],
    metrics: [
      { label: { id: 'Konversi Checkout', en: 'Checkout Conversion' }, value: '+184%' },
      { label: { id: 'Skor Lighthouse', en: 'Lighthouse Score' }, value: '99/100' },
      { label: { id: 'Largest Contentful Paint', en: 'Global LCP' }, value: '0.8s' },
    ],
    image: '/src/assets/images/project_artisanal_commerce_1794224032933.jpg',
    overview: {
      id: 'Terra Atelier adalah toko digital untuk merek perlengkapan rumah artisan yang menjunjung prinsip kerajinan tangan alami. Menghadirkan visual monokromatik editorial yang tenang dan waktu pemuatan halaman ultra-cepat.',
      en: 'Terra Atelier is a premier digital atelier for handcrafted, slow-made homewares. Designed with a monograph editorial sensibility, organic travertine palette, and instant checkout flow.',
    },
    challenge: {
      id: 'Mencapai nuansa editorial majalah kelas atas dengan gambar resolusi tinggi tanpa memperlambat loading atau merusak rasio konversi pada jaringan seluler di berbagai negara.',
      en: 'Balancing full-bleed high-fidelity editorial imagery with lightning-fast load times on cellular connections across Europe and Southeast Asia.',
    },
    solution: {
      id: 'Implementasi pipeline kompresi visual adaptif WebP/AVIF berbasis edge, client-side prefetching cerdas pada hover, dan arsitektur checkout satu ketukan yang ringkas.',
      en: 'Engineered an edge-cached AVIF/WebP responsive image transformer, predictive route prefetching, and a friction-free single-pane checkout flow.',
    },
    features: [
      {
        title: { id: 'Kurasi Monograf Interaktif', en: 'Editorial Story Modules' },
        desc: { id: 'Transisi halus antara narasi perajin dan katalog produk belanja instan.', en: 'Seamless transitions between artisan stories and immediate cart actions.' },
      },
      {
        title: { id: 'Preloading Prediktif', en: 'Predictive Hover Prefetch' },
        desc: { id: 'Halaman produk terbuka secara instan saat kursor mendekati gambar.', en: 'Eliminates perceived navigation latency via intelligent preloading.' },
      },
    ],
    demoUrl: '#demo',
    githubUrl: 'https://github.com',
    hasInteractiveDemo: false,
  },
  {
    id: 'aether-resonance',
    title: 'Aether Resonance',
    tagline: {
      id: 'Sintesis audio spasial 3D interaktif dan visualisator medan akustik berbasis Web Audio & GLSL',
      en: 'Interactive 3D spatial acoustic field synthesizer powered by Web Audio & GLSL',
    },
    category: 'creative',
    client: 'Sonic Innovations Group',
    year: '2024',
    role: {
      id: 'Creative Technologist & DSP Engineer',
      en: 'Creative Technologist & DSP Engineer',
    },
    deliverables: ['Custom WebGL Shader Pipeline', 'Spatial Biquad DSP Graph', 'Hardware Controller Interface'],
    techStack: ['Web Audio API', 'Three.js', 'GLSL Shaders', 'TypeScript', 'Tailwind CSS'],
    metrics: [
      { label: { id: 'Frekuensi Engine', en: 'Audio DSP Graph' }, value: '96kHz' },
      { label: { id: 'FPS WebGL', en: 'Shader FPS' }, value: '60 FPS' },
      { label: { id: 'Komunitas Sound Designer', en: 'User Community' }, value: '18K+' },
    ],
    image: '/src/assets/images/project_spatial_audio_1794224032547.jpg',
    overview: {
      id: 'Aether Resonance menjembatani fisika akustik ruang dengan teknologi komputasi browser. Memungkinkan produser musik dan arsitek audio menempatkan sumber suara dalam koordinat 3D virtual dengan pantulan medan suara realistis.',
      en: 'Aether Resonance merges architectural acoustic physics with real-time browser graphics. Sound designers and acoustic architects position multi-channel audio emitters in 3D virtual coordinates with physically modeled reflections.',
    },
    challenge: {
      id: 'Melakukan konvolusi audio real-time dan perhitungan refleksi dinding tanpa menimbulkan distorsi audio atau lagging pada pipeline visual 3D.',
      en: 'Running multi-channel convolution reverb and raytraced early reflection algorithms in real time without audio underruns or dropping frames in the 3D canvas.',
    },
    solution: {
      id: 'Memisahkan pemrosesan suara ke dalam AudioWorklet thread berprioritas tinggi dan merender gelombang medan suara menggunakan vertex shader GLSL teroptimasi.',
      en: 'Implemented custom AudioWorklet processors with SIMD acceleration for the audio graph while offloading all particle physics calculations directly to GPU shaders.',
    },
    features: [
      {
        title: { id: 'Simulasi Pantulan Spasial', en: 'Acoustic Room Modeling' },
        desc: { id: 'Perhitungan penyerapan material dinding dan koefisien difusi audio.', en: 'Real-time raytraced audio reflections based on room dimensions.' },
      },
      {
        title: { id: 'Visualisator Spektrum GLSL', en: 'GLSL Spectral Mesh' },
        desc: { id: 'Animasi gelombang frekuensi audio 60 FPS reaktif terhadap input suara.', en: 'Liquid audio waveform mesh reacting synchronously to harmonic energy.' },
      },
    ],
    demoUrl: '#demo',
    githubUrl: 'https://github.com',
    hasInteractiveDemo: true,
  },
];

export const EXPERIENCES: Experience[] = [
  {
    period: 'Masa SMA',
    role: {
      id: 'Pengalaman Selama SMA (Jurusan IPA)',
      en: 'High School Experience (Science Major)',
    },
    company: 'SMA Negeri 01 Salem',
    location: 'Salem, Brebes',
    type: { id: 'Pendidikan Menengah', en: 'Secondary Education' },
    description: {
      id: 'Selama SMA, saya menempuh pendidikan di jurusan IPA yang memberikan banyak pengalaman dan pengetahuan baru. Saya belajar berbagai materi, melakukan kegiatan praktikum, serta melatih kemampuan berpikir kritis dan bekerja sama. Walaupun berasal dari jurusan IPA, saya memiliki keinginan untuk mencoba hal baru dan memperluas wawasan di bidang teknologi.',
      en: 'During high school, I studied Science (IPA) which provided rich experiences and new insights. I engaged with diverse coursework, lab experiments, and honed critical thinking and teamwork skills. Despite coming from a science background, I harbor a strong drive to explore new domains and broaden my horizons in technology.',
    },
    achievements: [
      {
        id: 'Mempelajari berbagai materi sains dan aktif dalam kegiatan praktikum laboratorium.',
        en: 'Studied core sciences and actively engaged in laboratory experiments.',
      },
      {
        id: 'Melatih kemampuan berpikir kritis, pemecahan masalah analitis, dan kerja sama tim.',
        en: 'Developed critical thinking, analytical problem solving, and teamwork capabilities.',
      },
      {
        id: 'Menumbuhkan minat mandiri yang kuat untuk memperluas wawasan di bidang teknologi informasi.',
        en: 'Cultivated an independent drive to expand skills in digital technologies.',
      },
    ],
    technologies: ['Ilmu Pengetahuan Alam', 'Praktikum Sains', 'Berpikir Kritis', 'Kerja Sama Tim'],
  },
  {
    period: 'Masa Sekarang',
    role: {
      id: 'Mahasiswa Teknologi Informasi & Komputer',
      en: 'Information Technology Student',
    },
    company: 'Universitas Komputama Cilacap',
    location: 'Cilacap, Jawa Tengah',
    type: { id: 'Perguruan Tinggi', en: 'Higher Education' },
    description: {
      id: 'Menempuh pendidikan tinggi di Universitas Komputama Cilacap untuk mendalami sistem teknologi informasi, logika komputasi, dan pengembangan aplikasi guna mempersiapkan diri ke dunia profesional.',
      en: 'Pursuing higher education at Universitas Komputama Cilacap to master information systems, computational logic, and application engineering.',
    },
    achievements: [
      {
        id: 'Membangun dasar ilmu teknologi informasi dan pengembangan sistem modern.',
        en: 'Building strong foundations in modern IT systems and software fundamentals.',
      },
      {
        id: 'Motivasi: "Belajar hari ini, berkembang esok hari, dan sukses di masa depan."',
        en: 'Motto: "Learn today, grow tomorrow, and succeed in the future."',
      },
    ],
    technologies: ['Teknologi Informasi', 'Sistem Informasi', 'Algoritma', 'Eksplorasi Web'],
  },
  {
    period: 'Visi Karier',
    role: {
      id: 'Cita-cita: Konsultan IT Profesional (IT Consultant)',
      en: 'Career Aspiration: Professional IT Consultant',
    },
    company: 'Solusi Teknologi Informasi & Kemajuan Bisnis',
    location: 'Indonesia',
    type: { id: 'Cita-cita & Visi', en: 'Future Vision' },
    description: {
      id: 'Menjadi seorang IT Consultant yang profesional, mampu memberikan solusi teknologi informasi, membantu perusahaan mengembangkan sistem, serta mendukung kemajuan bisnis melalui pemanfaatan teknologi.',
      en: 'To become a professional IT Consultant capable of delivering strategic IT solutions, helping companies engineer resilient systems, and advancing business growth through technology.',
    },
    achievements: [
      {
        id: 'Fokus pada penyediaan solusi teknologi informasi yang relevan dan bernilai tinggi bagi dunia usaha.',
        en: 'Committed to delivering high-impact technological solutions for organizations.',
      },
      {
        id: 'Terus memperkaya wawasan teknologi, tren digitalisasi, dan arsitektur sistem enterprise.',
        en: 'Continuously expanding knowledge in enterprise system architecture and digital transformation.',
      },
    ],
    technologies: ['IT Consulting', 'Solusi Sistem Informasi', 'Analisis Bisnis', 'Teknologi Digital'],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: { id: 'Frontend & Rekayasa Antarmuka', en: 'Frontend & Interface Engineering' },
    skills: [
      { name: 'React 19 / Next.js', level: 'Expert', highlight: true },
      { name: 'TypeScript', level: 'Expert', highlight: true },
      { name: 'Tailwind CSS v4', level: 'Expert', highlight: true },
      { name: 'Motion & Fluid Micro-interactions', level: 'Advanced', highlight: true },
      { name: 'WebGL & Three.js Canvas', level: 'Advanced' },
      { name: 'Web Performance & Core Web Vitals', level: 'Expert', highlight: true },
      { name: 'State Architecture (Zustand/Signals)', level: 'Expert' },
      { name: 'Aksesibilitas (WCAG AA/AAA)', level: 'Advanced' },
    ],
  },
  {
    title: { id: 'Backend & Arsitektur Sistem', en: 'Backend & Systems Architecture' },
    skills: [
      { name: 'Node.js & Express / Fastify', level: 'Advanced', highlight: true },
      { name: 'PostgreSQL & Drizzle / Prisma', level: 'Advanced' },
      { name: 'REST & GraphQL APIs', level: 'Expert' },
      { name: 'WebSockets & Real-time Streaming', level: 'Advanced', highlight: true },
      { name: 'Redis Caching & Queue Management', level: 'Intermediate' },
      { name: 'Docker & Cloud Deployment', level: 'Intermediate' },
    ],
  },
  {
    title: { id: 'Desain Produk & Rekayasa Desain', en: 'Product Design & Design Engineering' },
    skills: [
      { name: 'Figma to Code Exact Porting', level: 'Expert', highlight: true },
      { name: 'Multi-Brand Design Systems', level: 'Expert', highlight: true },
      { name: 'Information Architecture', level: 'Advanced' },
      { name: 'Interactive Prototyping', level: 'Expert' },
      { name: 'User Experience Research', level: 'Advanced' },
      { name: 'Editorial Typography & Spatial Layout', level: 'Expert', highlight: true },
    ],
  },
  {
    title: { id: 'AI Terintegrasi & Perangkat Modern', en: 'AI Integration & Developer Tooling' },
    skills: [
      { name: 'Google Gemini AI SDK', level: 'Advanced', highlight: true },
      { name: 'Prompt Engineering & Agents', level: 'Advanced' },
      { name: 'Vite & Bundler Tooling', level: 'Expert' },
      { name: 'Git & Trunk-based Collaboration', level: 'Expert' },
      { name: 'CI/CD Automated Pipelines', level: 'Advanced' },
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: {
      id: 'Kanzora memiliki kombinasi langka antara ketajaman estetika desainer kelas atas dan ketelitian arsitek perangkat lunak senior. Platform analitik kami diselesaikan 2 minggu lebih cepat dari jadwal dengan performa yang luar biasa.',
      en: 'Kanzora possesses that rare duality of a top-tier design eye and the rigorous discipline of a senior software architect. Our analytics cockpit was delivered two weeks ahead of schedule with flawless 60 FPS performance.',
    },
    name: 'Reza Pratama',
    role: 'Chief Technology Officer',
    company: 'Horizon Capital Group',
    initials: 'RP',
  },
  {
    quote: {
      id: 'Kolaborasi terbaik yang pernah kami alami. Desain yang dihasilkan tidak hanya memanjakan mata, tapi kode di baliknya bersih, terdokumentasi dengan rapi, dan mudah diskalakan oleh tim internal kami.',
      en: 'The smoothest engineering partnership we have experienced. The resulting application is not only visually breathtaking but the underlying codebase is clean, thoroughly documented, and maintainable.',
    },
    name: 'Astrid Lindgren',
    role: 'Head of Product & Experience',
    company: 'Terra Living Nordic',
    initials: 'AL',
  },
  {
    quote: {
      id: 'Pengerjaan sistem kanvas kolaboratif kami sangat menantang, namun Kanzora berhasil menyelesaikannya dengan arsitektur sinkronisasi yang sangat solid. Sungguh rekayasawan tingkat dunia.',
      en: 'Our collaborative canvas synchronization problem was immensely complex. Kanzora resolved it with an elegant CRDT architecture that handles thousands of concurrent nodes without breaking a sweat.',
    },
    name: 'David Chen',
    role: 'VP of Engineering',
    company: 'OpenCanvas Labs',
    initials: 'DC',
  },
];

export const CV_DATA = {
  summary: {
    id: 'Riwayat Pendidikan:\n• TK Silih Asih Salem\n• SD Negeri 02 Salem\n• SMP Negeri 01 Salem\n• SMA Negeri 01 Salem\n• Perguruan Tinggi: Universitas Komputama Cilacap\n\nMemiliki cita-cita menjadi seorang IT Consultant yang profesional, mampu memberikan solusi teknologi informasi, membantu perusahaan mengembangkan sistem, serta mendukung kemajuan bisnis melalui pemanfaatan teknologi.',
    en: 'Educational Background:\n• TK Silih Asih Salem\n• SD Negeri 02 Salem\n• SMP Negeri 01 Salem\n• SMA Negeri 01 Salem\n• Higher Education: Universitas Komputama Cilacap\n\nAspiring to become a professional IT Consultant, delivering strategic IT solutions, helping companies engineer systems, and driving business advancement through technology.',
  },
  motivation: {
    id: 'Belajar hari ini, berkembang esok hari, dan sukses di masa depan.',
    en: 'Learn today, grow tomorrow, and succeed in the future.',
  },
  careerGoal: {
    id: 'Menjadi seorang IT Consultant yang profesional, mampu memberikan solusi teknologi informasi, membantu perusahaan mengembangkan sistem, serta mendukung kemajuan bisnis melalui pemanfaatan teknologi.',
    en: 'To become a professional IT Consultant capable of delivering information technology solutions, assisting companies in developing systems, and driving business growth through modern tech.',
  },
  education: [
    {
      institution: 'Universitas Komputama Cilacap',
      degree: {
        id: 'Perguruan Tinggi',
        en: 'Higher Education / University',
      },
      period: 'Sekarang',
      honors: {
        id: 'Fokus Komputasi, Teknologi Informasi & Analisis Sistem',
        en: 'Computing, Information Technology & Systems Analysis',
      },
    },
    {
      institution: 'SMA Negeri 01 Salem',
      degree: {
        id: 'Sekolah Menengah Atas (Jurusan IPA)',
        en: 'Senior High School (Science Major)',
      },
      period: 'Alumni',
      honors: {
        id: 'Kegiatan praktikum sains, melatih berpikir kritis dan kerja sama tim',
        en: 'Natural sciences laboratory, critical thinking, and teamwork',
      },
    },
    {
      institution: 'SMP Negeri 01 Salem',
      degree: {
        id: 'Sekolah Menengah Pertama',
        en: 'Junior High School',
      },
      period: 'Alumni',
      honors: {
        id: 'Pendidikan Tingkat Menengah Pertama',
        en: 'Junior Secondary School',
      },
    },
    {
      institution: 'SD Negeri 02 Salem',
      degree: {
        id: 'Sekolah Dasar',
        en: 'Elementary School',
      },
      period: 'Alumni',
      honors: {
        id: 'Pendidikan Tingkat Dasar',
        en: 'Primary Education',
      },
    },
    {
      institution: 'TK Silih Asih Salem',
      degree: {
        id: 'Taman Kanak-Kanak',
        en: 'Kindergarten',
      },
      period: 'Alumni',
      honors: {
        id: 'Pendidikan Anak Usia Dini',
        en: 'Early Childhood Education',
      },
    },
  ],
  certifications: [
    { name: 'Pengenalan Analisis Sistem & Konsultasi IT', issuer: 'Akademik Komputama', year: '2025' },
    { name: 'Dasar Pemikiran Kritis & Kerja Sama Tim', issuer: 'SMA Negeri 01 Salem', year: '2024' },
    { name: 'Eksplorasi Teknologi Web & Digitalisasi', issuer: 'Studi Mandiri', year: '2024' },
  ],
  languages: [
    { name: 'Bahasa Indonesia', proficiency: { id: 'Penutur Asli', en: 'Native' } },
    { name: 'English', proficiency: { id: 'Kemampuan Dasar & Menengah (Tech)', en: 'Basic to Intermediate (Tech)' } },
  ],
};
