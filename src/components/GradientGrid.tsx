"use client";

import { useMemo } from "react";
import { generateSeededTailwindGradient } from "../lib/utils";
import { GradientGridProps, TailwindGradientConfig } from "../types";
import { GradientCard } from "./GradientCard";

/**
 * Component that renders a responsive grid with Tailwind gradient cards
 * Generates deterministic gradients based on each card's index
 */
export function GradientGrid({ cardCount = 100 }: GradientGridProps) {
  /**
   * Generates deterministic Tailwind gradients based on index
   * This ensures server and client generate the same gradients
   */
  const gradients = useMemo<TailwindGradientConfig[]>(() => {
    const newGradients: TailwindGradientConfig[] = [];

    for (let i = 0; i < cardCount; i++) {
      newGradients.push(generateSeededTailwindGradient(i));
    }

    return newGradients;
  }, [cardCount]);

  // Gradient statistics
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
      {/* Header with information */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">TW</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            Tailwind Gradient Generator
          </h1>
        </div>
        <p className="text-lg text-gray-600 mb-4">
          {cardCount} unique gradients using Tailwind CSS colors
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-4">
          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
            🎨 {stats.colorsUsed} different colors
          </span>
          <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full">
            🧭 {stats.directionsUsed} directions
          </span>
          <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full">
            ⚡ Ready-to-use classes
          </span>
        </div>
        <p className="text-sm text-gray-500">
          Click on cards to copy colors or classes • Deterministic gradients (no hydration issues)
        </p>
      </div>

      {/* Responsive cards grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {gradients.map((gradient, index) => (
          <GradientCard
            key={`tailwind-gradient-${index}`}
            gradient={gradient}
            index={index}
          />
        ))}
      </div>

      {/* Footer with statistics and information */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="text-center space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-800">{stats.totalColors}</div>
              <div className="text-sm text-gray-600">Total colors applied</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-800">{stats.colorsUsed}</div>
              <div className="text-sm text-gray-600">Unique Tailwind colors</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-800">{stats.directionsUsed}</div>
              <div className="text-sm text-gray-600">Gradient directions</div>
            </div>
          </div>

          <div className="text-sm text-gray-500 space-y-2">
            <p>
              All gradients use only official Tailwind CSS colors
            </p>
            <p className="font-mono text-xs bg-gray-100 inline-block px-2 py-1 rounded">
              Example: bg-gradient-to-r from-blue-500 to-purple-600
            </p>
            <p className="text-xs text-green-600">
              ✅ No hydration issues - Deterministic gradients
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
