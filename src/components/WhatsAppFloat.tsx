import { CONTACT_WHATSAPP_ICON, CONTACT_WHATSAPP_URL } from "@/lib/contact";

export function WhatsAppFloat() {
  return (
    <a
      href={CONTACT_WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter sur WhatsApp"
      className="fixed right-5 bottom-5 z-50 size-14 transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173b5d]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={CONTACT_WHATSAPP_ICON}
        alt=""
        width={56}
        height={56}
        className="size-full object-contain drop-shadow-[0_10px_24px_rgba(16,43,67,0.28)]"
        aria-hidden
      />
    </a>
  );
}
