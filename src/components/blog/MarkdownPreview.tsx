import type { ComponentPropsWithoutRef, ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";

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

// Converts legacy custom tags into standard HTML so react-markdown + rehype-raw can render them.
function normalizeMarkdown(content: string) {
  let out = content;

  if (!out.includes("\n") && out.includes("\\n")) {
    out = out.replace(/\\n/g, "\n");
  }

  out = out.replace(
    /<\s*(?:YouTube|Youtube)\b[^>]*?(?:youtubeId|id)\s*=\s*["']([^"']+)["'][^>]*?\/?>/gi,
    (_match, id: string) =>
      `\n<iframe src="https://www.youtube-nocookie.com/embed/${id}" title="Embedded video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>\n`,
  );

  out = out.replace(/<\s*Image\b/gi, "<img").replace(/<\/\s*Image\s*>/gi, "");

  return out;
}

const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), "iframe", "video", "source", "figure", "figcaption"],
  attributes: {
    ...defaultSchema.attributes,
    "*": [...(defaultSchema.attributes?.["*"] ?? []), "className"],
    iframe: ["src", "title", "loading", "allow", "allowfullscreen", "frameborder"],
    video: ["src", "controls", "poster"],
    source: ["src", "type"],
    a: [...(defaultSchema.attributes?.a ?? []), "target", "rel"],
    code: [...(defaultSchema.attributes?.code ?? []), "className"],
    span: [...(defaultSchema.attributes?.span ?? []), "className"],
  },
};

const markdownComponents: Components = {
  a({ href, children, ...props }) {
    const url = safeUrl(typeof href === "string" ? href : "#");
    const external = url.startsWith("http");
    return (
      <a href={url} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} {...props}>
        {children}
      </a>
    );
  },
  img({ src, alt }) {
    const url = safeUrl(typeof src === "string" ? src : "");
    return (
      <figure className="not-prose my-8">
        <img src={url} alt={alt ?? ""} loading="lazy" className="w-full rounded-xl border border-border object-cover" />
        {alt ? <figcaption className="mt-2.5 text-center text-sm text-muted-foreground">{alt}</figcaption> : null}
      </figure>
    );
  },
  iframe(props: ComponentPropsWithoutRef<"iframe">) {
    return (
      <div className="not-prose my-8 aspect-video overflow-hidden rounded-xl border border-border bg-black">
        <iframe {...props} className="size-full" />
      </div>
    );
  },
  video(props: ComponentPropsWithoutRef<"video">) {
    return <video controls {...props} className="not-prose my-8 w-full rounded-xl border border-border bg-black" />;
  },
};

const proseClassName = [
  "blog-prose prose prose-lg prose-neutral max-w-none dark:prose-invert",
  "prose-headings:font-heading prose-headings:font-semibold prose-headings:tracking-tight",
  "prose-h2:mt-12 prose-h2:text-2xl prose-h3:text-xl",
  "prose-p:text-foreground/80 prose-li:text-foreground/80",
  "prose-a:text-[#c4622d] prose-a:font-medium prose-a:no-underline hover:prose-a:underline",
  "prose-strong:text-foreground",
  "prose-blockquote:border-l-2 prose-blockquote:border-[#c4622d] prose-blockquote:not-italic prose-blockquote:text-foreground/70",
  "prose-li:marker:text-[#c4622d]",
  "prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.85em] prose-code:font-normal prose-code:before:content-[''] prose-code:after:content-['']",
  "prose-img:rounded-xl prose-hr:border-border",
].join(" ");

export function MarkdownPreview({
  content,
  empty = "Preview will appear here.",
}: {
  content: string;
  empty?: string;
}): ReactNode {
  const legacyBlocks = parseLegacyBlocks(content);

  if (legacyBlocks) {
    return <div className="space-y-4">{legacyBlocks.map(renderLegacyBlock)}</div>;
  }

  if (!content.trim()) {
    return empty ? <p className="text-sm text-muted-foreground">{empty}</p> : null;
  }

  return (
    <div className={proseClassName}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema], rehypeHighlight]}
        components={markdownComponents}
      >
        {normalizeMarkdown(content)}
      </ReactMarkdown>
    </div>
  );
}
