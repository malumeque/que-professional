import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitInquiry } from "@/hooks/useQueries";
import { consumeQuoteIntent, subscribeToQuoteIntent } from "@/lib/quoteIntent";
import { SERVICE_OPTIONS } from "@/types";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useEffect, useId, useState } from "react";

interface Draft {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

const EMPTY_DRAFT: Draft = {
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
};

export function QuoteForm({
  preselectedService,
}: {
  preselectedService?: string;
} = {}) {
  const formId = useId();
  const [draft, setDraft] = useState<Draft>(() => ({
    ...EMPTY_DRAFT,
    service: preselectedService ?? "",
  }));
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const mutation = useSubmitInquiry();

  // Apply a service requested by a CTA elsewhere in the app, whether the
  // intent was queued before mount or broadcast while the form is visible.
  useEffect(() => {
    const applyIntent = (service: string | null) => {
      if (!service) return;
      setDraft((current) => ({ ...current, service }));
      setSubmitted(false);
    };

    applyIntent(consumeQuoteIntent());
    return subscribeToQuoteIntent(applyIntent);
  }, []);

  const update = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!draft.name.trim() || !draft.phone.trim() || !draft.service) {
      setError(
        "Please add your name, a contact number and the service you need.",
      );
      return;
    }

    const captured = { ...draft };
    setDraft(EMPTY_DRAFT);
    setSubmitted(false);

    mutation.mutate(
      {
        name: captured.name.trim(),
        phone: captured.phone.trim(),
        email: captured.email.trim(),
        service: captured.service,
        message: captured.message.trim(),
      },
      {
        onSuccess: () => setSubmitted(true),
        onError: () => {
          setError(
            "We couldn't send your request just now. Please call or WhatsApp us instead.",
          );
          setDraft((current) => (current.name === "" ? captured : current));
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-ocid="quote.form"
      className="rounded-sm border border-border bg-card p-6 shadow-hard-dark sm:p-8"
    >
      <h3 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
        Request a free quote
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Tell us what needs doing. We'll come out, take a look and give you a
        straight price — no obligation.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label
            htmlFor={`${formId}-name`}
            className="label-mono text-muted-foreground"
          >
            Full name
          </Label>
          <Input
            id={`${formId}-name`}
            data-ocid="quote.name_input"
            value={draft.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="e.g. Thandi Dlamini"
            autoComplete="name"
            className="h-11 rounded-sm"
          />
        </div>

        <div className="grid gap-2">
          <Label
            htmlFor={`${formId}-phone`}
            className="label-mono text-muted-foreground"
          >
            Phone number
          </Label>
          <Input
            id={`${formId}-phone`}
            data-ocid="quote.phone_input"
            value={draft.phone}
            onChange={(event) => update("phone", event.target.value)}
            placeholder="+268 …"
            inputMode="tel"
            autoComplete="tel"
            className="h-11 rounded-sm font-mono"
          />
        </div>

        <div className="grid gap-2">
          <Label
            htmlFor={`${formId}-email`}
            className="label-mono text-muted-foreground"
          >
            Email{" "}
            <span className="normal-case tracking-normal">(optional)</span>
          </Label>
          <Input
            id={`${formId}-email`}
            data-ocid="quote.email_input"
            type="email"
            value={draft.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className="h-11 rounded-sm"
          />
        </div>

        <div className="grid gap-2">
          <Label
            htmlFor={`${formId}-service`}
            className="label-mono text-muted-foreground"
          >
            Service needed
          </Label>
          <Select
            value={draft.service}
            onValueChange={(value) => update("service", value)}
          >
            <SelectTrigger
              id={`${formId}-service`}
              data-ocid="quote.service_select"
              className="h-11 w-full rounded-sm"
            >
              <SelectValue placeholder="Choose a service" />
            </SelectTrigger>
            <SelectContent>
              {SERVICE_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2 sm:col-span-2">
          <Label
            htmlFor={`${formId}-message`}
            className="label-mono text-muted-foreground"
          >
            Job details{" "}
            <span className="normal-case tracking-normal">(optional)</span>
          </Label>
          <Textarea
            id={`${formId}-message`}
            data-ocid="quote.message_textarea"
            value={draft.message}
            onChange={(event) => update("message", event.target.value)}
            placeholder="Where is the site, and what needs doing?"
            rows={4}
            className="rounded-sm"
          />
        </div>
      </div>

      {error ? (
        <p
          role="alert"
          data-ocid="quote.error_state"
          className="mt-5 rounded-sm border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive-foreground"
        >
          {error}
        </p>
      ) : null}

      {submitted ? (
        <p
          data-ocid="quote.success_state"
          className="mt-5 flex items-start gap-3 rounded-sm border border-primary/50 bg-primary/10 px-4 py-3 text-sm text-foreground"
        >
          <CheckCircle2
            className="mt-0.5 size-4 shrink-0 text-primary"
            aria-hidden="true"
          />
          <span>
            Thanks — your request is in. We'll be in touch shortly. For anything
            urgent, call or WhatsApp us directly.
          </span>
        </p>
      ) : null}

      <Button
        type="submit"
        data-ocid="quote.submit_button"
        disabled={mutation.isPending}
        className="mt-6 h-12 w-full rounded-sm bg-primary font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-smooth hover:-translate-y-0.5 hover:shadow-hard-sm sm:w-auto sm:px-8"
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send className="size-4" aria-hidden="true" />
            Send my request
          </>
        )}
      </Button>
    </form>
  );
}
