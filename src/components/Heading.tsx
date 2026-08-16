import { isValidElement, type ReactNode } from "react";

/** Flatten a heading's children down to its plain text, for slugging. */
function textOf(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement(node)) {
    return textOf((node.props as { children?: ReactNode }).children);
  }
  return "";
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * Heading with an anchor id, so in-page links work.
 *
 * Migrated posts carry hand-built tables of contents pointing at the ids the
 * WordPress editor assigned ("#side-effects" on "Potential Side Effects"),
 * which a slug of the heading text would not reproduce. Those headings come
 * through as real markup with the id already on them, so an explicit `id`
 * always wins; everything else gets a slug of its own text.
 */
export function mdxHeading(level: 2 | 3 | 4) {
  const Tag = `h${level}` as const;
  return function Heading({
    id,
    children,
    ...rest
  }: {
    id?: string;
    children?: ReactNode;
  }) {
    return (
      <Tag id={id ?? slugify(textOf(children))} {...rest}>
        {children}
      </Tag>
    );
  };
}
