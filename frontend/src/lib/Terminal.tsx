import { useEffect, useRef } from "react";
import { Terminal as XTerm } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";

interface TerminalProps {
  output?: string;
  className?: string;
}

export default function Terminal({
  output = "",
  className = "",
}: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);

  // Initialize terminal
  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new XTerm({
      cursorBlink: false,
      fontSize: 14,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      rows: 8,
      cols: 100,
      theme: {
        background: "#000000",
        foreground: "#ffffff",
        cursor: "#ffffff",
      },
    });

    term.open(terminalRef.current);
    xtermRef.current = term;
    // Handle user input if onData callback is provided

    // Cleanup
    return () => {
      term.dispose();
    };
  }, []);

  // Update output when prop changes
  useEffect(() => {
    if (xtermRef.current && output) {
      xtermRef.current.write(output);
    }
  }, [output]);

  return <div ref={terminalRef} className={className} />;
}
