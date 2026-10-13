"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Check, ChevronDown } from "lucide-react";
import { projectTypes, validateContact, type ContactPayload, type FieldErrors } from "@/lib/contact";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "not_configured" | "error";

const empty: ContactPayload = {
  nome: "",
  empresa: "",
  email: "",
  whatsapp: "",
  tipo: "",
  mensagem: "",
  consentimento: false,
  website: "",
};

function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-1 flex items-baseline justify-between text-[0.875rem] text-text">
        {label}
        {optional && <span className="t-label text-dim">Opcional</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-[0.8125rem] text-dim">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-erro`} className="mt-1.5 flex items-start gap-2 text-[0.8125rem] text-danger">
          <span aria-hidden className="mt-1.5 size-1.5 shrink-0 bg-danger" />
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm({
  fallbackEmail,
  fallbackWhatsapp,
}: {
  fallbackEmail?: string;
  fallbackWhatsapp?: string;
}) {
  const [values, setValues] = useState<ContactPayload>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof ContactPayload>(k: K, v: ContactPayload[K]) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const blur = (k: keyof ContactPayload) => {
    const e = validateContact(values)[k];
    setErrors((s) => ({ ...s, [k]: e }));
  };

  const attrs = (k: keyof ContactPayload, hint = false) => ({
    id: k,
    name: k,
    "aria-invalid": errors[k] ? (true as const) : undefined,
    "aria-describedby": errors[k] ? `${k}-erro` : hint ? `${k}-hint` : undefined,
  });

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus();
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setStatus("success");
        setValues(empty);
      } else if (res.status === 503) {
        setStatus("not_configured");
      } else if (res.status === 422) {
        const data = (await res.json()) as { fields?: FieldErrors };
        setErrors(data.fields ?? {});
        setStatus("idle");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    requestAnimationFrame(() => summaryRef.current?.focus());
  }

  if (status === "success") {
    return (
      <div ref={summaryRef} tabIndex={-1} role="status" className="rounded-[1.5rem] border border-sage bg-sage-soft p-8 outline-none">
        <span className="flex size-10 items-center justify-center rounded-full bg-sage-ink text-white">
          <Check aria-hidden className="size-5" strokeWidth={2} />
        </span>
        <h2 className="t-h3 mt-6">Mensagem enviada.</h2>
        <p className="t-body mt-3 max-w-[44ch]">
          Recebemos as informações do seu projeto. Entraremos em contato pelo e-mail ou WhatsApp
          informado.
        </p>
        <Button variant="secondary" className="mt-8" onClick={() => setStatus("idle")} arrow={false}>
          Enviar outra mensagem
        </Button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <Field id="nome" label="Nome" error={errors.nome}>
          <input
            {...attrs("nome")}
            className="field"
            autoComplete="name"
            value={values.nome}
            onChange={(e) => set("nome", e.target.value)}
            onBlur={() => blur("nome")}
            required
          />
        </Field>
        <Field id="empresa" label="Empresa" optional>
          <input
            {...attrs("empresa")}
            className="field"
            autoComplete="organization"
            value={values.empresa}
            onChange={(e) => set("empresa", e.target.value)}
          />
        </Field>
        <Field id="email" label="E-mail" error={errors.email}>
          <input
            {...attrs("email")}
            type="email"
            inputMode="email"
            className="field"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => blur("email")}
            required
          />
        </Field>
        <Field id="whatsapp" label="WhatsApp" optional error={errors.whatsapp} hint="Com DDD.">
          <input
            {...attrs("whatsapp", true)}
            type="tel"
            inputMode="tel"
            className="field"
            autoComplete="tel"
            value={values.whatsapp}
            onChange={(e) => set("whatsapp", e.target.value)}
            onBlur={() => blur("whatsapp")}
          />
        </Field>
      </div>

      <Field id="tipo" label="Tipo de projeto" error={errors.tipo}>
        <div className="relative">
          <select
            {...attrs("tipo")}
            className={cn("field appearance-none pr-8", !values.tipo && "text-dim")}
            value={values.tipo}
            onChange={(e) => set("tipo", e.target.value)}
            onBlur={() => blur("tipo")}
            required
          >
            <option value="" disabled>
              Selecione
            </option>
            {projectTypes.map((t) => (
              <option key={t} value={t} className="bg-surface text-text">
                {t}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-dim" />
        </div>
      </Field>

      <Field
        id="mensagem"
        label="Descrição da necessidade"
        error={errors.mensagem}
        hint="Qual problema precisa ser resolvido e como a operação funciona hoje?"
      >
        <textarea
          {...attrs("mensagem", true)}
          rows={5}
          className="field resize-y"
          value={values.mensagem}
          onChange={(e) => set("mensagem", e.target.value)}
          onBlur={() => blur("mensagem")}
          required
        />
      </Field>

      {/* Honeypot: invisível para pessoas e leitores de tela */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Não preencha
          <input
            tabIndex={-1}
            autoComplete="off"
            name="website"
            value={values.website}
            onChange={(e) => set("website", e.target.value)}
          />
        </label>
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[0.875rem] leading-snug text-muted">
          <input
            {...attrs("consentimento")}
            type="checkbox"
            checked={values.consentimento}
            onChange={(e) => set("consentimento", e.target.checked)}
            className="peer sr-only"
          />
          <span
            aria-hidden
            className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border border-line-strong bg-surface transition-colors peer-checked:border-accent peer-checked:bg-accent peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent"
          >
            {values.consentimento && <Check className="size-3.5 text-accent-ink" strokeWidth={3} />}
          </span>
          <span>
            Concordo com o tratamento dos meus dados para retorno deste contato, conforme a{" "}
            <Link href="/privacidade" className="text-text underline underline-offset-4 hover:text-accent">
              Política de privacidade
            </Link>
            .
          </span>
        </label>
        {errors.consentimento && (
          <p id="consentimento-erro" className="mt-2 flex items-start gap-2 text-[0.8125rem] text-danger">
            <span aria-hidden className="mt-1.5 size-1.5 shrink-0 bg-danger" />
            {errors.consentimento}
          </p>
        )}
      </div>

      <div ref={summaryRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {status === "not_configured" && (
          <div role="alert" className="rounded-xl border border-line-strong bg-bg-2 p-4 text-[0.9375rem]">
            <p className="font-medium text-text">O envio por este formulário ainda não está ativo.</p>
            <p className="t-small mt-1">
              A entrega de mensagens precisa ser configurada no servidor. Sua mensagem não foi enviada.
              {(fallbackEmail || fallbackWhatsapp) && " Fale conosco por:"}
            </p>
            <p className="mt-2 flex flex-wrap gap-x-5 text-text">
              {fallbackEmail && (
                <a className="underline underline-offset-4 hover:text-accent" href={`mailto:${fallbackEmail}`}>
                  {fallbackEmail}
                </a>
              )}
              {fallbackWhatsapp && (
                <a className="underline underline-offset-4 hover:text-accent" href={fallbackWhatsapp} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              )}
            </p>
          </div>
        )}
        {status === "error" && (
          <div role="alert" className="rounded-xl border border-danger/40 bg-[#fbe9e4] p-4 text-[0.9375rem]">
            <p className="font-medium text-text">Não foi possível enviar a mensagem.</p>
            <p className="t-small mt-1">Verifique sua conexão e tente novamente em instantes.</p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Enviando…" : "Enviar mensagem"}
        </Button>
        <p className="text-[0.8125rem] text-dim">Retornamos pelo e-mail ou WhatsApp informado.</p>
      </div>
    </form>
  );
}
