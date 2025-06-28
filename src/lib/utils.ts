import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Cores do Tailwind CSS organizadas por categoria
 */
const TAILWIND_COLORS = {
  // Cores básicas
  slate: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  gray: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  zinc: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  neutral: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  stone: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],

  // Cores vibrantes
  red: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  orange: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  amber: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  yellow: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  lime: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  green: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  emerald: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  teal: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  cyan: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  sky: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  blue: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  indigo: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  violet: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  purple: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  fuchsia: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  pink: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  rose: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
};

/**
 * Direções Tailwind para gradientes
 */
const TAILWIND_DIRECTIONS = [
  'bg-gradient-to-t',     // to top
  'bg-gradient-to-tr',    // to top right
  'bg-gradient-to-r',     // to right
  'bg-gradient-to-br',    // to bottom right
  'bg-gradient-to-b',     // to bottom
  'bg-gradient-to-bl',    // to bottom left
  'bg-gradient-to-l',     // to left
  'bg-gradient-to-tl',    // to top left
];

/**
 * Gerador de números pseudo-aleatórios determinístico usando seed
 * Implementação simples de Linear Congruential Generator (LCG)
 */
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  nextInt(max: number): number {
    return Math.floor(this.next() * max);
  }
}

/**
 * Gera uma cor Tailwind determinística baseada na seed
 * @param seed - Seed para geração determinística
 * @returns string - Cor no formato "color-shade" (ex: "blue-500")
 */
export function generateSeededTailwindColor(seed: number): string {
  const rng = new SeededRandom(seed);
  const colorNames = Object.keys(TAILWIND_COLORS);
  const randomColorName = colorNames[rng.nextInt(colorNames.length)];
  const shades = TAILWIND_COLORS[randomColorName as keyof typeof TAILWIND_COLORS];
  const randomShade = shades[rng.nextInt(shades.length)];

  return `${randomColorName}-${randomShade}`;
}

/**
 * Retorna uma direção determinística para o gradiente Tailwind baseada na seed
 * @param seed - Seed para geração determinística
 * @returns string - Classe Tailwind de direção (ex: "bg-gradient-to-r")
 */
export function getSeededTailwindDirection(seed: number): string {
  const rng = new SeededRandom(seed);
  return TAILWIND_DIRECTIONS[rng.nextInt(TAILWIND_DIRECTIONS.length)];
}

/**
 * Converte direção Tailwind para CSS legível
 */
export function getTailwindDirectionLabel(direction: string): string {
  const directionMap: { [key: string]: string } = {
    'bg-gradient-to-t': 'Para cima',
    'bg-gradient-to-tr': 'Para cima-direita',
    'bg-gradient-to-r': 'Para direita',
    'bg-gradient-to-br': 'Para baixo-direita',
    'bg-gradient-to-b': 'Para baixo',
    'bg-gradient-to-bl': 'Para baixo-esquerda',
    'bg-gradient-to-l': 'Para esquerda',
    'bg-gradient-to-tl': 'Para cima-esquerda',
  };

  return directionMap[direction] || direction;
}

/**
 * Gera uma configuração completa de gradiente Tailwind determinística
 * @param index - Índice do card para usar como seed base
 * @returns object - Configuração do gradiente com cores Tailwind
 */
export function generateSeededTailwindGradient(index: number) {
  const rng = new SeededRandom(index * 1000 + 42); // Seed baseada no índice

  // Gera entre 2 e 3 cores determinísticamente
  const colorCount = rng.nextInt(2) + 2; // 2 ou 3 cores
  const colors: string[] = [];

  for (let i = 0; i < colorCount; i++) {
    let newColor;
    let attempts = 0;
    do {
      // Usa seed diferente para cada cor para evitar duplicatas
      newColor = generateSeededTailwindColor(index * 1000 + i * 100 + attempts);
      attempts++;
    } while (colors.includes(newColor) && attempts < 50); // Failsafe para evitar loop infinito
    colors.push(newColor);
  }

  const direction = getSeededTailwindDirection(index * 1000 + 999);

  // Cria as classes Tailwind do gradiente
  let tailwindClasses = direction;

  // Adiciona as cores do gradiente
  colors.forEach((color, colorIndex) => {
    if (colorIndex === 0) {
      tailwindClasses += ` from-${color}`;
    } else if (colorIndex === 1) {
      tailwindClasses += ` to-${color}`;
    } else {
      tailwindClasses += ` via-${color}`;
    }
  });

  return {
    colors,
    direction,
    tailwindClasses,
    directionLabel: getTailwindDirectionLabel(direction)
  };
}

