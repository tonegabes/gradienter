"use client";

import { cn, copyToClipboard, formatTailwindColorsDisplay, generateCSSFromTailwindColors } from "@/lib/utils";
import { GradientCardProps } from "@/types";
import { useState } from "react";

/**
 * Componente que renderiza um card individual com gradiente Tailwind
 * Proporção 16:9 com cores Tailwind exibidas abaixo
 */
export function GradientCard({ gradient, index }: GradientCardProps) {
  const [copied, setCopied] = useState(false);
  const [copyType, setCopyType] = useState<'colors' | 'classes'>('colors');

  /**
   * Copia as cores ou classes Tailwind para a área de transferência
   */
  const handleCopyColors = async () => {
    const success = await copyToClipboard(gradient.colors.join(', '));
    if (success) {
      setCopied(true);
      setCopyType('colors');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  /**
   * Copia as classes Tailwind completas para a área de transferência
   */
  const handleCopyClasses = async () => {
    const success = await copyToClipboard(gradient.tailwindClasses);
    if (success) {
      setCopied(true);
      setCopyType('classes');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Gera CSS a partir das cores Tailwind para o background
  const cssGradient = generateCSSFromTailwindColors(gradient.colors, gradient.direction);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg shadow-md transition-all duration-300",
        "hover:shadow-xl hover:scale-105",
        "bg-white border border-gray-200"
      )}
    >
      {/* Card com gradiente - proporção 16:9 */}
      <div
        className="aspect-video w-full cursor-pointer relative"
        style={{ background: cssGradient }}
        onClick={handleCopyColors}
        role="button"
        tabIndex={0}
        aria-label={`Gradiente ${index ? index + 1 : ''} - Clique para copiar cores`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCopyColors();
          }
        }}
      >
        {/* Overlay com feedback de cópia */}
        {copied && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-medium">
            {copyType === 'colors' ? 'Cores copiadas!' : 'Classes copiadas!'}
          </div>
        )}

        {/* Overlay de hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

        {/* Indicador de clique */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/70 text-white text-xs px-2 py-1 rounded">
            Clique para copiar
          </div>
        </div>

        {/* Ícone Tailwind no canto superior esquerdo */}
        <div className="absolute top-2 left-2 opacity-75">
          <div className="bg-white/20 backdrop-blur-sm rounded px-2 py-1">
            <span className="text-xs font-semibold text-white">TW</span>
          </div>
        </div>
      </div>

      {/* Informações das cores e classes */}
      <div className="p-4 space-y-3">
        {/* Cores Tailwind */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">
            {formatTailwindColorsDisplay(gradient.colors)}
          </p>
          <p className="text-xs text-gray-500">
            Direção: {gradient.directionLabel}
          </p>
        </div>

        {/* Classes Tailwind */}
        <div>
          <p className="text-xs text-gray-600 font-mono mb-2">
            Classes Tailwind:
          </p>
          <div
            className="bg-gray-50 p-2 rounded text-xs font-mono text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors break-all"
            onClick={handleCopyClasses}
            title="Clique para copiar classes"
          >
            {gradient.tailwindClasses}
          </div>
        </div>

        {/* Cores individuais como círculos coloridos */}
        <div className="flex gap-2 pt-1 flex-wrap">
          {gradient.colors.map((color, colorIndex) => {
            // Gera CSS para cada cor individual
            const colorCSS = generateCSSFromTailwindColors([color], 'bg-gradient-to-r').replace('linear-gradient(to right, ', '').replace(')', '');

            return (
              <div
                key={colorIndex}
                className="flex items-center gap-1"
              >
                <div
                  className="w-4 h-4 rounded-full border border-gray-300 shadow-sm"
                  style={{ backgroundColor: colorCSS }}
                  title={color}
                />
                <span className="text-xs font-mono text-gray-600">
                  {color}
                </span>
              </div>
            );
          })}
        </div>

        {/* Botões de ação */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleCopyColors}
            className="flex-1 text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 py-1 px-2 rounded transition-colors"
          >
            Copiar Cores
          </button>
          <button
            onClick={handleCopyClasses}
            className="flex-1 text-xs bg-purple-50 hover:bg-purple-100 text-purple-600 py-1 px-2 rounded transition-colors"
          >
            Copiar Classes
          </button>
        </div>
      </div>
    </div>
  );
}
