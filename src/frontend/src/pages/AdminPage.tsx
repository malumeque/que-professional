import { SectionLabel } from "@/components/ActionButtons";
import { Button } from "@/components/ui/button";
import { useInquiries, useIsAdmin } from "@/hooks/useQueries";
import { formatTimestamp } from "@/lib/format";
import { BUSINESS, telLink } from "@/types";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Inbox, Loader2, LogOut, Mail, Phone, ShieldAlert } from "lucide-react";

export function AdminPage() {
  const { isAuthenticated, isInitializing, login, clear, isLoggingIn } =
    useInternetIdentity();
  const adminQuery = useIsAdmin();
  const inquiriesQuery = useInquiries();

  const isAdmin = adminQuery.data === true;

  return (
    <section
      data-ocid="admin.page"
      className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionLabel>Staff area</SectionLabel>
          <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">
            Quote requests
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Every quote request submitted through the website, newest first.
          </p>
        </div>

        {isAuthenticated ? (
          <Button
            type="button"
            variant="outline"
            data-ocid="admin.logout_button"
            onClick={clear}
            className="h-10 rounded-sm border-border font-display text-xs font-semibold uppercase tracking-wider"
          >
            <LogOut className="size-4" aria-hidden="true" />
            Sign out
          </Button>
        ) : null}
      </div>

      {isInitializing ? (
        <div
          data-ocid="admin.loading_state"
          className="mt-10 flex items-center gap-3 rounded-sm border border-border bg-card px-5 py-6 text-sm text-muted-foreground"
        >
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          Checking your session…
        </div>
      ) : !isAuthenticated ? (
        <div
          data-ocid="admin.login_panel"
          className="mt-10 rounded-sm border border-border bg-card p-8 shadow-hard-dark"
        >
          <span className="grid size-12 place-items-center rounded-sm border border-primary/40 bg-primary/10 text-primary">
            <ShieldAlert className="size-6" aria-hidden="true" />
          </span>
          <h2 className="mt-5 font-display text-xl font-bold uppercase tracking-wide text-foreground">
            Sign in required
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            This area is restricted to Que Professional Services staff. Sign in
            with your Internet Identity to view submitted quote requests.
          </p>
          <Button
            type="button"
            data-ocid="admin.login_button"
            onClick={() => login()}
            disabled={isLoggingIn}
            className="mt-6 h-11 rounded-sm bg-primary px-6 font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-smooth hover:-translate-y-0.5 hover:shadow-hard-sm"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </div>
      ) : adminQuery.isLoading ? (
        <div
          data-ocid="admin.loading_state"
          className="mt-10 flex items-center gap-3 rounded-sm border border-border bg-card px-5 py-6 text-sm text-muted-foreground"
        >
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          Loading quote requests…
        </div>
      ) : !isAdmin ? (
        <div
          data-ocid="admin.denied_state"
          className="mt-10 rounded-sm border border-destructive/50 bg-destructive/10 p-8"
        >
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
            Access denied
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Your account doesn't have staff access. Contact the business owner
            on{" "}
            <a
              href={telLink()}
              className="font-mono text-primary underline-offset-4 hover:underline"
            >
              {BUSINESS.phoneDisplay}
            </a>{" "}
            to be granted access.
          </p>
        </div>
      ) : inquiriesQuery.isError ? (
        <div
          data-ocid="admin.error_state"
          className="mt-10 rounded-sm border border-destructive/50 bg-destructive/10 px-5 py-6 text-sm text-foreground"
        >
          We couldn't load the quote requests. Please refresh the page to try
          again.
        </div>
      ) : inquiriesQuery.isLoading ? (
        <div
          data-ocid="admin.loading_state"
          className="mt-10 flex items-center gap-3 rounded-sm border border-border bg-card px-5 py-6 text-sm text-muted-foreground"
        >
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          Loading quote requests…
        </div>
      ) : (inquiriesQuery.data ?? []).length === 0 ? (
        <div
          data-ocid="admin.empty_state"
          className="mt-10 rounded-sm border border-border bg-card px-6 py-14 text-center"
        >
          <span className="mx-auto grid size-12 place-items-center rounded-sm border border-primary/40 bg-primary/10 text-primary">
            <Inbox className="size-6" aria-hidden="true" />
          </span>
          <h2 className="mt-5 font-display text-lg font-bold uppercase tracking-wide text-foreground">
            No quote requests yet
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
            Requests submitted through the website will appear here as soon as
            they arrive.
          </p>
        </div>
      ) : (
        <ul
          data-ocid="admin.list"
          className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {(inquiriesQuery.data ?? []).map((inquiry, index) => (
            <li
              key={inquiry.id.toString()}
              data-ocid={`admin.item.${index + 1}`}
              className="flex flex-col rounded-sm border border-border bg-card p-5 transition-smooth hover:border-primary/60"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="truncate font-display text-base font-bold uppercase tracking-wide text-foreground">
                    {inquiry.name}
                  </h2>
                  <p className="label-mono mt-1 text-primary">
                    {inquiry.service}
                  </p>
                </div>
                <span className="shrink-0 rounded-sm border border-border bg-background/60 px-2 py-1 font-mono text-[0.65rem] text-muted-foreground">
                  #{inquiry.id.toString()}
                </span>
              </div>

              <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                <div className="flex items-center gap-2">
                  <dt className="sr-only">Phone</dt>
                  <Phone
                    className="size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <dd>
                    <a
                      href={`tel:${inquiry.phone.replace(/\s+/g, "")}`}
                      className="font-mono text-foreground transition-colors hover:text-primary"
                    >
                      {inquiry.phone}
                    </a>
                  </dd>
                </div>
                {inquiry.email ? (
                  <div className="flex min-w-0 items-center gap-2">
                    <dt className="sr-only">Email</dt>
                    <Mail
                      className="size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <dd className="min-w-0">
                      <a
                        href={`mailto:${inquiry.email}`}
                        className="block truncate text-foreground transition-colors hover:text-primary"
                      >
                        {inquiry.email}
                      </a>
                    </dd>
                  </div>
                ) : null}
              </dl>

              {inquiry.message ? (
                <p className="mt-4 flex-1 rounded-sm border border-border bg-muted/40 px-3 py-3 text-sm leading-relaxed text-muted-foreground">
                  {inquiry.message}
                </p>
              ) : (
                <p className="mt-4 flex-1 text-sm italic text-muted-foreground">
                  No extra details provided.
                </p>
              )}

              <p className="mt-4 border-t border-border pt-3 font-mono text-xs text-muted-foreground">
                {formatTimestamp(inquiry.createdAt)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
