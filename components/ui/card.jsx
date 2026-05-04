export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-lg border border-border bg-card text-card-foreground p-5 ${className}`}>
      {children}
    </div>
  );
}
