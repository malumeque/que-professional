import {
  BUSINESS,
  mailtoLink,
  mapsDirectionsLink,
  mapsEmbedLink,
  telLink,
  whatsappLink,
} from "@/types";
import { describe, expect, it } from "vitest";

describe("contact link helpers", () => {
  it("dials the business phone number", () => {
    expect(telLink()).toBe("tel:+26879489466");
    expect(BUSINESS.phoneDisplay).toBe("+268 7948 9466");
  });

  it("opens a WhatsApp chat to the business number with a pre-filled message", () => {
    const link = whatsappLink();
    expect(link.startsWith("https://wa.me/26879489466?text=")).toBe(true);
    const message = decodeURIComponent(link.split("text=")[1]);
    expect(message).toContain("Que Professional Services");
    expect(message).toContain("quote");
  });

  it("encodes a custom WhatsApp message", () => {
    const link = whatsappLink("Hi there & welcome");
    expect(link).toContain(encodeURIComponent("Hi there & welcome"));
  });

  it("centers the map on Simunye, Eswatini", () => {
    expect(mapsEmbedLink()).toContain(encodeURIComponent("Simunye, Eswatini"));
    expect(mapsEmbedLink()).toContain("output=embed");
  });

  it("opens Google Maps directions to Simunye, Eswatini", () => {
    const link = mapsDirectionsLink();
    expect(link.startsWith("https://www.google.com/maps/dir/?api=1")).toBe(
      true,
    );
    expect(link).toContain(encodeURIComponent("Simunye, Eswatini"));
  });

  it("builds a mailto link to the business email", () => {
    expect(mailtoLink()).toContain(`mailto:${BUSINESS.email}`);
  });
});
