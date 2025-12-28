import { useState } from "react";
import "./App.css";
import errors from "../../errors.json";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Terminal from "./lib/Terminal";

function App() {
  return (
    <>
      <h1
        className=" mt-12 mb-8
      scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance"
      >
        Python Error Garden
      </h1>

      <main className="text-start flex flex-col gap-2 m-auto max-w-3xl">
        {errors.map((error) => (
          <div className="my-4 border-solid border p-4 rounded-2xl">
            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {error.title || error.name}
            </h2>
            <p className="mb-8 text-sm text-secondary-foreground">
              {error.description}
            </p>
            <div className="rounded-2xl">
              <SyntaxHighlighter
                showLineNumbers={true}
                language="python"
                style={atomOneDark}
                className="rounded-xl"
              >
                {error.code}
              </SyntaxHighlighter>
            </div>
            <div className="flex flex-col max-w-full overflow-x-scroll gap-2 mt-4">
              {error.version_results.map((result) => (
                <div>
                  Python{result.version}
                  <Terminal
                    output={result.diagnostic}
                    className="bg-black p-2 rounded-xl"
                  ></Terminal>
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