/**
 * Formata uma array de cores Tailwind para exibição
 * @param colors - Array de cores Tailwind
 * @returns string - Cores formatadas para exibição
 */
export function formatTailwindColorsDisplay(colors: string[]): string {
  return `Cores: ${colors.join(', ')}`;
}

/**
 * Gera CSS de gradiente a partir de cores Tailwind
 * @param colors - Array de cores Tailwind
 * @param direction - Direção do gradiente
 * @returns string - CSS do gradiente
 */
export function generateCSSFromTailwindColors(colors: string[], direction: string): string {
  // Mapeia direções Tailwind para CSS
  const directionMap: { [key: string]: string } = {
    'bg-gradient-to-t': 'to top',
    'bg-gradient-to-tr': 'to top right',
    'bg-gradient-to-r': 'to right',
    'bg-gradient-to-br': 'to bottom right',
    'bg-gradient-to-b': 'to bottom',
    'bg-gradient-to-bl': 'to bottom left',
    'bg-gradient-to-l': 'to left',
    'bg-gradient-to-tl': 'to top left',
  };

  // Converte cores Tailwind para valores CSS aproximados
  const cssColors = colors.map(color => convertTailwindToCSS(color));
  const cssDirection = directionMap[direction] || 'to right';

  return `linear-gradient(${cssDirection}, ${cssColors.join(', ')})`;
}

/**
 * Converte cor Tailwind para CSS aproximado
 * @param tailwindColor - Cor no formato "color-shade"
 * @returns string - Valor CSS da cor
 */
