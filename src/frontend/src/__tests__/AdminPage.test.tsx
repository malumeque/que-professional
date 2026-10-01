import type { Inquiry, InquiryInput } from "@/backend";
import { router } from "@/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const submitInquiry = vi.fn<(input: InquiryInput) => Promise<bigint>>();
const listInquiries = vi.fn<() => Promise<Inquiry[]>>();
const isCallerAdmin = vi.fn<() => Promise<boolean>>();

let authenticated = false;

vi.mock("@/backend", () => ({
  createActor: vi.fn(),
}));

vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({
    actor: { submitInquiry, listInquiries, isCallerAdmin },
    isFetching: false,
  }),
  useInternetIdentity: () => ({
    isAuthenticated: authenticated,
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

const INQUIRY: Inquiry = {
  id: 0n,
  name: "Thandi Dlamini",
  phone: "+268 7948 9466",
  email: "thandi@example.com",
  service: "Roofing",
  message: "Leaking roof over the kitchen.",
  createdAt: 1_700_000_000_000_000_000n,
};

beforeEach(async () => {
  authenticated = false;
  submitInquiry.mockReset().mockResolvedValue(0n);
  listInquiries.mockReset().mockResolvedValue([]);
  isCallerAdmin.mockReset().mockResolvedValue(false);
  await router.navigate({ to: "/admin" });
});

describe("admin page", () => {
  it("gates the area behind sign-in for anonymous visitors", async () => {
    renderApp();

    expect(
      await screen.findByRole("heading", { name: /sign in required/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i }),
    ).toBeInTheDocument();
    expect(listInquiries).not.toHaveBeenCalled();
  });

  it("denies access to a signed-in non-admin", async () => {
    authenticated = true;
    isCallerAdmin.mockResolvedValue(false);
    renderApp();

    expect(
      await screen.findByRole("heading", { name: /access denied/i }),
    ).toBeInTheDocument();
    expect(listInquiries).not.toHaveBeenCalled();
  });

  it("lists submitted inquiries with contact details for an admin", async () => {
    authenticated = true;
    isCallerAdmin.mockResolvedValue(true);
    listInquiries.mockResolvedValue([INQUIRY]);
    renderApp();

    expect(await screen.findByText("Thandi Dlamini")).toBeInTheDocument();
    expect(screen.getByText("Roofing")).toBeInTheDocument();
    expect(screen.getByText("+268 7948 9466")).toBeInTheDocument();
    expect(screen.getByText("thandi@example.com")).toBeInTheDocument();
    expect(
      screen.getByText(/leaking roof over the kitchen/i),
    ).toBeInTheDocument();
  });

  it("shows an empty state when no inquiries exist", async () => {
    authenticated = true;
    isCallerAdmin.mockResolvedValue(true);
    listInquiries.mockResolvedValue([]);
    renderApp();

    expect(
      await screen.findByRole("heading", { name: /no quote requests yet/i }),
    ).toBeInTheDocument();
  });
});
