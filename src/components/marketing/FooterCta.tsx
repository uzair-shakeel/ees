"use client";

import { FormEvent, useState } from "react";

const PHONE_DISPLAY = "+33 6 12 34 56 78";
const PHONE_E164 = "33612345678";
const CONTACT_EMAIL = "info@etudesenfrance.org";

function isInternationalPhone(value: string) {
  const trimmed = value.trim();
  if (!/^(?:\+|00)?\d[\d\s().-]{6,22}$/.test(trimmed)) return false;
  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

function IconArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.33 1.9.6 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.27 1.85.47 2.81.6A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden className="text-[#25D366]">
      <path
        fill="currentColor"
        d="M20.5 3.5A11 11 0 0 0 2.1 17.2L1 23l5.9-1.1A11 11 0 0 0 20.5 3.5Zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.5.7.7-3.4-.2-.3A9.1 9.1 0 1 1 12 20.5Zm5-6.8c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.2-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2 5 5 0 0 0 1 2.6 11.4 11.4 0 0 0 4.4 3.9 4.2 4.2 0 0 0 2.1.4 2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c-.1-.1-.3-.2-.6-.3Z"
      />
    </svg>
  );
}

const fieldClass =
  "h-11 w-full rounded-[12px] border border-white/10 bg-[#10283d] px-3.5 text-[14px] text-white outline-none placeholder:text-white/35 focus:border-white/35";

export function FooterCta({
  title = "Votre projet mérite plus qu'une liste d'universités.",
}: {
  title?: string;
}) {
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = event.currentTarget.elements.namedItem("phone");
    if (input instanceof HTMLInputElement && !isInternationalPhone(phone)) {
      const message = "Indiquez un numéro avec l'indicatif de votre pays, par exemple +33, +212 ou +1.";
      input.setCustomValidity(message);
      input.reportValidity();
      setPhoneError(message);
      return;
    }
    if (input instanceof HTMLInputElement) input.setCustomValidity("");
    setPhoneError("");
    const data = new FormData(event.currentTarget);
    const body = [
      `Prénom: ${data.get("firstName")}`,
      `Nom: ${data.get("lastName")}`,
      `Email: ${data.get("email")}`,
      `Téléphone: ${phone.trim()}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Demande de projet")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <div className="grid items-center gap-8 rounded-[22px] bg-[#173b5d] px-5 py-8 text-white sm:px-8 sm:py-10 md:gap-10 md:rounded-[28px] md:px-10 md:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,460px)] lg:px-14 lg:py-14">
      <div className="min-w-0">
        <h2 className="m-0 max-w-[12em] text-[clamp(1.7rem,4vw,40px)] font-medium leading-[1.15] tracking-[-0.03em]">
          {title}
        </h2>
        <p className="mt-4 m-0 text-[15px] leading-[1.6] text-white/75">
          Commençons par comprendre où vous voulez aller.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-white px-5 text-[13px] font-medium text-[#173b5d] transition hover:bg-[#eaf2f7]"
          >
            Parler à un conseiller <IconArrowRight />
          </a>
          <a
            href={`https://wa.me/${PHONE_E164}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-white/45 px-5 text-[13px] font-medium text-white transition hover:bg-white/10"
          >
            <IconWhatsApp />
            Chat on WhatsApp
          </a>
        </div>
        <ul className="mt-7 m-0 flex list-none flex-col gap-2.5 p-0 text-[14px] text-white/80">
          <li>
            <a href={`tel:+${PHONE_E164}`} className="inline-flex items-center gap-2.5 transition hover:text-white">
              <IconPhone />
              {PHONE_DISPLAY}
            </a>
          </li>
          <li>
            <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2.5 transition hover:text-white">
              <IconMail />
              {CONTACT_EMAIL}
            </a>
          </li>
        </ul>
      </div>

      <form
        onSubmit={onSubmit}
        className="rounded-[20px] border border-white/10 bg-[#1c4668] p-5 sm:p-6"
      >
        {sent ? (
          <p className="m-0 py-10 text-center text-[15px] leading-[1.6] text-white">
            Votre demande est prête. Envoyez le message qui s&apos;ouvre dans votre messagerie.
          </p>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-[13px] text-white">
                Prénom
                <input name="firstName" required autoComplete="given-name" placeholder="Votre prénom" className={`${fieldClass} mt-1.5`} />
              </label>
              <label className="block text-[13px] text-white">
                Nom de famille
                <input name="lastName" required autoComplete="family-name" placeholder="Votre nom" className={`${fieldClass} mt-1.5`} />
              </label>
              <label className="block text-[13px] text-white">
                Email
                <input name="email" type="email" required autoComplete="email" placeholder="votre@email.com" className={`${fieldClass} mt-1.5`} />
              </label>
              <label className="block text-[13px] text-white">
                Téléphone
                <input
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  value={phone}
                  placeholder="+33 6 12 34 56 78"
                  aria-invalid={phoneError ? true : undefined}
                  aria-describedby={phoneError ? "cta-phone-error" : undefined}
                  onChange={(event) => {
                    const next = event.target.value.replace(/[^\d+\s().-]/g, "").replace(/(?!^)\+/g, "");
                    setPhone(next);
                    event.target.setCustomValidity("");
                    if (phoneError) setPhoneError("");
                  }}
                  className={`${fieldClass} mt-1.5`}
                />
              </label>
            </div>
            {phoneError ? (
              <p id="cta-phone-error" className="mt-2 m-0 text-[12px] leading-snug text-[#ffd0d0]">
                {phoneError}
              </p>
            ) : null}
            <label className="mt-4 block text-[13px] text-white">
              Votre message
              <textarea
                name="message"
                required
                rows={3}
                placeholder="Parlez-nous de votre projet..."
                className={`${fieldClass} mt-1.5 h-auto resize-y py-3`}
              />
            </label>
            <label className="mt-4 flex items-start gap-2.5 text-[13px] leading-snug text-white/85">
              <input type="checkbox" name="privacy" required className="mt-0.5 size-4 shrink-0 accent-white" />
              <span>
                J&apos;accepte notre{" "}
                <a href={`mailto:${CONTACT_EMAIL}?subject=Politique%20de%20confidentialit%C3%A9`} className="underline underline-offset-2">
                  politique de confidentialité
                </a>
                .
              </span>
            </label>
            <button
              type="submit"
              className="mt-5 inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-white text-[13px] font-medium text-[#173b5d] transition hover:bg-[#eaf2f7]"
            >
              Envoyer la demande <IconArrowRight />
            </button>
          </>
        )}
      </form>
    </div>
  );
}
