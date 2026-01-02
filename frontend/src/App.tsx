import "./App.css";
import errors from "../../errors.json";
import SyntaxHighlighter from "react-syntax-highlighter";
import { githubGist } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Terminal from "./lib/Terminal";
import Markdown from "react-markdown";

function App() {
  return (
    <>
        <div className="mt-12 mb-8">
            <h1
                className="
      scroll-m-20 text-center text-6xl font-extrabold tracking-tight text-balance mb-4"
            >
                Python Error Garden
            </h1>
            <p>Python improves to continue it's error messages. Let's explore their evolution! ✨</p>
        </div>

      <main className="text-start flex flex-col gap-2 m-auto max-w-3xl">
        {errors.map((error) => (
          <div className="my-4 border shadow-sm p-4 rounded-2xl bg-card">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2">
              {error.title || error.name}
            </h2>
            <div className="mb-4 text-sm text-secondary-foreground prose prose-sm max-w-none">
              <Markdown>{error.description}</Markdown>
            </div>
            <div className="rounded-2xl">
              <SyntaxHighlighter
                showLineNumbers={true}
                lineNumberContainerStyle={{ color: '#999', backgroundColor: '#ff0000' }}
                lineNumberStyle={{ color: '#999' }}
                language="python"
                style={githubGist}
                className="rounded-xl border text-sm"
              >
                {error.code.trim()}
              </SyntaxHighlighter>
            </div>
            <div className="flex flex-col max-w-full overflow-x-scroll gap-4 mt-4">
              {error.version_results.map((result) => (
                <div className="text-sm">
                  Python{result.version}
                  <Terminal
                    output={result.diagnostic}
                    className="bg-white border rounded-2xl p-2 rounded-xl"
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
