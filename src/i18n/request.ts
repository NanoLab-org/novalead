import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

// Resolve the active locale. We prefer the explicit `locale` (passed by
// getMessages({locale}) / getTranslations({locale}) from the [locale] layout),
// since `requestLocale` is only populated by middleware at request time and is
// unreliable during static prerendering on this Next version.
export default getRequestConfig(async ({ locale, requestLocale }) => {
  const requested = locale ?? (await requestLocale);
  const resolved = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale: resolved,
    messages: (await import(`../../messages/${resolved}.json`)).default,
  };
});
