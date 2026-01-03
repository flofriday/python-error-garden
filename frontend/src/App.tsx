import { useEffect } from "react";
import "./App.css";
import errors from "../../errors.json";
import ErrorCard from "./components/ErrorCard";
import EndCard from "./components/EndCard";

function App() {
  useEffect(() => {
    // Handle hash navigation after content is rendered
    const hash = window.location.hash;
    if (hash) {
      // Small delay to ensure content is fully rendered
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="p-4">
      <div className="mt-12 mb-8">
        <h1 className="scroll-m-20 text-center text-6xl font-extrabold tracking-tight text-balance mb-4">
          Python Error Garden
        </h1>
        <p>Python continues to improve it's error messages. Let's explore their evolution! 🎉</p>
      </div>

      <main className="text-start flex flex-col gap-2 m-auto max-w-3xl">
        {errors.map((error) => (
          <ErrorCard
            key={error.name}
            title={error.title || error.name}
            description={error.description}
            code={error.code}
            versionResults={error.version_results}
          />
        ))}
        <EndCard />
      </main>
    </div>
  );
}

export default App;
