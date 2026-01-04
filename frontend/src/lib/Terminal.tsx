import { useMemo } from "react";
import Anser from "anser";

interface TerminalProps {
  output?: string;
  className?: string;
}

export default function Terminal({
  output = "",
  className = "",
}: TerminalProps) {
  const htmlOutput = useMemo(() => {
    if (!output) return "";

    // Convert ANSI to HTML
    const anserOutput = Anser.ansiToHtml(output, {
      use_classes: false,
    });

    return anserOutput;
  }, [output]);

  return (
    <pre
      className={`bg-black p-2 font-mono text-sm overflow-x-auto ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlOutput }}
    />
  );
}
