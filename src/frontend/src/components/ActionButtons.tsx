import { Button } from "@/components/ui/button";
import { requestQuote } from "@/lib/quoteIntent";
import { cn } from "@/lib/utils";
import { BUSINESS, telLink, whatsappLink } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";
import type * as React from "react";

interface ActionButtonProps {
  className?: string;
  children?: React.ReactNode;
  "data-ocid"?: string;
}

const baseAction =
  "h-11 rounded-sm px-5 font-display text-sm font-semibold uppercase tracking-wider transition-smooth";

export function CallButton({
  className,
  children,
  ...rest
}: ActionButtonProps) {
  return (
    <Button
      asChild
      className={cn(
        baseAction,
        "bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-hard-sm",
        className,
      )}
      {...rest}
    >
      <a
        href={telLink()}
        aria-label={`Call ${BUSINESS.name} on ${BUSINESS.phoneDisplay}`}
      >
        <Phone aria-hidden="true" />
        {children ?? "Call now"}
      </a>
    </Button>
  );
}

export function WhatsAppButton({
  className,
  children,
  message,
  ...rest
}: ActionButtonProps & { message?: string }) {
  return (
    <Button
      asChild
      className={cn(
        baseAction,
        "bg-accent text-accent-foreground hover:bg-accent/90 hover:-translate-y-0.5",
        className,
      )}
      {...rest}
    >
      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${BUSINESS.name} on WhatsApp`}
      >
        <MessageCircle aria-hidden="true" />
        {children ?? "WhatsApp us"}
      </a>
    </Button>
  );
}

export function QuoteButton({
  className,
  children,
  service,
  ...rest
}: ActionButtonProps & { service?: string }) {
  const navigate = useNavigate();

  const handleClick = () => {
    requestQuote(service);
    void navigate({ to: "/", hash: "quote" });
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      className={cn(
        baseAction,
        "border border-primary/60 bg-transparent text-primary hover:bg-primary/10 hover:-translate-y-0.5",
        className,
      )}
      {...rest}
    >
      {children ?? "Get a free quote"}
    </Button>
  );
}

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("label-mono text-primary", className)}>
      <span
        aria-hidden="true"
        className="mr-2 inline-block h-px w-6 align-middle bg-primary"
      />
      {children}
    </p>
  );
}
