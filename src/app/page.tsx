import { GradientGrid } from "@/components/GradientGrid";

/**
 * Main application page
 * Renders grid with 100 random Tailwind gradients
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <GradientGrid cardCount={100} />
      </div>
    </main>
  );
}
