/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable fp/no-nil */
/* eslint-disable fp/no-unused-expression */
import { type Lawyer } from "@repo/domain/src/lawyer-mgmt/Lawyer";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { describe, it, beforeEach, afterEach, vi, expect } from "vitest";

import LawyerList from "../components/LawyerList";

vi.mock("next/link", () => {
  return {
    default: ({
      children,
      href,
    }: {
      children: React.ReactNode;
      href: string;
    }) => {
      return React.cloneElement(children as React.ReactElement, {
        onClick: () => window.history.pushState({}, "", href),
      });
    },
  };
});

const lawyers: Lawyer[] = [
  {
    id: 1,
    name: "John Doe",
    legalExpertise: ["Corporate Law"],
    location: "New York",
    affiliation: "ABC Law Firm",
    price: 500,
    availability: [{ day: "Monday", startTime: "09:00", endTime: "17:00" }],
  },
  {
    id: 2,
    name: "Jane Smith",
    legalExpertise: ["Family Law"],
    location: "Los Angeles",
    affiliation: "XYZ Law Firm",
    price: 400,
    availability: [{ day: "Tuesday", startTime: "10:00", endTime: "18:00" }],
  },
  {
    id: 3,
    name: "Robert Johnson",
    legalExpertise: ["Criminal Law"],
    location: "Chicago",
    affiliation: "123 Law Firm",
    price: 700,
    availability: [{ day: "Wednesday", startTime: "08:00", endTime: "16:00" }],
  },
];

describe("LawyerList component", () => {
  beforeEach(() => {
    render(<LawyerList lawyers={lawyers} />);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<LawyerList lawyers={lawyers} />);
  });

  it("displays the list of lawyers", () => {
    const lawyerItems = screen.getAllByTestId(/lawyer-\d+/);
    expect(lawyerItems).toHaveLength(lawyers.length);
  });

  it("displays each lawyer's details correctly", () => {
    lawyers.forEach((lawyer) => {
      const lawyerItem = screen.getByTestId(`lawyer-${lawyer.id}`);
      expect(lawyerItem).toHaveTextContent(lawyer.name);
      expect(lawyerItem).toHaveTextContent(lawyer.location);
      expect(lawyerItem).toHaveTextContent(lawyer.affiliation);
      expect(lawyerItem).toHaveTextContent(lawyer.legalExpertise.join(", "));
    });
  });

  it("navigates to the correct URL when a lawyer is clicked", () => {
    const lawyer = lawyers[0];
    const link = screen.getByText(lawyer.name);
    fireEvent.click(link);
    expect(window.location.pathname).toBe(`/lawyers/${lawyer.id}`);
  });
});
