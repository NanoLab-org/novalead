import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // French is the default (site's primary language); Arabic is RTL.
  locales: ["fr", "en", "ar"],
  defaultLocale: "fr",
});

export type Locale = (typeof routing.locales)[number];
