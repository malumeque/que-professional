/**
 * Lightweight cross-route quote intent.
 *
 * A CTA anywhere in the app can request that the quote form open with a
 * particular service preselected. The intent is stored in memory and broadcast
 * via a window event so the form can react whether it is already mounted or
 * mounts after navigation.
 */

const QUOTE_INTENT_EVENT = "que:quote-intent";

let pendingService: string | null = null;

export function requestQuote(service?: string): void {
  pendingService = service?.trim() ? service.trim() : null;
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent<string | null>(QUOTE_INTENT_EVENT, {
        detail: pendingService,
      }),
    );
  }
}

export function consumeQuoteIntent(): string | null {
  const service = pendingService;
  pendingService = null;
  return service;
}

export function subscribeToQuoteIntent(
  listener: (service: string | null) => void,
): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = (event: Event) => {
    listener((event as CustomEvent<string | null>).detail ?? null);
  };
  window.addEventListener(QUOTE_INTENT_EVENT, handler);
  return () => window.removeEventListener(QUOTE_INTENT_EVENT, handler);
}
