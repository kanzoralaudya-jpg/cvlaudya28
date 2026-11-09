import React, { useState, useEffect, useRef } from 'react';
import { Activity, Radio, Calculator, Play, Pause, RefreshCw, Volume2, VolumeX, Sparkles, Send } from 'lucide-react';
import { Language } from '../types';

interface InteractiveLabProps {
  lang: Language;
  onApplyEstimateToContact: (text: string) => void;
  initialTab?: 'market' | 'audio' | 'calculator';
}

export const InteractiveLab: React.FC<InteractiveLabProps> = ({
  lang,
  onApplyEstimateToContact,
  initialTab = 'market',
}) => {
  const [activeTab, setActiveTab] = useState<'market' | 'audio' | 'calculator'>(initialTab);

  // Tab 1: Market Simulator State
  const [isSimulating, setIsSimulating] = useState(true);
  const [marketSpeed, setMarketSpeed] = useState(50); // ms
  const [volatility, setVolatility] = useState<'low' | 'med' | 'high'>('med');
  const [marketStats, setMarketStats] = useState({
    price: 3420.5,
    change: +4.28,
    ticksProcessed: 14820,
    varRisk: '1.42%',
    fps: 60,
  });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const priceHistoryRef = useRef<number[]>([
    3390, 3395, 3402, 3398, 3405, 3410, 3408, 3415, 3412, 3420,
  ]);

  // Canvas drawing effect for Market Engine
  useEffect(() => {
    if (activeTab !== 'market') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastTickTime = performance.now();

    const render = (time: number) => {
      if (isSimulating && time - lastTickTime > marketSpeed) {
        lastTickTime = time;
        const history = priceHistoryRef.current;
        const lastPrice = history[history.length - 1];
        const volMultiplier = volatility === 'low' ? 0.8 : volatility === 'med' ? 2.5 : 5.8;
        const delta = (Math.random() - 0.49) * volMultiplier;
        const nextPrice = Math.max(100, Math.round((lastPrice + delta) * 100) / 100);

        if (history.length > 50) history.shift();
        history.push(nextPrice);

        const netChange = Math.round((nextPrice - history[0]) * 100) / 100;
        setMarketStats((prev) => ({
          price: nextPrice,
          change: netChange,
          ticksProcessed: prev.ticksProcessed + Math.floor(Math.random() * 8 + 3),
          varRisk: `${(1.2 + (volatility === 'high' ? 1.8 : volatility === 'med' ? 0.6 : 0.1)).toFixed(2)}%`,
          fps: 60,
        }));
      }

      // Draw chart
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const history = priceHistoryRef.current;
      const minP = Math.min(...history) * 0.998;
      const maxP = Math.max(...history) * 1.002;
      const range = maxP - minP || 1;

      // Draw subtle grid
      ctx.strokeStyle = document.documentElement.classList.contains('dark')
        ? 'rgba(255, 255, 255, 0.05)'
        : 'rgba(0, 0, 0, 0.05)';
      ctx.lineWidth = 1;
      for (let y = 0; y < height; y += height / 4) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw trend line
      const stepX = width / (history.length - 1);
      ctx.beginPath();
      history.forEach((val, i) => {
        const x = i * stepX;
        const y = height - ((val - minP) / range) * (height * 0.85) - height * 0.08;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });

      const isUp = history[history.length - 1] >= history[0];
      const strokeColor = isUp ? '#10b981' : '#f43f5e';
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Area gradient
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, isUp ? 'rgba(16, 185, 129, 0.25)' : 'rgba(244, 63, 94, 0.25)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [activeTab, isSimulating, marketSpeed, volatility]);

  // Tab 2: Audio Synthesizer State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [frequency, setFrequency] = useState(440);
  const [oscType, setOscType] = useState<OscillatorType>('sine');
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscNodeRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const audioCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const toggleSound = () => {
    if (isPlayingAudio) {
      if (oscNodeRef.current) {
        oscNodeRef.current.stop();
        oscNodeRef.current.disconnect();
        oscNodeRef.current = null;
      }
      setIsPlayingAudio(false);
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = audioCtxRef.current || new AudioContextClass();
        audioCtxRef.current = ctx;

        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = oscType;
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime); // keep gentle volume

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        oscNodeRef.current = osc;
        gainNodeRef.current = gain;
        setIsPlayingAudio(true);
      } catch {
        // Fallback gracefully if Web Audio is blocked
      }
    }
  };

  useEffect(() => {
    if (oscNodeRef.current && audioCtxRef.current) {
      oscNodeRef.current.frequency.setValueAtTime(frequency, audioCtxRef.current.currentTime);
    }
  }, [frequency]);

  useEffect(() => {
    if (oscNodeRef.current) {
      oscNodeRef.current.type = oscType;
    }
  }, [oscType]);

  useEffect(() => {
    return () => {
      if (oscNodeRef.current) {
        oscNodeRef.current.stop();
        oscNodeRef.current.disconnect();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  // Audio Canvas visualizer
  useEffect(() => {
    if (activeTab !== 'audio') return;
    const canvas = audioCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId: number;
    let phase = 0;

    const drawWave = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      ctx.beginPath();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;

      const cycles = (frequency / 110) * 2;
      for (let x = 0; x < w; x++) {
        const normX = x / w;
        let yNorm = 0;
        if (oscType === 'sine') {
          yNorm = Math.sin(normX * Math.PI * 2 * cycles + phase);
        } else if (oscType === 'triangle') {
          yNorm = (Math.asin(Math.sin(normX * Math.PI * 2 * cycles + phase)) * 2) / Math.PI;
        } else if (oscType === 'square') {
          yNorm = Math.sin(normX * Math.PI * 2 * cycles + phase) >= 0 ? 0.7 : -0.7;
        } else {
          // sawtooth
          yNorm = (((normX * cycles + phase / (Math.PI * 2)) % 1) - 0.5) * 2;
        }

        const amp = isPlayingAudio ? 0.38 : 0.15;
        const y = h / 2 + yNorm * (h * amp);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += isPlayingAudio ? 0.08 : 0.02;
      frameId = requestAnimationFrame(drawWave);
    };

    frameId = requestAnimationFrame(drawWave);
    return () => cancelAnimationFrame(frameId);
  }, [activeTab, frequency, oscType, isPlayingAudio]);

  // Tab 3: Project Calculator State
  const [projectTier, setProjectTier] = useState<'mvp' | 'saas' | 'enterprise' | 'creative'>('saas');
  const [timeline, setTimeline] = useState<'sprint' | 'standard' | 'extensive'>('standard');
  const [features, setFeatures] = useState<{ [key: string]: boolean }>({
    designSystem: true,
    realtime: true,
    aiAgent: false,
    webgl: false,
    analytics: true,
  });
  const [currency, setCurrency] = useState<'IDR' | 'USD'>('IDR');

  const baseEstimates = {
    mvp: { hours: 120, baseUsd: 4800, baseIdr: 75000000 },
    saas: { hours: 220, baseUsd: 8800, baseIdr: 138000000 },
    enterprise: { hours: 380, baseUsd: 15200, baseIdr: 240000000 },
    creative: { hours: 160, baseUsd: 6400, baseIdr: 99000000 },
  };

  const calculateTotal = () => {
    const base = baseEstimates[projectTier];
    let multiplier = 1.0;
    if (timeline === 'sprint') multiplier *= 1.25; // rush allocation
    if (timeline === 'extensive') multiplier *= 1.1;

    let featureHours = 0;
    if (features.designSystem) featureHours += 25;
    if (features.realtime) featureHours += 35;
    if (features.aiAgent) featureHours += 40;
    if (features.webgl) featureHours += 45;
    if (features.analytics) featureHours += 20;

    const totalHours = Math.round(base.hours * multiplier + featureHours);
    const rateUsd = 40; // USD/hr
    const rateIdr = 620000; // IDR/hr

    const totalUsd = totalHours * rateUsd;
    const totalIdr = totalHours * rateIdr;

    return { totalHours, totalUsd, totalIdr };
  };

  const calculated = calculateTotal();

  const handleApplyToContact = () => {
    const tierName =
      projectTier === 'mvp' ? 'Rapid MVP (Zero to One)' :
      projectTier === 'saas' ? 'Enterprise SaaS & Web App' :
      projectTier === 'enterprise' ? 'Full-Scale Enterprise Platform' : 'Creative Spatial / 3D Web';

    const selectedFeatures = Object.keys(features)
      .filter((k) => features[k])
      .join(', ');

    const estimateText = lang === 'id'
      ? `Halo Kanzora,\n\nSaya tertarik bekerja sama untuk proyek dengan spesifikasi estimasi dari Interactive Lab:\n- Kategori: ${tierName}\n- Target Timeline: ${timeline.toUpperCase()}\n- Fitur Kunci: ${selectedFeatures}\n- Estimasi Jam: ~${calculated.totalHours} jam kerja\n- Estimasi Anggaran: ${currency === 'IDR' ? `Rp ${(calculated.totalIdr).toLocaleString('id-ID')}` : `$${calculated.totalUsd.toLocaleString('en-US')}`}\n\nMari jadwalkan sesi diskusi teknis.`
      : `Hi Kanzora,\n\nI would like to explore an engineering collaboration based on the Interactive Lab estimate:\n- Tier: ${tierName}\n- Timeline: ${timeline.toUpperCase()}\n- Modules: ${selectedFeatures}\n- Estimated Scope: ~${calculated.totalHours} hours\n- Estimated Budget: ${currency === 'USD' ? `$${calculated.totalUsd.toLocaleString('en-US')}` : `Rp ${(calculated.totalIdr).toLocaleString('id-ID')}`}\n\nLet's schedule an architectural discovery call.`;

    onApplyEstimateToContact(estimateText);
  };

  const t = {
    sectionNum: '02',
    heading: lang === 'id' ? 'Lab Prototipe Interaktif' : 'Live Interactive Engineering Lab',
    desc: lang === 'id'
      ? 'Uji langsung komponen real-time, visualisator gelombang audio Web Audio, atau hitung perkiraan alokasi proyek Anda.'
      : 'Directly test low-latency streaming modules, Web Audio wave generators, or calculate your project scope.',
    tabMarket: lang === 'id' ? 'Mesin Streaming Finansial' : 'Financial Streaming Engine',
    tabAudio: lang === 'id' ? 'Sintesis Audio & DSP' : 'Audio DSP Synthesizer',
    tabCalc: lang === 'id' ? 'Kalkulator Lingkup Proyek' : 'Project Scope Calculator',
  };

  return (
    <section id="lab" className="py-20 lg:py-28 max-w-7xl mx-auto px-6">
      {/* Header */}
      <div className="max-w-2xl mb-10">
        <div className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-2 tracking-wider">
          {t.sectionNum}. LIVE PROTOTYPING
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white [text-wrap:balance]">
          {t.heading}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {t.desc}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl mb-8 w-fit">
        <button
          onClick={() => setActiveTab('market')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 ${
            activeTab === 'market'
              ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-200'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>{t.tabMarket}</span>
        </button>

        <button
          onClick={() => setActiveTab('audio')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 ${
            activeTab === 'audio'
              ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-200'
          }`}
        >
          <Radio className="w-3.5 h-3.5" />
          <span>{t.tabAudio}</span>
        </button>

        <button
          onClick={() => setActiveTab('calculator')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 ${
            activeTab === 'calculator'
              ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-200'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>{t.tabCalc}</span>
        </button>
      </div>

      {/* Content Container */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 p-6 sm:p-8 backdrop-blur-sm shadow-xs">
        {/* TAB 1: Nexus Financial Simulator */}
        {activeTab === 'market' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  NEXUS OS // REAL-TIME INGESTION SIMULATOR
                </span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-3xl font-mono font-bold tabular-nums text-zinc-950 dark:text-white">
                    ${marketStats.price.toFixed(2)}
                  </span>
                  <span
                    className={`text-sm font-mono font-semibold tabular-nums ${
                      marketStats.change >= 0 ? 'text-emerald-500' : 'text-rose-500'
                    }`}
                  >
                    {marketStats.change >= 0 ? '+' : ''}
                    {marketStats.change.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsSimulating(!isSimulating)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isSimulating ? (lang === 'id' ? 'Jeda Stream' : 'Pause Stream') : (lang === 'id' ? 'Lanjutkan' : 'Resume')}</span>
                </button>
                <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  FPS: <span className="text-emerald-500 font-bold tabular-nums">{marketStats.fps}</span>
                </div>
              </div>
            </div>

            {/* Canvas Viewport */}
            <div className="w-full h-56 sm:h-72 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 overflow-hidden relative">
              <canvas
                ref={canvasRef}
                width={800}
                height={300}
                className="w-full h-full block"
              />
              <div className="absolute top-3 left-3 text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
                OFFSCREEN_CANVAS_2D · 50 SAMPLES BUFFER
              </div>
            </div>

            {/* Controls & Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              <div>
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-2">
                  {lang === 'id' ? 'Frekuensi Pembaruan Tick' : 'Tick Update Frequency'}: <span className="font-mono tabular-nums">{marketSpeed}ms</span>
                </label>
                <input
                  type="range"
                  min="20"
                  max="150"
                  value={marketSpeed}
                  onChange={(e) => setMarketSpeed(Number(e.target.value))}
                  className="w-full accent-zinc-900 dark:accent-zinc-100 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-2">
                  {lang === 'id' ? 'Tingkat Volatilitas Pasar' : 'Market Volatility'}:
                </label>
                <div className="flex items-center gap-1.5">
                  {(['low', 'med', 'high'] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setVolatility(v)}
                      className={`px-3 py-1 text-xs font-mono rounded-md uppercase transition-colors ${
                        volatility === v
                          ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-end">
                <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  {lang === 'id' ? 'Total Tick Diproses' : 'Ticks Processed'}:{' '}
                  <span className="font-bold tabular-nums text-zinc-900 dark:text-zinc-100">
                    {marketStats.ticksProcessed.toLocaleString()}
                  </span>
                </div>
                <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mt-1">
                  {lang === 'id' ? 'Koefisien VaR 95%' : 'Estimated VaR (95%)'}:{' '}
                  <span className="text-zinc-900 dark:text-zinc-100 font-bold">{marketStats.varRisk}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Audio & Waveform Synthesizer */}
        {activeTab === 'audio' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  AETHER RESONANCE // WEB AUDIO OSCILLATOR & SPECTRUM
                </span>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mt-1">
                  {lang === 'id'
                    ? 'Eksplorasi sintesis nada dan analisis harmonik matematika audio berbasis peramban.'
                    : 'Interactive real-time audio harmonic synthesis and mathematical waveform rendering.'}
                </p>
              </div>

              <button
                onClick={toggleSound}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isPlayingAudio
                    ? 'bg-rose-600 text-white hover:bg-rose-700'
                    : 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 hover:bg-zinc-800'
                }`}
              >
                {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>
                  {isPlayingAudio
                    ? (lang === 'id' ? 'Matikan Audio' : 'Mute Sound')
                    : (lang === 'id' ? 'Putar Nada Audio' : 'Play Audio Tone')}
                </span>
              </button>
            </div>

            {/* Visualizer Canvas */}
            <div className="w-full h-56 sm:h-72 rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden relative">
              <canvas
                ref={audioCanvasRef}
                width={800}
                height={300}
                className="w-full h-full block"
              />
              <div className="absolute top-3 left-3 text-[11px] font-mono text-zinc-500">
                HARMONIC_MESH · FREQ: {frequency}Hz · FORM: {oscType.toUpperCase()}
              </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              <div>
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-2">
                  {lang === 'id' ? 'Frekuensi Pitch' : 'Harmonic Frequency'}: <span className="font-mono tabular-nums">{frequency} Hz</span>
                </label>
                <input
                  type="range"
                  min="110"
                  max="880"
                  value={frequency}
                  onChange={(e) => setFrequency(Number(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-2">
                  {lang === 'id' ? 'Bentuk Gelombang (Oscillator)' : 'Oscillator Shape'}:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {(['sine', 'triangle', 'square', 'sawtooth'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setOscType(type)}
                      className={`px-3 py-1 text-xs font-mono rounded-md uppercase transition-colors ${
                        oscType === type
                          ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-xs text-zinc-500 dark:text-zinc-400 flex flex-col justify-end">
                <span className="font-mono text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
                  DSP AudioWorklet Safe
                </span>
                <span>
                  {lang === 'id'
                    ? 'Volume audio dibatasi otomatis pada batas aman 0.08 gain untuk melindungi telinga Anda.'
                    : 'Audio gain is automatically bounded to a safe 0.08 amplitude threshold.'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Project Scope & Value Calculator */}
        {activeTab === 'calculator' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  ESTIMATOR // TRANSPARENT PROJECT SCOPING & ARCHITECTURE
                </span>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mt-1">
                  {lang === 'id'
                    ? 'Dapatkan estimasi kebutuhan waktu, alokasi jam rekayasa, dan anggaran realistis untuk kebutuhan produk Anda.'
                    : 'Calculate realistic engineering sprints, architecture hours, and investment baselines.'}
                </p>
              </div>

              {/* Currency toggle */}
              <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg self-start sm:self-auto">
                <button
                  onClick={() => setCurrency('IDR')}
                  className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md transition-colors ${
                    currency === 'IDR'
                      ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  IDR (Rp)
                </button>
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md transition-colors ${
                    currency === 'USD'
                      ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  USD ($)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form Config */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Project Tier */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-2.5">
                    1. {lang === 'id' ? 'Klasifikasi Produk' : 'Product Tier'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'mvp', label: 'Rapid MVP (0 to 1)', sub: '120h' },
                      { id: 'saas', label: 'Enterprise SaaS App', sub: '220h' },
                      { id: 'enterprise', label: 'Scale Platform', sub: '380h' },
                      { id: 'creative', label: 'Creative / 3D Canvas', sub: '160h' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setProjectTier(item.id as typeof projectTier)}
                        className={`p-3 text-left rounded-xl border transition-all ${
                          projectTier === item.id
                            ? 'border-zinc-950 dark:border-white bg-zinc-50 dark:bg-zinc-800/80 font-medium'
                            : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                        }`}
                      >
                        <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{item.label}</div>
                        <div className="text-[11px] font-mono text-zinc-500">{item.sub} baseline</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Timeline */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-2.5">
                    2. {lang === 'id' ? 'Target Durasi Pengerjaan' : 'Target Timeline'}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'sprint', label: lang === 'id' ? 'Akselerasi (4 Mgg)' : 'Sprint (4 Wks)', badge: '+25%' },
                      { id: 'standard', label: lang === 'id' ? 'Standar (8 Mgg)' : 'Standard (8 Wks)', badge: 'Optimal' },
                      { id: 'extensive', label: lang === 'id' ? 'Komprehensif (12+ Mgg)' : 'Phased (12+ Wks)', badge: 'Enterprise' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setTimeline(item.id as typeof timeline)}
                        className={`p-2.5 text-center rounded-xl border transition-all ${
                          timeline === item.id
                            ? 'border-zinc-950 dark:border-white bg-zinc-50 dark:bg-zinc-800/80'
                            : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
                        }`}
                      >
                        <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{item.label}</div>
                        <div className="text-[11px] font-mono text-zinc-500">{item.badge}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Specialized Capabilities */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-2.5">
                    3. {lang === 'id' ? 'Modul Spesialisasi' : 'Specialized Modules'}
                  </label>
                  <div className="space-y-2">
                    {[
                      { id: 'designSystem', label: lang === 'id' ? 'Design System Multi-Brand & Token WCAG AA' : 'Multi-Brand Design Tokens & WCAG AA System' },
                      { id: 'realtime', label: lang === 'id' ? 'Pipeline Real-time WebSockets & Sinkronisasi Dokumen' : 'Real-time WebSocket & Document Sync Pipeline' },
                      { id: 'aiAgent', label: lang === 'id' ? 'Integrasi Agen AI Gemini / Model Generatif' : 'Gemini AI Agent & Copilot Integration' },
                      { id: 'webgl', label: lang === 'id' ? 'Kanvas Interaktif 3D / WebGL Shader Visualizer' : 'Interactive 3D / WebGL Shader Viewport' },
                    ].map((feat) => (
                      <label
                        key={feat.id}
                        className="flex items-center gap-3 p-2.5 rounded-lg border border-zinc-100 dark:border-zinc-800/70 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={features[feat.id] || false}
                          onChange={(e) => setFeatures({ ...features, [feat.id]: e.target.checked })}
                          className="w-4 h-4 rounded text-zinc-900 accent-zinc-900 dark:accent-zinc-100 cursor-pointer"
                        />
                        <span className="text-xs text-zinc-800 dark:text-zinc-200 font-medium">
                          {feat.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Estimate Output Card */}
              <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                <div>
                  <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
                    ESTIMATION SUMMARY
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        {lang === 'id' ? 'Estimasi Alokasi Kerja' : 'Estimated Dedicated Hours'}
                      </div>
                      <div className="text-3xl font-mono font-bold tabular-nums text-zinc-900 dark:text-zinc-100 mt-1">
                        ~{calculated.totalHours}{' '}
                        <span className="text-sm font-sans font-normal text-zinc-500">
                          {lang === 'id' ? 'jam' : 'hours'}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800">
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        {lang === 'id' ? 'Estimasi Investasi' : 'Estimated Investment Scope'}
                      </div>
                      <div className="text-2xl sm:text-3xl font-mono font-bold tabular-nums text-zinc-950 dark:text-white mt-1">
                        {currency === 'IDR'
                          ? `Rp ${(calculated.totalIdr).toLocaleString('id-ID')}`
                          : `$${calculated.totalUsd.toLocaleString('en-US')}`}
                      </div>
                      <div className="text-[11px] text-zinc-500 mt-1">
                        {lang === 'id'
                          ? '*Estimasi transparan mencakup arsitektur, implementasi kode, unit test, dan panduan serah terima.'
                          : '*Estimate includes end-to-end architecture, clean codebase, testing, and handoff documentation.'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transfer to contact form CTA */}
                <button
                  onClick={handleApplyToContact}
                  className="mt-6 w-full flex items-center justify-center gap-2 py-3 text-xs font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-950 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'id' ? 'Gunakan Estimasi Ini di Formulir Diskusi' : 'Apply Estimate to Discussion Form'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
