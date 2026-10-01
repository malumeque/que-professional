import {
  consumeQuoteIntent,
  requestQuote,
  subscribeToQuoteIntent,
} from "@/lib/quoteIntent";
import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  // Drain any intent left behind so tests stay independent.
  consumeQuoteIntent();
});

describe("quote intent", () => {
  it("queues a service for the next consumer", () => {
    requestQuote("Roofing");
    expect(consumeQuoteIntent()).toBe("Roofing");
  });

  it("consumes the intent only once", () => {
    requestQuote("Plumbing");
    expect(consumeQuoteIntent()).toBe("Plumbing");
    expect(consumeQuoteIntent()).toBeNull();
  });

  it("trims the requested service and ignores blank values", () => {
    requestQuote("  Concrete Works  ");
    expect(consumeQuoteIntent()).toBe("Concrete Works");

    requestQuote("   ");
    expect(consumeQuoteIntent()).toBeNull();
  });

  it("broadcasts the intent to subscribers", () => {
    const listener = vi.fn();
    const unsubscribe = subscribeToQuoteIntent(listener);

    requestQuote("Pest Control");
    expect(listener).toHaveBeenCalledWith("Pest Control");

    unsubscribe();
    requestQuote("Remodeling");
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
