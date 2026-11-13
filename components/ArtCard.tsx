export function ArtCard({ children, tone = "ink", caption }: { children: React.ReactNode; tone?: "ink" | "blue" | "stone"; caption?: [string, string] }) {
  return (
    <div className="hero-art">
      <div className={`art-card ${tone}`}>{children}</div>
      {caption && <div className="cap"><span>{caption[0]}</span><span>{caption[1]}</span></div>}
    </div>
  );
}
