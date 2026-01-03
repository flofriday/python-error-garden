import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { githubGist } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Copy, Check } from "lucide-react";
import { Button } from "./ui/button";

interface CodeViewProps {
  code: string;
}

export default function CodeView({ code }: CodeViewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-2xl">
      <Button
        onClick={handleCopy}
        variant="outline"
        size="icon-sm"
        className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white"
        title="Copy code"
      >
        {copied ? (
          <Check className="text-green-600" />
        ) : (
          <Copy className="text-gray-600" />
        )}
      </Button>
      <SyntaxHighlighter
        showLineNumbers={true}
        lineNumberContainerStyle={{ color: '#999', backgroundColor: '#ff0000' }}
        lineNumberStyle={{ color: '#999' }}
        language="python"
        style={githubGist}
        className="rounded-xl border text-sm min-h-16"
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
