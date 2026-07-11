import type { ReactNode } from "react";

type LegacyBlock =
  | { type: "p" | "h2" | "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "video"; youtubeId: string; caption?: string };

function safeUrl(url: string) {
  if (url.startsWith("https://") || url.startsWith("http://") || url.startsWith("/")) {
    return url;
  }

  return "#";
}

function plainText(value: string) {
  return value
    .replace(/\\n/g, "\n")
    .replace(/\\"/g, "\"")
    .replace(/\\'/g, "'")
    .trim();
}

function fieldValue(block: string, field: string) {
  const match = block.match(new RegExp(`${field}:\\s*["']([\\s\\S]*?)["']\\s*,?`));
  return match ? plainText(match[1]) : "";
}

function parseLegacyBlocks(content: string): LegacyBlock[] | null {
  if (!/\bbody\s*:/.test(content) || !/\btype\s*:/.test(content)) {
    return null;
  }

  const blocks = Array.from(content.matchAll(/\{\s*type:\s*["']([^"']+)["']([\s\S]*?)\}\s*,?/g))
    .map((match) => {
      const type = match[1];
      const body = match[2];

      if (type === "p" || type === "h2" || type === "quote") {
        const text = fieldValue(body, "text");
        return text ? { type, text } : null;
      }

      if (type === "list") {
        const itemsBlock = body.match(/items:\s*\[([\s\S]*?)\]/);
        const items = itemsBlock
          ? Array.from(itemsBlock[1].matchAll(/["']([\s\S]*?)["']/g)).map((item) => plainText(item[1])).filter(Boolean)
          : [];

        return items.length > 0 ? { type, items } : null;
      }

      if (type === "video") {
        const youtubeId = fieldValue(body, "youtubeId");
        const caption = fieldValue(body, "caption");
        return youtubeId ? { type, youtubeId, caption: caption || undefined } : null;
      }

      return null;
    })
    .filter((block): block is LegacyBlock => Boolean(block));

  return blocks.length > 0 ? blocks : null;
}

function renderInline(text: string) {
  const parts = text.split(/(!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g);

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

    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={index} className="rounded bg-muted px-1 py-0.5 text-[0.9em] text-foreground">{part.slice(1, -1)}</code>;
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

function renderImage(src: string, alt: string, key: number | string) {
  return (
    <figure key={key} className="my-6 overflow-hidden rounded-lg border border-border bg-muted">
      <img
        src={safeUrl(src)}
        alt={alt}
        className="aspect-video w-full object-cover"
      />
    </figure>
  );
}

function renderYoutube(youtubeId: string, caption: string | undefined, key: number | string) {
  return (
    <figure key={key} className="my-6">
      <div className="aspect-video overflow-hidden rounded-lg border border-border bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
          title={caption ?? "Video"}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="size-full"
        />
      </div>
      {caption ? <figcaption className="mt-2 text-center text-sm text-foreground/45">{caption}</figcaption> : null}
    </figure>
  );
}

function renderLegacyBlock(block: LegacyBlock, index: number) {
  if (block.type === "h2") {
    return <h2 key={index} className="mt-10 text-2xl font-semibold">{renderInline(block.text)}</h2>;
  }

  if (block.type === "quote") {
    return (
      <blockquote key={index} className="my-5 border-l-2 border-foreground/30 pl-4 text-foreground/65">
        {renderInline(block.text)}
      </blockquote>
    );
  }

  if (block.type === "list") {
    return (
      <ul key={index} className="my-5 space-y-2">
        {block.items.map((item, itemIndex) => (
          <li key={itemIndex} className="ml-5 list-disc leading-7 text-foreground/70">{renderInline(item)}</li>
        ))}
      </ul>
    );
  }

  if (block.type === "video") {
    return renderYoutube(block.youtubeId, block.caption, index);
  }

  return <p key={index} className="leading-8 text-foreground/70">{renderInline(block.text)}</p>;
}

function blockFor(block: string, index: number): ReactNode {
  const value = block.trim();

  if (!value) {
    return null;
  }

  const video = value.match(/^<video\b[^>]*\bsrc=["']([^"']+)["'][^>]*\/?>$/);
  if (video) {
    return (
      <video
        key={index}
        controls
        src={safeUrl(video[1])}
        className="my-6 aspect-video w-full rounded-lg border border-border bg-black object-contain"
      />
    );
  }

  const markdownImage = value.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
  if (markdownImage) {
    return renderImage(markdownImage[2], markdownImage[1], index);
  }

  const image = value.match(/^<(?:img|Image)\b[^>]*\bsrc=["']([^"']+)["'][^>]*(?:\balt=["']([^"']*)["'])?[^>]*\/?>$/);
  if (image) {
    return renderImage(image[1], image[2] ?? "", index);
  }

  const youtube = value.match(/^<(?:YouTube|Youtube)\b[^>]*(?:\bid|youtubeId)=["']([^"']+)["'][^>]*(?:\bcaption=["']([^"']*)["'])?[^>]*\/?>$/);
  if (youtube) {
    return renderYoutube(youtube[1], youtube[2], index);
  }

  if (value.startsWith("### ")) {
    return <h3 key={index} className="mt-8 text-xl font-semibold">{renderInline(value.slice(4))}</h3>;
  }

  if (value.startsWith("## ")) {
    return <h2 key={index} className="mt-10 text-2xl font-semibold">{renderInline(value.slice(3))}</h2>;
  }

  if (value.startsWith("# ")) {
    return <h1 key={index} className="mt-10 text-3xl font-bold">{renderInline(value.slice(2))}</h1>;
  }

  if (value.startsWith("> ")) {
    return (
      <blockquote key={index} className="my-5 border-l-2 border-foreground/30 pl-4 text-foreground/65">
        {renderInline(value.slice(2))}
      </blockquote>
    );
  }

  if (value.startsWith("- ")) {
    return (
      <ul key={index} className="my-5 space-y-2">
        {value.split("\n").map((item, itemIndex) => (
          <li key={itemIndex} className="ml-5 list-disc leading-7 text-foreground/70">{renderInline(item.replace(/^- /, ""))}</li>
        ))}
      </ul>
    );
  }

  return <p key={index} className="leading-8 text-foreground/70">{renderInline(value.replace(/\n+/g, " "))}</p>;
}

function markdownBlocks(content: string) {
  const blocks: string[] = [];
  let paragraph: string[] = [];

  function flushParagraph() {
    if (paragraph.length > 0) {
      blocks.push(paragraph.join("\n"));
      paragraph = [];
    }
  }

  for (const line of content.split("\n")) {
    const value = line.trim();

    if (!value) {
      flushParagraph();
      continue;
    }

    if (
      /^!\[[^\]]*\]\([^)]+\)$/.test(value) ||
      /^<(?:video|img|Image|YouTube|Youtube)\b/.test(value) ||
      /^(#{1,3} |> |- )/.test(value)
    ) {
      flushParagraph();
      blocks.push(value);
      continue;
    }

    paragraph.push(value);
  }

  flushParagraph();
  return blocks;
}

export function MarkdownPreview({ content, empty = "Preview will appear here." }: { content: string; empty?: string }) {
  const legacyBlocks = parseLegacyBlocks(content);
  const blocks = legacyBlocks
    ? legacyBlocks.map(renderLegacyBlock)
    : markdownBlocks(content).map(blockFor).filter(Boolean);

  if (blocks.length === 0) {
    return <p className="text-sm text-muted-foreground">{empty}</p>;
  }

  return <div className="space-y-4">{blocks}</div>;
}
