"use client";

import { generateSeededTailwindGradient } from "@/lib/utils";
import { GradientGridProps, TailwindGradientConfig } from "@/types";
import { useMemo } from "react";
import { GradientCard } from "./GradientCard";

/**
 * Componente que renderiza um grid responsivo com cards de gradientes Tailwind
 * Gera gradientes determinísticos baseados no índice de cada card
 */
export function GradientGrid({ cardCount = 100 }: GradientGridProps) {
  /**
   * Gera gradientes Tailwind determinísticos baseados no índice
   * Isso garante que o servidor e cliente gerem os mesmos gradientes
   */
  const gradients = useMemo<TailwindGradientConfig[]>(() => {
    const newGradients: TailwindGradientConfig[] = [];

    for (let i = 0; i < cardCount; i++) {
      newGradients.push(generateSeededTailwindGradient(i));
    }

    return newGradients;
  }, [cardCount]);

  // Estatísticas dos gradientes
  const stats = useMemo(() => {
    const totalColors = gradients.reduce((acc, gradient) => acc + gradient.colors.length, 0);
    const directionsUsed = new Set(gradients.map(g => g.direction)).size;
    const colorsUsed = new Set(gradients.flatMap(g => g.colors)).size;

    return {
      totalColors,
      directionsUsed,
      colorsUsed
    };
  }, [gradients]);

  return (
    <div className="w-full">
      {/* Header com informações */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">TW</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            Gerador de Gradientes Tailwind
          </h1>
        </div>
        <p className="text-lg text-gray-600 mb-4">
          {cardCount} gradientes únicos usando cores do Tailwind CSS
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-4">
          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
            🎨 {stats.colorsUsed} cores diferentes
          </span>
          <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full">
            🧭 {stats.directionsUsed} direções
          </span>
          <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full">
            ⚡ Classes prontas para usar
          </span>
        </div>
        <p className="text-sm text-gray-500">
          Clique nos cards para copiar cores ou classes • Gradientes determinísticos (sem hidratação)
        </p>
      </div>

      {/* Grid responsivo de cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {gradients.map((gradient, index) => (
          <GradientCard
            key={`tailwind-gradient-${index}`}
            gradient={gradient}
            index={index}
          />
        ))}
      </div>

      {/* Footer com estatísticas e informações */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="text-center space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-800">{stats.totalColors}</div>
              <div className="text-sm text-gray-600">Total de cores aplicadas</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-800">{stats.colorsUsed}</div>
              <div className="text-sm text-gray-600">Cores Tailwind únicas</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-800">{stats.directionsUsed}</div>
              <div className="text-sm text-gray-600">Direções de gradiente</div>
            </div>
          </div>

          <div className="text-sm text-gray-500 space-y-2">
            <p>
              Todos os gradientes usam apenas cores oficiais do Tailwind CSS
            </p>
            <p className="font-mono text-xs bg-gray-100 inline-block px-2 py-1 rounded">
              Exemplo: bg-gradient-to-r from-blue-500 to-purple-600
            </p>
            <p className="text-xs text-green-600">
              ✅ Sem problemas de hidratação - Gradientes determinísticos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
