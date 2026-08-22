"use client";

import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { cn } from "@/lib/utils";

// Button style variants — novalead brand (dark navy + orange)
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base disabled:pointer-events-none disabled:opacity-50 tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary-dark",
        secondary:
          "bg-white/5 text-mint border border-primary/40 backdrop-blur-sm hover:bg-primary/10 hover:text-white",
        outline:
          "border border-white/20 bg-transparent text-white hover:bg-white/10",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-md px-4 text-sm",
        lg: "h-12 rounded-md px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// ProgressiveHero: animated video hero for the NovaLead landing page
function ProgressiveHero() {
  const t = useTranslations("Home");
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => t.raw("heroTitles") as string[], [t]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <section data-dark-hero className="relative w-full min-h-dvh overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="https://videos.pexels.com/video-files/18526841/uhd_30fps.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Recolor the footage toward the brand green — keeps the buildings visible */}
      <div className="absolute inset-0 bg-primary/70 mix-blend-color" />
      {/* Light scrim only at top/bottom for text legibility; middle stays clear */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-[#04211e]" />

      <div className="relative z-10 flex min-h-dvh w-full flex-col items-center justify-center px-6">
        <div className="flex w-full flex-col items-center justify-center gap-8 py-28">
          {/* Eyebrow */}
          <div>
            <Button variant="secondary" size="sm" className="gap-3">
              {t("heroEyebrow")} <MoveRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Animated headline + description */}
          <div className="flex flex-col gap-4">
            <h1 className="max-w-2xl text-center text-5xl font-extrabold tracking-tight text-white md:text-7xl">
              <span>{t("heroTitlePrefix")}</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-extrabold text-mint drop-shadow-[0_2px_16px_rgba(13,148,136,0.55)]"
                    initial={{ opacity: 0, y: -100 }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="max-w-2xl text-center text-lg leading-relaxed tracking-tight text-white/85 md:text-xl">
              {t("heroDescription")}
            </p>
          </div>

          {/* Calls to action */}
          <div className="flex flex-row flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="gap-3">
              <Link href="/catalogue">
                {t("ctaCatalogue")} <MoveRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-3">
  <Link href="/contact">
    {t("ctaContact")} <PhoneCall className="h-4 w-4" />
  </Link>
</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export { ProgressiveHero };
