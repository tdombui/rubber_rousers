import TireVisualizer from "@/app/components/TireVisualizer";

export default function Home() {
  return (
    <div
      className="min-h-screen grid grid-rows-[auto_1fr_auto] font-[family-name:var(--font-geist-sans)]"
      style={{
        backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Sticky Top Nav */}
      <header className="top-0 z-50 w-full text-white text-center p-2 py-4 shadow-lg pt-8">
        <h1
          className="text-4xl sm:text-4xl font-bold select-none"
        >
          Rubber Rousers
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-4 py-4 gap-6 row-start-2">
        <TireVisualizer />
      </main>

      {/* Footer */}
      <footer className="row-start-3 flex flex-wrap gap-6 items-center justify-center py-4 text-white text-sm">
        {/* Footer content here */}
      </footer>
    </div>
  );
}
