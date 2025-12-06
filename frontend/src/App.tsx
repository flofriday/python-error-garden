import { useState } from "react";
import "./App.css";
import errors from "../../errors.json";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1
        className=" mt-12 mb-8
      scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance"
      >
        The Python Error Garden
      </h1>

      <main className="text-start flex flex-col gap-2 m-auto max-w-3xl">
        {errors.map((error) => (
          <div className="my-4">
            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {error.name}
            </h2>
            <div className="rounded-lg text-white bg-black text-start p-2">
              <pre>{error.code}</pre>
            </div>
            <div className="flex flex-row max-w-full overflow-x-scroll gap-2 mt-4">
              {error.version_results.map((result) => (
                <div>
                  {result.version}
                  <div className="rounded-lg text-white bg-black text-start p-2">
                    <pre>{result.diagnostic}</pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </>
  );
}

export default App;
