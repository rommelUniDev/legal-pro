/* eslint-disable fp/no-nil */
/* eslint-disable fp/no-unused-expression */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { notFound } from "next/navigation";
import React from "react";
import { describe, it, expect, vi } from "vitest";

import LawyerProfilePage from "../app/lawyers/[lawyerId]/page";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
}));

describe("LawyerProfilePage component", () => {
  it("renders without crashing", () => {
    render(
      <LawyerProfilePage
        params={{
          lawyerId: "",
        }}
      />
    );
  });

  it("renders the lawyer profile when lawyer is found", () => {
    const params = { params: { lawyerId: "1" } };
    render(<LawyerProfilePage {...params} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Location: New York")).toBeInTheDocument();
    expect(
      screen.getByText("Expertise: Corporate Law, Tax Law")
    ).toBeInTheDocument();
    expect(screen.getByText("Affiliation: ABC Law Firm")).toBeInTheDocument();
    expect(screen.getByText("Price: $300/hr")).toBeInTheDocument();
  });

  it("calls notFound when lawyer is not found", () => {
    const params = { params: { lawyerId: "999" } };
    render(<LawyerProfilePage {...params} />);

    expect(notFound).toHaveBeenCalled();
  });
});
