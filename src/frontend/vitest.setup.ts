import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// jsdom does not implement the Pointer Capture API that Radix UI primitives
// (Select, Dialog, …) call on pointer events. Without these stubs, opening a
// Radix Select throws `target.hasPointerCapture is not a function`.
if (!Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = () => false;
}
if (!Element.prototype.setPointerCapture) {
  Element.prototype.setPointerCapture = () => {};
}
if (!Element.prototype.releasePointerCapture) {
  Element.prototype.releasePointerCapture = () => {};
}
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}
// TanStack Router's scroll restoration calls window.scrollTo, which jsdom
// does not implement and reports as an unhandled "Not implemented" error.
// jsdom defines it as a non-writable property, so it must be redefined.
Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: () => {},
});

afterEach(() => {
  cleanup();
});