function convertTailwindToCSS(tailwindColor: string): string {
  // Mapeamento aproximado das cores Tailwind para CSS
  const colorMap: { [key: string]: { [key: string]: string } } = {
    slate: {
      '50': '#f8fafc', '100': '#f1f5f9', '200': '#e2e8f0', '300': '#cbd5e1',
      '400': '#94a3b8', '500': '#64748b', '600': '#475569', '700': '#334155',
      '800': '#1e293b', '900': '#0f172a', '950': '#020617'
    },
    gray: {
      '50': '#f9fafb', '100': '#f3f4f6', '200': '#e5e7eb', '300': '#d1d5db',
      '400': '#9ca3af', '500': '#6b7280', '600': '#4b5563', '700': '#374151',
      '800': '#1f2937', '900': '#111827', '950': '#030712'
    },
    red: {
      '50': '#fef2f2', '100': '#fee2e2', '200': '#fecaca', '300': '#fca5a5',
      '400': '#f87171', '500': '#ef4444', '600': '#dc2626', '700': '#b91c1c',
      '800': '#991b1b', '900': '#7f1d1d', '950': '#450a0a'
    },
    blue: {
      '50': '#eff6ff', '100': '#dbeafe', '200': '#bfdbfe', '300': '#93c5fd',
      '400': '#60a5fa', '500': '#3b82f6', '600': '#2563eb', '700': '#1d4ed8',
      '800': '#1e40af', '900': '#1e3a8a', '950': '#172554'
    },
    green: {
      '50': '#f0fdf4', '100': '#dcfce7', '200': '#bbf7d0', '300': '#86efac',
      '400': '#4ade80', '500': '#22c55e', '600': '#16a34a', '700': '#15803d',
      '800': '#166534', '900': '#14532d', '950': '#052e16'
    },
    purple: {
      '50': '#faf5ff', '100': '#f3e8ff', '200': '#e9d5ff', '300': '#d8b4fe',
      '400': '#c084fc', '500': '#a855f7', '600': '#9333ea', '700': '#7c3aed',
      '800': '#6b21a8', '900': '#581c87', '950': '#3b0764'
    },
    pink: {
      '50': '#fdf2f8', '100': '#fce7f3', '200': '#fbcfe8', '300': '#f9a8d4',
      '400': '#f472b6', '500': '#ec4899', '600': '#db2777', '700': '#be185d',
      '800': '#9d174d', '900': '#831843', '950': '#500724'
    },
    yellow: {
      '50': '#fefce8', '100': '#fef9c3', '200': '#fef08a', '300': '#fde047',
      '400': '#facc15', '500': '#eab308', '600': '#ca8a04', '700': '#a16207',
      '800': '#854d0e', '900': '#713f12', '950': '#422006'
    },
    orange: {
      '50': '#fff7ed', '100': '#ffedd5', '200': '#fed7aa', '300': '#fdba74',
      '400': '#fb923c', '500': '#f97316', '600': '#ea580c', '700': '#c2410c',
      '800': '#9a3412', '900': '#7c2d12', '950': '#431407'
    },
    teal: {
      '50': '#f0fdfa', '100': '#ccfbf1', '200': '#99f6e4', '300': '#5eead4',
      '400': '#2dd4bf', '500': '#14b8a6', '600': '#0d9488', '700': '#0f766e',
      '800': '#115e59', '900': '#134e4a', '950': '#042f2e'
    },
    cyan: {
      '50': '#ecfeff', '100': '#cffafe', '200': '#a5f3fc', '300': '#67e8f9',
      '400': '#22d3ee', '500': '#06b6d4', '600': '#0891b2', '700': '#0e7490',
      '800': '#155e75', '900': '#164e63', '950': '#083344'
    },
    indigo: {
      '50': '#eef2ff', '100': '#e0e7ff', '200': '#c7d2fe', '300': '#a5b4fc',
      '400': '#818cf8', '500': '#6366f1', '600': '#4f46e5', '700': '#4338ca',
      '800': '#3730a3', '900': '#312e81', '950': '#1e1b4b'
    },
    violet: {
      '50': '#f5f3ff', '100': '#ede9fe', '200': '#ddd6fe', '300': '#c4b5fd',
      '400': '#a78bfa', '500': '#8b5cf6', '600': '#7c3aed', '700': '#6d28d9',
      '800': '#5b21b6', '900': '#4c1d95', '950': '#2e1065'
    },
    fuchsia: {
      '50': '#fdf4ff', '100': '#fae8ff', '200': '#f5d0fe', '300': '#f0abfc',
      '400': '#e879f9', '500': '#d946ef', '600': '#c026d3', '700': '#a21caf',
      '800': '#86198f', '900': '#701a75', '950': '#4a044e'
    },
    rose: {
      '50': '#fff1f2', '100': '#ffe4e6', '200': '#fecdd3', '300': '#fda4af',
      '400': '#fb7185', '500': '#f43f5e', '600': '#e11d48', '700': '#be123c',
      '800': '#9f1239', '900': '#881337', '950': '#4c0519'
    },
    amber: {
      '50': '#fffbeb', '100': '#fef3c7', '200': '#fde68a', '300': '#fcd34d',
      '400': '#fbbf24', '500': '#f59e0b', '600': '#d97706', '700': '#b45309',
      '800': '#92400e', '900': '#78350f', '950': '#451a03'
    },
    lime: {
      '50': '#f7fee7', '100': '#ecfccb', '200': '#d9f99d', '300': '#bef264',
      '400': '#a3e635', '500': '#84cc16', '600': '#65a30d', '700': '#4d7c0f',
      '800': '#3f6212', '900': '#365314', '950': '#1a2e05'
    },
    emerald: {
      '50': '#ecfdf5', '100': '#d1fae5', '200': '#a7f3d0', '300': '#6ee7b7',
      '400': '#34d399', '500': '#10b981', '600': '#059669', '700': '#047857',
      '800': '#065f46', '900': '#064e3b', '950': '#022c22'
    },
    sky: {
      '50': '#f0f9ff', '100': '#e0f2fe', '200': '#bae6fd', '300': '#7dd3fc',
      '400': '#38bdf8', '500': '#0ea5e9', '600': '#0284c7', '700': '#0369a1',
      '800': '#075985', '900': '#0c4a6e', '950': '#082f49'
    },
    zinc: {
      '50': '#fafafa', '100': '#f4f4f5', '200': '#e4e4e7', '300': '#d4d4d8',
      '400': '#a1a1aa', '500': '#71717a', '600': '#52525b', '700': '#3f3f46',
      '800': '#27272a', '900': '#18181b', '950': '#09090b'
    },
    neutral: {
      '50': '#fafafa', '100': '#f5f5f5', '200': '#e5e5e5', '300': '#d4d4d4',
      '400': '#a3a3a3', '500': '#737373', '600': '#525252', '700': '#404040',
      '800': '#262626', '900': '#171717', '950': '#0a0a0a'
    },
    stone: {
      '50': '#fafaf9', '100': '#f5f5f4', '200': '#e7e5e4', '300': '#d6d3d1',
      '400': '#a8a29e', '500': '#78716c', '600': '#57534e', '700': '#44403c',
      '800': '#292524', '900': '#1c1917', '950': '#0c0a09'
    }
  };

  const [colorName, shade] = tailwindColor.split('-');
  return colorMap[colorName]?.[shade] || '#6b7280'; // fallback para gray-500
}

/**
 * Copia texto para a área de transferência
 * @param text - Texto a ser copiado
 * @returns Promise<boolean> - True se copiou com sucesso
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Erro ao copiar para clipboard:', err);
    return false;
  }
}
