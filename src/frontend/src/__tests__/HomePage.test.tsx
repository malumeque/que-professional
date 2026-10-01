import type { Inquiry, InquiryInput } from "@/backend";
import { router } from "@/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { render, screen, waitFor, within } from "@testing-library/react";
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

beforeEach(async () => {
  submitInquiry.mockReset().mockResolvedValue(0n);
  listInquiries.mockReset().mockResolvedValue([]);
  isCallerAdmin.mockReset().mockResolvedValue(false);
  // Each test starts at the home route.
  await router.navigate({ to: "/" });
});

describe("home page", () => {
  it("renders the hero, services, gallery, quote, areas and contact sections", async () => {
    renderApp();

    expect(
      await screen.findByRole("heading", { level: 1, name: /built right/i }),
    ).toBeInTheDocument();

    // All five services are offered.
    for (const name of [
      "Concrete Works",
      "Roofing",
      "Remodeling",
      "Pest Control",
      "Plumbing",
    ]) {
      expect(
        screen.getByRole("heading", { level: 3, name }),
      ).toBeInTheDocument();
    }

    expect(
      screen.getByRole("heading", { name: /jobs we've finished/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /get a straight price/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /based in simunye/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /ready when you are/i }),
    ).toBeInTheDocument();
  });

  it("exposes click-to-call and WhatsApp actions with the business number", async () => {
    renderApp();

    const callLinks = await screen.findAllByRole("link", { name: /call/i });
    expect(callLinks.length).toBeGreaterThan(0);
    for (const link of callLinks) {
      expect(link).toHaveAttribute("href", "tel:+26879489466");
    }

    const whatsappLinks = screen.getAllByRole("link", { name: /whatsapp/i });
    expect(whatsappLinks.length).toBeGreaterThan(0);
    for (const link of whatsappLinks) {
      expect(link.getAttribute("href")).toContain("https://wa.me/26879489466");
    }
  });

  it("embeds the Simunye map and links to directions", async () => {
    renderApp();

    const map = await screen.findByTitle(/map of simunye/i);
    expect(map).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent("Simunye, Eswatini")),
    );

    const directions = screen.getByRole("link", { name: /get directions/i });
    expect(directions).toHaveAttribute(
      "href",
      expect.stringContaining("google.com/maps/dir"),
    );
  });

  it("filters the gallery by service type", async () => {
    const user = userEvent.setup();
    renderApp();

    const gallery = await screen.findByRole("group", {
      name: /filter gallery by service/i,
    });
    // "All work" shows every item.
    expect(
      within(gallery).getByRole("button", { name: "All work" }),
    ).toHaveAttribute("aria-pressed", "true");

    await user.click(within(gallery).getByRole("button", { name: "Roofing" }));

    expect(
      within(gallery).getByRole("button", { name: "Roofing" }),
    ).toHaveAttribute("aria-pressed", "true");
    // Only roofing captions remain visible.
    expect(screen.getByText(/full ibr roof replacement/i)).toBeInTheDocument();
    expect(screen.queryByText(/reinforced driveway/i)).not.toBeInTheDocument();
  });

  it("submits a quote request from the home page and confirms", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.type(
      await screen.findByLabelText(/full name/i),
      "Thandi Dlamini",
    );
    await user.type(screen.getByLabelText(/phone number/i), "+268 7948 9466");
    await user.click(screen.getByRole("combobox", { name: /service needed/i }));
    await user.click(
      await screen.findByRole("option", { name: "Concrete Works" }),
    );
    await user.click(screen.getByRole("button", { name: /send my request/i }));

    await waitFor(() => {
      expect(submitInquiry).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Thandi Dlamini",
          phone: "+268 7948 9466",
          service: "Concrete Works",
        }),
      );
    });
    expect(await screen.findByText(/your request is in/i)).toBeInTheDocument();
  });
});
