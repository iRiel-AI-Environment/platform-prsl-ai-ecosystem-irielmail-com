import { useI18n } from "@/i18n/context";

export function SubmissionStatus() {
  const { t } = useI18n();

  return (
    <section className="panel p-6 md:p-8" role="note" aria-live="polite">
      <p className="leading-relaxed text-muted-foreground">{t.form.unavailable}</p>
    </section>
  );
}
