import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "@/i18n/context";
import { SubmissionStatus } from "@/components/site/SubmissionStatus";

describe("SubmissionStatus", () => {
  it("states that submissions are unavailable without collecting user data", () => {
    render(
      <I18nProvider>
        <SubmissionStatus />
      </I18nProvider>,
    );

    expect(screen.getByText(/This form is not connected to a submission service/)).toBeInTheDocument();
    expect(screen.queryByRole("form")).not.toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });
});
