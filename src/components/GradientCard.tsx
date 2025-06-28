"use client";

import {
    copyToClipboard,
    formatTailwindColorsDisplay,
    generateCSSFromTailwindColors
} from "@/lib/utils";
import { GradientCardProps } from "@/types";
import {
    ArrowDown,
    ArrowDownLeft,
    ArrowDownRight,
    ArrowLeft,
    ArrowRight,
    ArrowUp,
    ArrowUpLeft,
    ArrowUpRight
} from "phosphor-react";
import { useState } from "react";

/**
 * Ícones Phosphor para direções de gradiente
 * Mapeamento preciso entre direções CSS e ícones de seta
 */
const DirectionIcons = {
  'bg-gradient-to-t': <ArrowUp size={16} weight="bold" />,
  'bg-gradient-to-tr': <ArrowUpRight size={16} weight="bold" />,
  'bg-gradient-to-r': <ArrowRight size={16} weight="bold" />,
  'bg-gradient-to-br': <ArrowDownRight size={16} weight="bold" />,
  'bg-gradient-to-b': <ArrowDown size={16} weight="bold" />,
  'bg-gradient-to-bl': <ArrowDownLeft size={16} weight="bold" />,
  'bg-gradient-to-l': <ArrowLeft size={16} weight="bold" />,
  'bg-gradient-to-tl': <ArrowUpLeft size={16} weight="bold" />,
};

/**
 * Nomes descritivos para direções de gradiente
 */
const DirectionNames = {
  'bg-gradient-to-t': 'Para cima',
  'bg-gradient-to-tr': 'Para cima-direita',
  'bg-gradient-to-r': 'Para direita',
  'bg-gradient-to-br': 'Para baixo-direita',
  'bg-gradient-to-b': 'Para baixo',
  'bg-gradient-to-bl': 'Para baixo-esquerda',
  'bg-gradient-to-l': 'Para esquerda',
  'bg-gradient-to-tl': 'Para cima-esquerda',
};

/**
 * Componente que renderiza um card individual com gradiente Tailwind
 * Inclui funcionalidade de cópia e exibição de informações detalhadas
 */
export function GradientCard({ gradient }: GradientCardProps) {
  const [copyStatus, setCopyStatus] = useState<'colors' | 'classes' | null>(null);

  /**
   * Copia as cores do gradiente para o clipboard
   */
  const handleCopyColors = async () => {
    const colorText = formatTailwindColorsDisplay(gradient.colors);
    const success = await copyToClipboard(colorText);

    if (success) {
      setCopyStatus('colors');
      setTimeout(() => setCopyStatus(null), 2000);
    }
  };

  /**
   * Copia as classes Tailwind completas para o clipboard
   */
  const handleCopyClasses = async () => {
    const success = await copyToClipboard(gradient.tailwindClasses);

    if (success) {
      setCopyStatus('classes');
      setTimeout(() => setCopyStatus(null), 2000);
    }
  };

  const cssGradient = generateCSSFromTailwindColors(gradient.colors, gradient.direction);

  return (
    <div className="group relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      {/* Badge TW */}
      <div className="absolute top-3 left-3 z-10">
        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-mono font-medium bg-white/90 text-slate-700 shadow-sm border border-white/50 backdrop-blur-sm">
          TW
        </span>
      </div>

      {/* Badge de Direção com Ícone */}
      <div className="absolute top-3 right-3 z-10">
        <div
          className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white/90 text-slate-700 shadow-sm border border-white/50 backdrop-blur-sm"
          title={DirectionNames[gradient.direction as keyof typeof DirectionNames]}
        >
          {DirectionIcons[gradient.direction as keyof typeof DirectionIcons]}
        </div>
      </div>

                        {/* Área do Gradiente */}
      <div
        className={`w-full aspect-video ${gradient.tailwindClasses} relative overflow-hidden`}
        style={{ background: cssGradient }}
      >
        {/* Overlay de Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

        {/* Botões de Cópia */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex gap-2">
            <button
              onClick={handleCopyColors}
              className="px-4 py-2 bg-white/95 text-slate-700 rounded-lg font-medium text-sm shadow-lg hover:bg-white transition-all duration-200 backdrop-blur-sm border border-white/50"
            >
              {copyStatus === 'colors' ? '✓ Copiado!' : 'Copiar Cores'}
            </button>
            <button
              onClick={handleCopyClasses}
              className="px-4 py-2 bg-slate-800/95 text-white rounded-lg font-medium text-sm shadow-lg hover:bg-slate-800 transition-all duration-200 backdrop-blur-sm"
            >
              {copyStatus === 'classes' ? '✓ Copiado!' : 'Copiar Classes'}
            </button>
          </div>
        </div>
      </div>

      {/* Informações do Gradiente */}
      <div className="p-4 space-y-3">
        {/* Cores Individuais */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">
            Cores Tailwind
          </p>
          <p className="font-mono text-sm text-slate-800 leading-relaxed">
            {formatTailwindColorsDisplay(gradient.colors)}
          </p>
        </div>

        {/* Classes Tailwind */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">
            Classes Tailwind
          </p>
          <p className="font-mono text-xs text-slate-700 bg-slate-50 rounded-md px-3 py-2 leading-relaxed break-all">
            {gradient.tailwindClasses}
          </p>
        </div>
      </div>
    </div>
  );
}
