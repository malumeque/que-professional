import type { Inquiry, InquiryInput } from "@/backend";
import { router } from "@/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

describe("service detail page", () => {
  it("shows the description, what's included and a quote CTA", async () => {
    await router.navigate({
      to: "/services/$slug",
      params: { slug: "roofing" },
    });
    renderApp();

    expect(
      await screen.findByRole("heading", { level: 1, name: "Roofing" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/new roofs, repairs & waterproofing/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /scope of work/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/leak detection and repair/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /get a free quote/i }),
    ).toBeInTheDocument();
  });

  it("pre-fills the inquiry with the service when its quote CTA is used", async () => {
    const user = userEvent.setup();
    await router.navigate({
      to: "/services/$slug",
      params: { slug: "plumbing" },
    });
    renderApp();

    fireEvent.click(
      await screen.findByRole("button", { name: /get a free quote/i }),
    );

    // The CTA navigates home and mounts the quote form. Radix's SelectValue
    // only renders the selected item's text once its content has been opened,
    // so the pre-filled service is asserted through the submitted payload.
    await screen.findByRole("combobox", { name: /service needed/i });

    // DIAGNOSTIC
    const trigger = document.querySelector(
      '[data-ocid="quote.service_select"]',
    );
    // eslint-disable-next-line no-console
    console.log(
      "DIAG placeholder attr:",
      trigger?.getAttribute("data-placeholder"),
    );

    await user.type(screen.getByLabelText(/full name/i), "Sipho Mamba");
    await user.type(screen.getByLabelText(/phone number/i), "+268 7600 0000");

    // DIAGNOSTIC
    // eslint-disable-next-line no-console
    console.log(
      "DIAG name:",
      (
        document.querySelector(
          '[data-ocid="quote.name_input"]',
        ) as HTMLInputElement
      )?.value,
      "phone:",
      (
        document.querySelector(
          '[data-ocid="quote.phone_input"]',
        ) as HTMLInputElement
      )?.value,
    );

    await user.click(screen.getByRole("button", { name: /send my request/i }));

    // DIAGNOSTIC
    // eslint-disable-next-line no-console
    console.log(
      "DIAG after submit calls:",
      submitInquiry.mock.calls.length,
      "alert:",
      document.querySelector('[data-ocid="quote.error_state"]')?.textContent,
    );

    await waitFor(() => {
      expect(submitInquiry).toHaveBeenCalledWith(
        expect.objectContaining({ service: "Plumbing" }),
      );
    });
  });

  it("shows a not-found state for an unknown service", async () => {
    await router.navigate({
      to: "/services/$slug",
      params: { slug: "not-a-service" },
    });
    renderApp();

    expect(
      await screen.findByRole("heading", { name: /service not found/i }),
    ).toBeInTheDocument();
  });
});
