import React from 'react';
import { Language } from '../types';

interface MarqueeDividerProps {
  lang: Language;
}

export const MarqueeDivider: React.FC<MarqueeDividerProps> = ({ lang }) => {
  const items = lang === 'id'
    ? [
        'KARYA TERPILIH',
        'ARSITEKTUR PERANGKAT LUNAK',
        'SISTEM DESAIN',
        'REKAYASA INTERAKSI FLUID',
        'PERFORMA ULTRA-TINGGI',
        'ESTETIKA MONOGRAF',
        'LATENSI RENDAH',
      ]
    : [
        'SELECTED WORKS',
        'SYSTEMS ARCHITECTURE',
        'DESIGN SYSTEMS',
        'FLUID INTERACTION ENGINEERING',
        'HIGH PERFORMANCE',
        'EDITORIAL SENSIBILITY',
        'ULTRA-LOW LATENCY',
      ];

  const repeated = [...items, ...items, ...items];

  return (
    <div className="w-full py-4 border-y border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 overflow-hidden select-none">
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap text-xs font-mono font-medium tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
        {repeated.map((item, idx) => (
          <React.Fragment key={idx}>
            <span>{item}</span>
            <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">·</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
