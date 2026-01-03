import { useState } from "react";
import Markdown from "react-markdown";
import CodeView from "./CodeView";
import Terminal from "../lib/Terminal";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

interface VersionResult {
  version: string;
  diagnostic: string;
}

interface ErrorCardProps {
  title: string;
  description: string;
  code: string;
  versionResults: VersionResult[];
}

export default function ErrorCard({ title, description, code, versionResults }: ErrorCardProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const headerId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <div className="my-4 border shadow-sm p-4 rounded-2xl bg-card relative">
             <Button
          onClick={() => setIsCollapsed(!isCollapsed)}
          variant="outline"
          size="icon-sm"
          aria-label={isCollapsed ? "Expand" : "Collapse"}
          className="hover:bg-white hover:text-gray-800 absolute top-4 right-4 z-10"
        >
          <ChevronDown
            className={`transition-transform duration-300 ${
              isCollapsed ? '' : 'rotate-180'
            }`}
          />
        </Button>

      <div className="mb-2 mr-12">
        <h2 id={headerId} className="scroll-m-20 text-2xl font-semibold tracking-tight group">
          {title}
          <a
            href={`#${headerId}`}
            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 no-underline hover:text-gray-600 font-sans"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            ¶
          </a>
        </h2>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[10000px] opacity-100'
        }`}
      >
        <div className="mb-4 text-sm text-secondary-foreground prose prose-sm max-w-none">
          <Markdown>{description}</Markdown>
        </div>
        <CodeView code={code} />
        <div className="flex flex-col max-w-full overflow-x-scroll gap-4 mt-4">
          {versionResults.map((result) => (
            <div key={result.version} className="text-sm">
              Python{result.version}
              <Terminal
                output={result.diagnostic}
                className="bg-white border rounded-2xl p-2 rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
