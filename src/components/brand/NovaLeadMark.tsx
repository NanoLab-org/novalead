/**
 * NovaLead "NL" monogram, inlined on purpose.
 *
 * The navy strokes are `currentColor` so the mark follows the surrounding
 * text colour — that is what lets the navbar swap white/graphite over the
 * hero without shipping a second file. This only works inlined: an SVG
 * loaded through <img>/next/image resolves currentColor against its own
 * document, not ours, and would render black.
 *
 * The teal accent is a fixed brand colour and deliberately stays literal.
 *
 * Source of truth: public/brand/novalead-mark.svg (kept in sync by hand).
 */
export default function NovaLeadMark({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 137 100"
      role="img"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        fill="currentColor"
        d="M0 72V8A8 8 0 0 1 8 0H9Q11.5 0 13 2L84.5 73.5V96.1L16 27.6V72Z"
      />
      <path fill="currentColor" d="M84.5 0H100.5V84Q95 84 84.5 73.5Z" />
      <path
        fill="#2CB7BC"
        d="M84.5 73.5Q95 84 100.5 84H137V100H93.9Q88.4 100 84.5 96.1Z"
      />
      <path
        fill="#2CB7BC"
        d="M1.9 84H14.1A1.9 1.9 0 0 1 16 85.9V98.1A1.9 1.9 0 0 1 14.1 100H1.9A1.9 1.9 0 0 1 0 98.1V85.9A1.9 1.9 0 0 1 1.9 84Z"
      />
    </svg>
  );
}
