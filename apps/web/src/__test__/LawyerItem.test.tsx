/* eslint-disable fp/no-nil */
/* eslint-disable fp/no-unused-expression */
import { type Lawyer } from "@repo/domain/src/lawyer-mgmt/Lawyer";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { describe, it, beforeEach, afterEach, expect } from "vitest";

import LawyerItem from "../components/LawyerItem";

describe("LawyerItem component", () => {
  const mockLawyer: Lawyer = {
    id: 1,
    name: "John Doe",
    location: "New York",
    legalExpertise: ["Corporate Law", "Tax Law"],
    affiliation: "ABC Law Firm",
    price: 300,
    availability: [
      { day: "Monday", startTime: "09:00", endTime: "17:00" },
      { day: "Wednesday", startTime: "10:00", endTime: "16:00" },
    ],
  };

  beforeEach(() => {
    render(<LawyerItem lawyer={mockLawyer} />);
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the lawyer's name", () => {
    expect(
      screen.getByTestId(`lawyer-name-${mockLawyer.id}`)
    ).toHaveTextContent("John Doe");
  });

  it("renders the lawyer's location", () => {
    expect(
      screen.getByTestId(`lawyer-location-${mockLawyer.id}`)
    ).toHaveTextContent("Location: New York");
  });

  it("renders the lawyer's expertise", () => {
    expect(
      screen.getByTestId(`lawyer-expertise-${mockLawyer.id}`)
    ).toHaveTextContent("Expertise: Corporate Law, Tax Law");
  });

  it("renders the lawyer's affiliation", () => {
    expect(
      screen.getByTestId(`lawyer-affiliation-${mockLawyer.id}`)
    ).toHaveTextContent("Affiliation: ABC Law Firm");
  });

  it("renders the lawyer's price", () => {
    expect(
      screen.getByTestId(`lawyer-price-${mockLawyer.id}`)
    ).toHaveTextContent("Price: $300/hr");
  });

  it("renders the lawyer's availability", () => {
    const availabilityElement = screen.getByTestId(
      `lawyer-availability-${mockLawyer.id}`
    );
    expect(availabilityElement).toHaveTextContent("Monday (09:00 - 17:00)");
    expect(availabilityElement).toHaveTextContent("Wednesday (10:00 - 16:00)");
  });
});
