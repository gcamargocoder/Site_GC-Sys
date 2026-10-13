import Link from "next/link";
import { legalNav, nav, siteConfig, whatsappUrl } from "@/config/site";
import { services } from "@/config/content";
import { Wordmark } from "@/components/ui/Wordmark";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";

const linkCls =
  "inline-flex min-h-8 items-center text-[0.9375rem] text-muted transition-colors duration-300 hover:text-text";

export function Footer() {
  const { contact, social, legal } = siteConfig;
  const wa = whatsappUrl();
  const year = 2026;
  const hasContact = contact.email || wa || social.linkedin || contact.location;

  return (
    <footer className="relative z-10 overflow-hidden border-t border-line bg-surface">
      <div className="container-x pt-16 md:pt-24">
        <div className="grid-12 gap-y-14">
          <div className="col-span-12 flex flex-col gap-6 lg:col-span-4">
            <Wordmark className="[&_img]:h-9" />
            <p className="t-body max-w-[36ch]">{siteConfig.description}</p>
          </div>

          <nav aria-label="Rodapé" className="col-span-6 lg:col-span-2 lg:col-start-6">
            <TechnicalLabel>Navegação</TechnicalLabel>
            <ul className="mt-5 flex flex-col">
              {nav.map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className={linkCls}>
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Serviços" className="col-span-6 lg:col-span-3">
            <TechnicalLabel>Serviços</TechnicalLabel>
            <ul className="mt-5 flex flex-col">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/servicos/${s.slug}`} className={linkCls}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-12 lg:col-span-2">
            <TechnicalLabel>Contato</TechnicalLabel>
            <ul className="mt-5 flex flex-col">
              {contact.email && (
                <li>
                  <a href={`mailto:${contact.email}`} className={linkCls}>
                    {contact.email}
                  </a>
                </li>
              )}
              {wa && (
                <li>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className={linkCls}>
                    {contact.whatsappDisplay || "WhatsApp"}
                  </a>
                </li>
              )}
              {social.linkedin && (
                <li>
                  <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className={linkCls}>
                    LinkedIn
                  </a>
                </li>
              )}
              {contact.location && <li className="t-small py-1">{contact.location}</li>}
              <li>
                <Link href="/contato" className={linkCls}>
                  {hasContact ? "Formulário de contato" : "Solicitar projeto"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-line py-6 text-sm text-dim md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {legal.companyName || siteConfig.name}.
            {legal.cnpj && <span className="tnum"> CNPJ {legal.cnpj}.</span>} Todos os direitos reservados.
          </p>
          <ul className="flex flex-wrap gap-x-6">
            {legalNav.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="inline-flex min-h-8 items-center transition-colors hover:text-text">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
