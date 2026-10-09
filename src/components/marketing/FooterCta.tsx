"use client";

import { getCountries, getCountryCallingCode, type CountryCode } from "libphonenumber-js/min";
import * as FlagIcons from "country-flag-icons/react/3x2";
import { ComponentType, FormEvent, SVGProps, useEffect, useRef, useState } from "react";
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_TEL_URL,
  CONTACT_WHATSAPP_URL,
} from "@/lib/contact";

const CONTACT_EMAIL = "info@etudesenfrance.org";
const WAVE_BG = "/assets/abstract-navy-wave-cover.png";

const FLAGS = FlagIcons as unknown as Record<string, ComponentType<SVGProps<SVGSVGElement>>>;

const regionNames = new Intl.DisplayNames(["fr"], { type: "region" });

function fold(value: string) {
  return value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

const COUNTRIES = getCountries()
  .map((id) => ({
    id,
    name: regionNames.of(id) ?? id,
    dial: `+${getCountryCallingCode(id)}`,
  }))
  .sort((a, b) => {
    if (a.id === "FR") return -1;
    if (b.id === "FR") return 1;
    return a.name.localeCompare(b.name, "fr");
  });

function Flag({ code }: { code: string }) {
  const Icon = FLAGS[code];
  if (!Icon) {
    return (
      <span className="inline-flex h-3.5 min-w-5 items-center justify-center rounded-[2px] bg-white px-1 text-[9px] font-semibold text-[#173b5d] ring-1 ring-black/10" aria-hidden>
        {code}
      </span>
    );
  }
  return (
    <Icon
      title=""
      aria-hidden
      className="h-3.5 w-5 shrink-0 overflow-hidden rounded-[2px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)]"
    />
  );
}

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
  const [countryId, setCountryId] = useState<CountryCode>("FR");
  const [countryOpen, setCountryOpen] = useState(false);
  const [countryQuery, setCountryQuery] = useState("");
  const countryRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const query = fold(countryQuery.trim());
  const visibleCountries = query
    ? COUNTRIES.filter((country) => fold(country.name).includes(query) || country.dial.includes(query) || country.id.toLowerCase().includes(query))
    : COUNTRIES;
  const dial = COUNTRIES.find((country) => country.id === countryId)?.dial ?? "+33";
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!countryOpen) return;
    searchRef.current?.focus();
    function onPointerDown(event: PointerEvent) {
      if (!countryRef.current?.contains(event.target as Node)) setCountryOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setCountryOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      setCountryQuery("");
    };
  }, [countryOpen]);

  const fullPhone = phone.trim().startsWith("+") ? phone.trim() : `${dial} ${phone.trim()}`.trim();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = event.currentTarget.elements.namedItem("phone");
    if (input instanceof HTMLInputElement && !isInternationalPhone(fullPhone)) {
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
      `Téléphone: ${fullPhone}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Demande de projet")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <div className="relative isolate rounded-[28px] bg-[#0d3f73] text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={WAVE_BG}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </div>
      <div className="relative grid items-center gap-8 px-5 py-8 sm:px-8 sm:py-10 md:gap-10 md:px-10 md:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,440px)] lg:px-12 lg:py-12">
      <div className="min-w-0">
        <h2 className="m-0 max-w-[12em] text-[clamp(1.7rem,4vw,40px)] font-medium leading-[1.15] tracking-[-0.03em]">
          {title}
        </h2>
        <p className="mt-4 m-0 max-w-[28rem] text-[15px] leading-[1.6] text-white/80">
          Commencez par une conversation où vous voulez aller.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href="/login"
            className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-white px-5 text-[13px] font-medium text-[#173b5d] transition hover:bg-[#eaf2f7]"
          >
            Parler à un conseiller <IconArrowRight />
          </a>
          <a
            href={CONTACT_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-white/70 bg-transparent px-5 text-[13px] font-medium text-white transition hover:bg-white/10"
          >
            <IconWhatsApp />
            Chat sur WhatsApp
          </a>
        </div>
        <ul className="mt-7 m-0 flex list-none flex-col gap-2.5 p-0 text-[14px] text-white/80">
          <li>
            <a href={CONTACT_TEL_URL} className="inline-flex items-center gap-2.5 transition hover:text-white">
              <IconPhone />
              {CONTACT_PHONE_DISPLAY}
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
        className="rounded-[22px] border border-white/15 bg-[#123e66]/80 p-5 shadow-[0_10px_30px_rgba(4,20,40,0.18)] backdrop-blur-[2px] sm:p-6"
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
              <div className="block text-[13px] text-white">
                Téléphone
                <div className={`${fieldClass} mt-1.5 flex items-center gap-2 px-2.5`}>
                  <div ref={countryRef} className="relative shrink-0">
                    <button
                      type="button"
                      aria-label="Indicatif du pays"
                      aria-haspopup="listbox"
                      aria-expanded={countryOpen}
                      onClick={() => setCountryOpen((open) => !open)}
                      className="flex cursor-pointer items-center gap-1"
                    >
                      <Flag code={countryId} />
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70" aria-hidden>
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                    {countryOpen ? (
                      <div className="absolute left-0 top-[calc(100%+10px)] z-30 w-72 overflow-hidden rounded-xl bg-white text-[#173b5d] shadow-[0_12px_32px_rgba(8,24,48,0.28)]">
                        <input
                          ref={searchRef}
                          value={countryQuery}
                          onChange={(event) => setCountryQuery(event.target.value)}
                          placeholder="Rechercher un pays"
                          aria-label="Rechercher un pays"
                          className="h-10 w-full border-b border-[#e4edf4] bg-white px-3 text-[13px] text-[#173b5d] outline-none placeholder:text-[#8aa0b3]"
                        />
                        <ul role="listbox" aria-label="Indicatif du pays" className="m-0 max-h-56 list-none overflow-auto p-1.5">
                          {visibleCountries.length === 0 ? (
                            <li className="px-2.5 py-2 text-[13px] text-[#5c7388]">Aucun pays</li>
                          ) : (
                            visibleCountries.map((country) => {
                              const selected = country.id === countryId;
                              return (
                                <li key={country.id} role="option" aria-selected={selected}>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setCountryId(country.id);
                                      setCountryOpen(false);
                                    }}
                                    className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left text-[13px] text-[#173b5d] ${selected ? "bg-[#e7f0f7]" : "hover:bg-[#f3f7fb]"}`}
                                  >
                                    <span className="inline-flex min-w-0 items-center gap-2">
                                      <Flag code={country.id} />
                                      <span className="truncate">{country.name}</span>
                                    </span>
                                    <span className="shrink-0 text-[#5c7388]">{country.dial}</span>
                                  </button>
                                </li>
                              );
                            })
                          )}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                  <input
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    value={phone}
                    placeholder={`${dial} 7 68 53 61 39`}
                    aria-invalid={phoneError ? true : undefined}
                    aria-describedby={phoneError ? "cta-phone-error" : undefined}
                    onChange={(event) => {
                      const next = event.target.value.replace(/[^\d+\s().-]/g, "").replace(/(?!^)\+/g, "");
                      setPhone(next);
                      event.target.setCustomValidity("");
                      if (phoneError) setPhoneError("");
                    }}
                    className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-white outline-none placeholder:text-white/35"
                  />
                </div>
              </div>
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
    </div>
  );
}
