import type { Inquiry, InquiryInput } from "@/backend";
import * as quoteIntent from "@/lib/quoteIntent";
import { router } from "@/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const submitInquiry = vi.fn<(input: InquiryInput) => Promise<bigint>>();
const listInquiries = vi.fn<() => Promise<Inquiry[]>>();
const isCallerAdmin = vi.fn<() => Promise<boolean>>();

vi.mock("@/backend", () => ({
  createActor: vi.fn(),
}));

vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({
    actor: { submitInquiry, listInquiries, isCallerAdmin },
    isFetching: false,
  }),
  useInternetIdentity: () => ({
    isAuthenticated: false,
    isInitializing: false,
    login: vi.fn(),
    clear: vi.fn(),
    isLoggingIn: false,
  }),
}));

function renderApp() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  submitInquiry.mockReset().mockResolvedValue(0n);
  listInquiries.mockReset().mockResolvedValue([]);
  isCallerAdmin.mockReset().mockResolvedValue(false);
});

describe("service quote prefill", () => {
  it("applies a quote intent broadcast while the form is already mounted", async () => {
    await router.navigate({ to: "/" });
    renderApp();

    await screen.findByRole("combobox", { name: /service needed/i });
    quoteIntent.requestQuote("Roofing");

    await waitFor(() => {
      expect(
        screen.getByRole("combobox", { name: /service needed/i }),
      ).toHaveTextContent("Roofing");
    });
  });

  it("applies a quote intent queued before the form mounts", async () => {
    const user = userEvent.setup();
    await router.navigate({
      to: "/services/$slug",
      params: { slug: "plumbing" },
    });
    renderApp();

    await user.click(
      await screen.findByRole("button", { name: /get a free quote/i }),
    );

    const combobox = await screen.findByRole("combobox", {
      name: /service needed/i,
    });

    await waitFor(() => {
      expect(combobox).toHaveTextContent("Plumbing");
    });
  });
});
