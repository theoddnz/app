import type { ReactNode } from "react";

function safeUrl(url: string) {
  if (url.startsWith("https://") || url.startsWith("http://") || url.startsWith("/")) {
    return url;
  }

  return "#";
}

function renderInline(text: string) {
  const parts = text.split(/(!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g);

  return parts.map((part, index) => {
    const image = part.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (image) {
      return (
        <img
          key={index}
          src={safeUrl(image[2])}
          alt={image[1]}
          className="my-6 aspect-video w-full rounded-lg border border-border object-cover"
        />
      );
    }

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a key={index} href={safeUrl(link[2])} target="_blank" rel="noreferrer" className="text-foreground underline underline-offset-4">
          {link[1]}
        </a>
      );
    }

    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }

    return part;
  });
}

function blockFor(line: string, index: number): ReactNode {
  if (!line.trim()) {
    return null;
  }

  if (line.startsWith("### ")) {
    return <h3 key={index} className="mt-8 text-xl font-semibold">{renderInline(line.slice(4))}</h3>;
  }

  if (line.startsWith("## ")) {
    return <h2 key={index} className="mt-10 text-2xl font-semibold">{renderInline(line.slice(3))}</h2>;
  }

  if (line.startsWith("# ")) {
    return <h1 key={index} className="mt-10 text-3xl font-bold">{renderInline(line.slice(2))}</h1>;
  }

  if (line.startsWith("> ")) {
    return (
      <blockquote key={index} className="my-5 border-l-2 border-foreground/30 pl-4 text-foreground/65">
        {renderInline(line.slice(2))}
      </blockquote>
    );
  }

  if (line.startsWith("- ")) {
    return <li key={index} className="ml-5 list-disc leading-7 text-foreground/70">{renderInline(line.slice(2))}</li>;
  }

  return <p key={index} className="leading-8 text-foreground/70">{renderInline(line)}</p>;
}

export function MarkdownPreview({ content, empty = "Preview will appear here." }: { content: string; empty?: string }) {
  const blocks = content.split("\n").map(blockFor).filter(Boolean);

  if (blocks.length === 0) {
    return <p className="text-sm text-muted-foreground">{empty}</p>;
  }

  return <div className="space-y-4">{blocks}</div>;
}
