import Link from "next/link";
import brancIcon from "@/assets/brand-icon.png";

import { agbalumo } from "@/app/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Brand({
  href = "/",
  compact = false,
  className,
}: {
  href?: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 text-primary transition-opacity hover:opacity-80",
        className,
      )}
    >
      <span className="grid size-9 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
        <Image src={brancIcon} width={24} alt="brand-icon" />
      </span>
      {!compact && (
        <span
          className={cn(
            agbalumo.className,
            "translate-y-[-10%] text-xl leading-none tracking-tight",
          )}
        >
          Casa Verde
        </span>
      )}
    </Link>
  );
}
