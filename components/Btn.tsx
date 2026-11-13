import { TLink } from "./Transition";
import { Magnetic } from "./Magnetic";

export const Arrow = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
  </svg>
);

export function Btn({ href, variant = "dark", arrow = false, small = false, size, disabled = false, children, onClick, type, magnetic = true, "aria-label": ariaLabel }: {
  href?: string; variant?: "dark" | "ghost" | "light" | "line"; arrow?: boolean; small?: boolean; size?: "sm" | "md" | "lg" | string; disabled?: boolean; children: React.ReactNode; onClick?: () => void; type?: "submit" | "button"; magnetic?: boolean; "aria-label"?: string;
}) {
  const isSmall = small || size === "sm";
  const cls = `btn btn-${variant} ${isSmall ? "btn-sm" : ""}`;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <span className="arr"><Arrow /><Arrow /></span>}
    </>
  );
  const el = href ? (
    <TLink href={href} className={cls} aria-label={ariaLabel}>{inner}</TLink>
  ) : (
    <button type={type ?? "button"} className={cls} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>{inner}</button>
  );
  return magnetic && !disabled ? <Magnetic strength={0.22}>{el}</Magnetic> : el;
}

export function TextLink({ href, children, blue = false }: { href: string; children: React.ReactNode; blue?: boolean }) {
  return <TLink href={href} className={`tlink ${blue ? "blue" : ""}`}>{children}<span className="arr"><Arrow /></span></TLink>;
}
