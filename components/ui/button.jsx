const VARIANTS = {
  primary: "bg-accent text-accent-foreground hover:bg-green-400",
  secondary: "bg-secondary text-foreground hover:bg-slate-700 border border-border",
  destructive: "bg-destructive text-white hover:bg-red-600",
  ghost: "text-foreground hover:bg-secondary",
};

export function Button({ children, variant = "primary", loading = false, className = "", ...props }) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant]} ${className}`}
    >
      {loading && (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
