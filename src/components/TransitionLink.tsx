"use client";

import { usePageTransition } from "@/components/transitions/TransitionProvider";

interface TransitionLinkProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href: string;
}

/** Internal navigation that plays the page-transition overlay. Use instead of
 *  next/link for in-app routes. Renders a <button> so it works anywhere. */
export default function TransitionLink({
  href,
  children,
  onClick,
  ...props
}: TransitionLinkProps) {
  const { navigateTo } = usePageTransition();
  return (
    <button
      type="button"
      onClick={(e) => {
        onClick?.(e);
        navigateTo(href);
      }}
      {...props}
    >
      {children}
    </button>
  );
}
