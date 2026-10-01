import type { InquiryInput } from "@/backend";
import { QuoteForm } from "@/components/QuoteForm";
import { consumeQuoteIntent, requestQuote } from "@/lib/quoteIntent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type * as React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const submitInquiry = vi.fn<(input: InquiryInput) => Promise<bigint>>();

// The app's own actor seam: `useActor` resolves the actor through
// `createActorWithConfig`, so mocking the module the hook imports keeps the
// component under test real while the backend stays local and typed.
vi.mock("@/backend", () => ({
  createActor: vi.fn(),
}));

vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({ actor: { submitInquiry }, isFetching: false }),
}));

function renderForm(props: { preselectedService?: string } = {}) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return render(<QuoteForm {...props} />, { wrapper });
}

beforeEach(() => {
  submitInquiry.mockReset();
  submitInquiry.mockResolvedValue(0n);
});

describe("QuoteForm", () => {
  it("validates that name, phone and service are present", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByRole("button", { name: /send my request/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /add your name, a contact number and the service/i,
    );
    expect(submitInquiry).not.toHaveBeenCalled();
  });

  it("submits the captured fields and shows a confirmation", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/full name/i), "Thandi Dlamini");
    await user.type(screen.getByLabelText(/phone number/i), "+268 7948 9466");
    await user.type(screen.getByLabelText(/email/i), "thandi@example.com");
    await user.type(
      screen.getByLabelText(/job details/i),
      "Leaking roof over the kitchen.",
    );

    // Radix Select is a listbox, not a native <select>.
    await user.click(screen.getByRole("combobox", { name: /service needed/i }));
    await user.click(await screen.findByRole("option", { name: "Roofing" }));

    await user.click(screen.getByRole("button", { name: /send my request/i }));

    await waitFor(() => {
      expect(submitInquiry).toHaveBeenCalledTimes(1);
    });
    expect(submitInquiry).toHaveBeenCalledWith({
      name: "Thandi Dlamini",
      phone: "+268 7948 9466",
      email: "thandi@example.com",
      service: "Roofing",
      message: "Leaking roof over the kitchen.",
    });

    expect(await screen.findByText(/your request is in/i)).toBeInTheDocument();
  });

  it("DIAG applies an intent queued before the form mounts", async () => {
    const user = userEvent.setup();
    requestQuote("Plumbing");
    // eslint-disable-next-line no-console
    console.log("DIAG pending after request:", consumeQuoteIntent());
    requestQuote("Plumbing");
    renderForm();

    await user.type(screen.getByLabelText(/full name/i), "Sipho Mamba");
    await user.type(screen.getByLabelText(/phone number/i), "+268 7600 0000");
    await user.click(screen.getByRole("button", { name: /send my request/i }));

    await waitFor(() => {
      expect(submitInquiry).toHaveBeenCalledWith(
        expect.objectContaining({ service: "Plumbing" }),
      );
    });
  });

  it("pre-selects a service requested by a CTA elsewhere in the app", async () => {
    const user = userEvent.setup();
    renderForm();

    requestQuote("Plumbing");

    await waitFor(() => {
      expect(
        screen.getByRole("combobox", { name: /service needed/i }),
      ).toHaveTextContent("Plumbing");
    });

    await user.type(screen.getByLabelText(/full name/i), "Sipho Mamba");
    await user.type(screen.getByLabelText(/phone number/i), "+268 7600 0000");
    await user.click(screen.getByRole("button", { name: /send my request/i }));

    await waitFor(() => {
      expect(submitInquiry).toHaveBeenCalledWith(
        expect.objectContaining({ service: "Plumbing" }),
      );
    });
  });

  it("surfaces a recoverable error when the backend rejects", async () => {
    submitInquiry.mockRejectedValueOnce(new Error("network down"));
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/full name/i), "Thandi Dlamini");
    await user.type(screen.getByLabelText(/phone number/i), "+268 7948 9466");
    await user.click(screen.getByRole("combobox", { name: /service needed/i }));
    await user.click(await screen.findByRole("option", { name: "Roofing" }));
    await user.click(screen.getByRole("button", { name: /send my request/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /couldn't send your request/i,
    );
  });
});
