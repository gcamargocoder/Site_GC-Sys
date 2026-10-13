import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** Cabeçalho editorial das páginas internas: título à esquerda, apoio à direita. */
export function PageHeader({
  eyebrow,
  title,
  lead,
  aside,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <header className="pb-[clamp(3.5rem,7vw,6rem)] pt-[calc(var(--nav-h)+clamp(3.5rem,8vw,7rem))]">
      <Container>
        <Eyebrow className="mb-8">{eyebrow}</Eyebrow>
        <div className="grid-12 items-end gap-y-10">
          <h1 className="t-h1 col-span-12 lg:col-span-8">{title}</h1>
          {(lead || aside) && (
            <div className="col-span-12 flex flex-col gap-6 lg:col-span-4">
              {lead && <p className="t-lead">{lead}</p>}
              {aside}
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
