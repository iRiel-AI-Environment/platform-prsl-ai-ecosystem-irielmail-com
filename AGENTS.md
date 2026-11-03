<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- All UI copy lives in `src/i18n/messages.ts` (typed `Messages`); locales are registered in `src/i18n/locales.ts` with a `fallback` — why: one typed source keeps all 17 locales structurally consistent and RTL-aware.
- Agent PRSL-AI answers from the local knowledge base in messages (`src/lib/agent.ts` keyword matching) — why: privacy by default, nothing typed leaves the browser.
