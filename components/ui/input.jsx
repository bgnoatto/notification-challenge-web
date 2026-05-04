export function Input({ label, error, helperText, id, required, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="ml-1 text-destructive" aria-hidden="true">*</span>}
        </label>
      )}
      <input
        id={id}
        required={required}
        aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        aria-invalid={error ? "true" : undefined}
        className={`h-11 w-full rounded-md border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring ${error ? "border-destructive" : "border-border"}`}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${id}-helper`} className="text-xs text-muted-foreground">
          {helperText}
        </p>
      )}
    </div>
  );
}
