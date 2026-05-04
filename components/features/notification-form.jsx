"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CHANNELS = [
  { code: 1, label: "EMAIL" },
  { code: 2, label: "SMS" },
  { code: 3, label: "PUSH" },
];

export function NotificationForm({ action, defaultValues = {}, submitLabel = "Save" }) {
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <Input
        id="title"
        name="title"
        label="Title"
        required
        defaultValue={defaultValues.title ?? ""}
        error={state?.errors?.title}
        placeholder="Alert title"
      />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="content" className="text-sm font-medium text-foreground">
          Content <span className="text-destructive" aria-hidden="true">*</span>
        </label>
        <textarea
          id="content"
          name="content"
          required
          defaultValue={defaultValues.content ?? ""}
          rows={4}
          placeholder="Notification content..."
          aria-describedby={state?.errors?.content ? "content-error" : undefined}
          className={`w-full rounded-md border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring resize-none ${state?.errors?.content ? "border-destructive" : "border-border"}`}
        />
        {state?.errors?.content && (
          <p id="content-error" role="alert" className="text-xs text-destructive">
            {state.errors.content}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="channelCode" className="text-sm font-medium text-foreground">
          Channel <span className="text-destructive" aria-hidden="true">*</span>
        </label>
        <select
          id="channelCode"
          name="channelCode"
          required
          defaultValue={defaultValues.channelCode ?? ""}
          className="h-11 w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
        >
          <option value="" disabled>Select channel...</option>
          {CHANNELS.map((ch) => (
            <option key={ch.code} value={ch.code}>{ch.label}</option>
          ))}
        </select>
        {state?.errors?.channelCode && (
          <p role="alert" className="text-xs text-destructive">{state.errors.channelCode}</p>
        )}
      </div>
      {state?.error && (
        <p role="alert" className="text-sm text-destructive">{state.error}</p>
      )}
      <Button type="submit" disabled={isPending}>{submitLabel}</Button>
      {isPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <svg className="h-10 w-10 animate-spin text-accent" viewBox="0 0 24 24" fill="none" aria-label="Loading">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      )}
    </form>
  );
}
