/**
 * Tipos para o sistema de gradientes Tailwind
 */

/**
 * Direções Tailwind para gradientes
 */
export type TailwindGradientDirection =
  | 'bg-gradient-to-t'     // to top
  | 'bg-gradient-to-tr'    // to top right
  | 'bg-gradient-to-r'     // to right
  | 'bg-gradient-to-br'    // to bottom right
  | 'bg-gradient-to-b'     // to bottom
  | 'bg-gradient-to-bl'    // to bottom left
  | 'bg-gradient-to-l'     // to left
  | 'bg-gradient-to-tl';   // to top left

/**
 * Configuração de um gradiente Tailwind
 */
export interface TailwindGradientConfig {
  colors: string[];                    // Cores Tailwind (ex: ["blue-500", "red-400"])
  direction: string;                   // Direção Tailwind (ex: "bg-gradient-to-r")
  tailwindClasses: string;             // Classes Tailwind completas
  directionLabel: string;              // Label legível da direção
  cssGradient?: string;                // CSS do gradiente (opcional)
}

/**
 * Props para o componente GradientCard
 */
export interface GradientCardProps {
  gradient: TailwindGradientConfig;
  index?: number;
}

/**
 * Props para o componente GradientGrid
 */
export interface GradientGridProps {
  cardCount?: number;
}

/**
 * Cores Tailwind disponíveis
 */
export type TailwindColor =
  | 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone'
  | 'red' | 'orange' | 'amber' | 'yellow' | 'lime'
  | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky'
  | 'blue' | 'indigo' | 'violet' | 'purple'
  | 'fuchsia' | 'pink' | 'rose';

/**
 * Tons Tailwind disponíveis
 */
export type TailwindShade =
  | '50' | '100' | '200' | '300' | '400'
  | '500' | '600' | '700' | '800' | '900' | '950';

// Manter compatibilidade com tipos antigos (deprecated)
export type GradientDirection = TailwindGradientDirection;
export type GradientConfig = TailwindGradientConfig;
