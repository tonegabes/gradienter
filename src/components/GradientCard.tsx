"use client";

import {
    ArrowDown,
    ArrowDownLeft,
    ArrowDownRight,
    ArrowLeft,
    ArrowRight,
    ArrowUp,
    ArrowUpLeft,
    ArrowUpRight,
    Copy
} from "phosphor-react";
import { useState } from "react";
import {
    copyToClipboard,
    formatTailwindColorsDisplay,
    generateCSSFromTailwindColors
} from "../lib/utils";
import { GradientCardProps } from "../types";

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
 * Descriptive names for gradient directions
 */
const DirectionNames = {
  'bg-gradient-to-t': 'To top',
  'bg-gradient-to-tr': 'To top-right',
  'bg-gradient-to-r': 'To right',
  'bg-gradient-to-br': 'To bottom-right',
  'bg-gradient-to-b': 'To bottom',
  'bg-gradient-to-bl': 'To bottom-left',
  'bg-gradient-to-l': 'To left',
  'bg-gradient-to-tl': 'To top-left',
};

/**
 * Componente que renderiza um card individual com gradiente Tailwind
 * Inclui funcionalidade de cópia e exibição de informações detalhadas
 */
export function GradientCard({ gradient }: GradientCardProps) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'colors' | 'classes'>('idle');

  /**
   * Copia as cores do gradiente para o clipboard
   */
  const handleCopyColors = async () => {
    const colorText = formatTailwindColorsDisplay(gradient.colors);
    const success = await copyToClipboard(colorText);

    if (success) {
      setCopyStatus('colors');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  /**
   * Copia as classes Tailwind completas para o clipboard
   */
  const handleCopyClasses = async () => {
    const success = await copyToClipboard(gradient.tailwindClasses);

    if (success) {
      setCopyStatus('classes');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  const cssGradient = generateCSSFromTailwindColors(gradient.colors, gradient.direction);

  return (
    <div className="group flex flex-col relative bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
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
          title={
            DirectionNames[gradient.direction as keyof typeof DirectionNames]
          }
        >
          {DirectionIcons[gradient.direction as keyof typeof DirectionIcons]}
        </div>
      </div>

      {/* Área do Gradiente */}
      <div
        className={`w-full aspect-[16/10] ${gradient.tailwindClasses} relative overflow-hidden`}
        style={{ background: cssGradient }}
      >
        {/* Overlay de Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
      </div>

      {/* Informações do Gradiente */}
      <div className="flex flex-col justify-between grow">
        {/* Cores Individuais */}
        <div className="space-y-2 p-4">
          <div className="flex items-center justify-between">
                          <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                Tailwind Colors
              </p>
            <button
              onClick={handleCopyColors}
              className="flex items-center justify-center gap-2 text-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-all duration-200"
                             title="Copy colors"
            >
              <Copy
                size={16}
                weight={copyStatus === "colors" ? "fill" : "regular"}
              />
                             <span className="text-xs font-medium">
                 {copyStatus === "colors" ? "Copied!" : ""}
               </span>
            </button>
          </div>
          <p className="font-mono text-sm text-slate-800 bg-slate-50 rounded-md px-3 py-2 leading-relaxed">
            {formatTailwindColorsDisplay(gradient.colors)}
          </p>
        </div>

        <div className="h-[1px] bg-gray-100"></div>

        {/* Classes Tailwind */}
        <div className="space-y-2 p-4">

          <div className="flex items-center justify-between">
                          <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                Tailwind Classes
              </p>

            <button
              onClick={handleCopyClasses}
              className="flex items-center justify-center gap-2 text-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-all duration-200"
                             title="Copy classes"
            >
              <Copy
                size={16}
                weight={copyStatus === "classes" ? "fill" : "regular"}
              />
                             <span className="text-xs font-medium">
                 {copyStatus === "classes" ? "Copied!" : ""}
               </span>
            </button>
          </div>

          <p className="font-mono text-xs text-slate-700 bg-slate-50 rounded-md px-3 py-2 leading-relaxed break-all">
            {gradient.tailwindClasses}
          </p>
        </div>
      </div>
    </div>
  );
}
