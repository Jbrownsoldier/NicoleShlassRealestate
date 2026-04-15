"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export function PolicyModal({ isOpen, onClose, title, content }: PolicyModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Simple renderer for the markdown-like policy strings
  const renderContent = (text: string) => {
    return text.split("\n\n").map((block, i) => {
      // Headers
      if (block.startsWith("# ")) {
        return (
          <h1 key={i} className="font-serif text-headline-md text-on-surface font-semibold mb-6">
            {block.replace("# ", "")}
          </h1>
        );
      }
      if (block.startsWith("### ")) {
        return (
          <h3 key={i} className="font-serif text-title-lg text-on-surface font-semibold mt-8 mb-4">
            {block.replace("### ", "")}
          </h3>
        );
      }
      
      // List items
      if (block.includes("\n- ")) {
        const lines = block.split("\n");
        const listItems = lines.filter(l => l.startsWith("- ")).map(l => l.replace("- ", ""));
        const intro = lines[0].startsWith("- ") ? null : lines[0];
        
        return (
          <div key={i} className="mb-4">
            {intro && <p className="mb-2 text-on-surface-variant">{intro}</p>}
            <ul className="space-y-2 list-disc pl-5">
              {listItems.map((item, j) => (
                <li key={j} className="text-body-md text-on-surface-variant">
                  {parseInline(item)}
                </li>
              ))}
            </ul>
          </div>
        );
      }

      // Default paragraph
      return (
        <p key={i} className="text-body-md text-on-surface-variant leading-relaxed mb-4">
          {parseInline(block)}
        </p>
      );
    });
  };

  // Very basic inline parser for **bold** and [links](url)
  const parseInline = (text: string) => {
    // Bold
    let parts: (string | JSX.Element)[] = [text];
    
    // Process Bold
    parts = parts.flatMap(part => {
      if (typeof part !== "string") return part;
      const subparts = part.split(/(\*\*.*?\*\*)/g);
      return subparts.map(sub => {
        if (sub.startsWith("**") && sub.endsWith("**")) {
          return <strong key={sub} className="text-on-surface font-semibold">{sub.slice(2, -2)}</strong>;
        }
        return sub;
      });
    });

    // Process Links
    parts = parts.flatMap(part => {
      if (typeof part !== "string") return part;
      const subparts = part.split(/(\[.*?\]\(.*?\))/g);
      return subparts.map(sub => {
        const match = sub.match(/\[(.*?)\]\((.*?)\)/);
        if (match) {
          return (
            <a 
              key={sub} 
              href={match[2]} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-secondary hover:text-on-surface transition-colors underline decoration-secondary/30 underline-offset-4"
            >
              {match[1]}
            </a>
          );
        }
        return sub;
      });
    });

    return parts;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-3xl max-h-[85vh] glass-deep shadow-ambient rounded-2xl overflow-hidden pointer-events-auto flex flex-col"
            >
              {/* Gold Top Accent */}
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

              {/* Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-outline-variant/10">
                <h2 className="text-label-lg text-gold font-semibold tracking-widest">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-on-surface/5 text-on-surface-variant hover:text-on-surface transition-all active:scale-90"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content area */}
              <div className="flex-1 overflow-y-auto px-8 py-10 custom-scrollbar">
                <div className="max-w-2xl mx-auto">
                    {renderContent(content)}
                </div>
              </div>

              {/* Footer */}
              <div className="px-8 py-6 border-t border-outline-variant/10 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full glass-card text-label-md text-on-surface hover:bg-on-surface/5 transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
