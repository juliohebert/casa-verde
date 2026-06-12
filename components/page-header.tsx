import { Badge } from "@/components/ui/badge";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="space-y-3">
      {eyebrow && <Badge variant="secondary">{eyebrow}</Badge>}
      <div className="space-y-2">
        <h1 className="font-serif text-3xl tracking-tight text-primary sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-pretty text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
