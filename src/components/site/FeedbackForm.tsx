import { useState, type FormEvent } from "react";
import { useI18n } from "@/i18n/context";
import { CONTACT_EMAIL } from "@/lib/brand";

export function FeedbackForm({ subjectPrefix = "PRSL-AI" }: { subjectPrefix?: string }) {
  const { t } = useI18n();
  const f = t.form;
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const subject = `${subjectPrefix} · ${d.get("category")}`;
    const body = `${d.get("message")}\n\n— ${d.get("name")} <${d.get("email")}>`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  const field = "mt-1 block w-full min-h-11 rounded-md border border-input bg-background px-3 py-2";
  return (
    <form onSubmit={onSubmit} className="panel grid gap-4 p-6 md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm">{f.name}<input name="name" required maxLength={100} className={field} /></label>
        <label className="text-sm">{f.email}<input name="email" type="email" required maxLength={255} className={field} /></label>
      </div>
      <label className="text-sm">{f.category}
        <select name="category" className={field}>{f.categories.map((c) => <option key={c}>{c}</option>)}</select>
      </label>
      <label className="text-sm">{f.message}<textarea name="message" required maxLength={2000} rows={5} className={field} /></label>
      <button type="submit" className="min-h-11 justify-self-start rounded-md bg-primary px-6 font-medium text-primary-foreground hover:bg-accent hover:text-accent-foreground">{f.submit}</button>
      {sent && <p role="status" className="text-sm text-primary">{f.thanks}</p>}
    </form>
  );
}
