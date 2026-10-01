import { BUSINESS, telLink, whatsappLink } from "@/types";
import { MessageCircle, Phone } from "lucide-react";

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur sm:hidden">
      <div className="grid grid-cols-2 gap-px bg-border">
        <a
          href={telLink()}
          data-ocid="mobile_bar.call_button"
          className="flex h-14 items-center justify-center gap-2 bg-primary font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground"
        >
          <Phone className="size-4" aria-hidden="true" />
          Call now
        </a>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="mobile_bar.whatsapp_button"
          className="flex h-14 items-center justify-center gap-2 bg-accent font-display text-sm font-semibold uppercase tracking-wider text-accent-foreground"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          WhatsApp
        </a>
      </div>
      <span className="sr-only">{BUSINESS.phoneDisplay}</span>
    </div>
  );
}
