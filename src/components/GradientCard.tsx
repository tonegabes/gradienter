"use client";

import { cn, copyToClipboard, formatTailwindColorsDisplay, generateCSSFromTailwindColors } from "@/lib/utils";
import { GradientCardProps } from "@/types";
import { useState } from "react";

/**
 * Ícones SVG para direções de gradiente
 */
const DirectionIcons = {
  'bg-gradient-to-t': (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
      <path d="M8 1l4 4h-2v6H6V5H4l4-4z"/>
    </svg>
  ),
  'bg-gradient-to-tr': (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
      <path d="M11.5 1.5L15 5l-1 1-2.5-2.5V11H10V3.5L7.5 6l-1-1L10 1.5h1.5z"/>
    </svg>
  ),
  'bg-gradient-to-r': (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
      <path d="M15 8l-4-4v2H5v4h6v2l4-4z"/>
    </svg>
  ),
  'bg-gradient-to-br': (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
      <path d="M11.5 14.5L15 11l-1-1-2.5 2.5V5H10v7.5L7.5 10l-1 1 3.5 3.5h1.5z"/>
    </svg>
  ),
  'bg-gradient-to-b': (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
      <path d="M8 15l-4-4h2V5h4v6h2l-4 4z"/>
    </svg>
  ),
  'bg-gradient-to-bl': (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
      <path d="M4.5 14.5L1 11l1-1 2.5 2.5V5H6v7.5L8.5 10l1 1-3.5 3.5H4.5z"/>
    </svg>
  ),
  'bg-gradient-to-l': (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
      <path d="M1 8l4 4V10h6V6H5V4l-4 4z"/>
    </svg>
  ),
  'bg-gradient-to-tl': (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
      <path d="M4.5 1.5L1 5l1 1 2.5-2.5V11H6V3.5L8.5 6l1-1L6 1.5H4.5z"/>
    </svg>
  ),
};

/**
 * Labels para tooltip das direções
 */
const DirectionLabels = {
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
 * Proporção 16:9 com cores Tailwind exibidas abaixo
 */
export function GradientCard({ gradient, index }: GradientCardProps) {
  const [copied, setCopied] = useState<'colors' | 'classes' | null>(null);

  /**
   * Copia as cores ou classes Tailwind para a área de transferência
   */
  const handleCopyColors = async () => {
    const colorsText = gradient.colors.join(', ');
    const success = await copyToClipboard(colorsText);
    if (success) {
      setCopied('colors');
      setTimeout(() => setCopied(null), 2000);
    }
  };

  /**
   * Copia as classes Tailwind completas para a área de transferência
   */
  const handleCopyClasses = async () => {
    const success = await copyToClipboard(gradient.tailwindClasses);
    if (success) {
      setCopied('classes');
      setTimeout(() => setCopied(null), 2000);
    }
  };

  /**
   * Copia as cores quando clica no gradiente
   */
  const handleGradientClick = () => {
    handleCopyColors();
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
        onClick={handleGradientClick}
        role="button"
        tabIndex={0}
        aria-label={`Gradiente ${index ? index + 1 : ''} - Clique para copiar cores`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleGradientClick();
          }
        }}
      >
        {/* Overlay com feedback de cópia */}
        {copied && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-medium">
            {copied === 'colors' ? 'Cores copiadas!' : 'Classes copiadas!'}
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
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div
              className="flex items-center gap-1 text-gray-600"
              title={DirectionLabels[gradient.direction as keyof typeof DirectionLabels]}
            >
              {DirectionIcons[gradient.direction as keyof typeof DirectionIcons]}
              <span>{DirectionLabels[gradient.direction as keyof typeof DirectionLabels]}</span>
            </div>
          </div>
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
            className={`flex-1 text-xs py-1 px-2 rounded transition-colors ${
              copied === 'colors'
                ? 'bg-green-100 text-green-700'
                : 'bg-blue-50 hover:bg-blue-100 text-blue-600'
            }`}
          >
            {copied === 'colors' ? '✓ Copiado!' : 'Copiar Cores'}
          </button>
          <button
            onClick={handleCopyClasses}
            className={`flex-1 text-xs py-1 px-2 rounded transition-colors ${
              copied === 'classes'
                ? 'bg-green-100 text-green-700'
                : 'bg-purple-50 hover:bg-purple-100 text-purple-600'
            }`}
          >
            {copied === 'classes' ? '✓ Copiado!' : 'Copiar Classes'}
          </button>
        </div>
      </div>
    </div>
  );
}
