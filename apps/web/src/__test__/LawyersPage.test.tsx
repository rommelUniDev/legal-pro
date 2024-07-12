/* eslint-disable fp/no-nil */
/* eslint-disable fp/no-unused-expression */
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, beforeEach, expect, afterEach } from "vitest";

import LawyersPage from "../app/page";

describe("LawyersPage component", () => {
  /** Display Test */

  it("renders without crashing", () => {
    render(<LawyersPage />);
  });

  beforeEach(() => {
    render(<LawyersPage />);
  });

  afterEach(cleanup);

  it("displays the location input field", () => {
    const locationInput = screen.getByLabelText("Location");
    expect(locationInput).toBeDefined();
    expect(locationInput).toBeInstanceOf(HTMLInputElement);
  });

  it("displays the legal expertise input field", () => {
    const expertiseInput = screen.getByLabelText("Legal Expertise");
    expect(expertiseInput).toBeDefined();
    expect(expertiseInput).toBeInstanceOf(HTMLInputElement);
  });

  it("displays the availability day selection field", () => {
    const daySelect = screen.getByLabelText("Availability Day");
    expect(daySelect).toBeDefined();
    expect(daySelect).toBeInstanceOf(HTMLSelectElement);
  });

  it("displays the price range input fields", () => {
    const priceRangeInputs = screen.getAllByRole("slider");
    expect(priceRangeInputs).toHaveLength(2);
    priceRangeInputs.forEach((input) => {
      expect(input).toBeDefined();
      expect(input).toBeInstanceOf(HTMLInputElement);
    });
  });

  it("displays the affiliation input field", () => {
    const affiliationInput = screen.getByLabelText("Affiliation");
    expect(affiliationInput).toBeDefined();
    expect(affiliationInput).toBeInstanceOf(HTMLInputElement);
  });

  it("displays the filter button", () => {
    const filterButton = screen.getByText("Filter");
    expect(filterButton).toBeDefined();
    expect(filterButton).toBeInstanceOf(HTMLButtonElement);
  });

  it("displays the initial list of lawyers", () => {
    const lawyerItems = screen.getAllByTestId(/^lawyer-/);
    expect(lawyerItems).not.toHaveLength(0);

    const lawyerNames = lawyerItems.map((item) => {
      const nameElement = item.querySelector("[data-testid^='lawyer-name-']");
      return nameElement ? nameElement.textContent : "";
    });

    console.log(lawyerNames);
    expect(lawyerNames).toContain("John Doe");
    expect(lawyerNames).toContain("Jane Smith");
    expect(lawyerNames).toContain("Robert Johnson");
  });

  /** Functionality Test */

  it("filters lawyers by location", () => {
    const locationInput = screen.getByLabelText("Location");
    fireEvent.change(locationInput, { target: { value: "New York" } });

    const filterButton = screen.getByText("Filter");
    fireEvent.click(filterButton);

    const lawyerItems = screen.getAllByTestId(/^lawyer-/);
    const lawyerNames = lawyerItems.map((item) => {
      const nameElement = item.querySelector("[data-testid^='lawyer-name-']");
      return nameElement ? nameElement.textContent : "";
    });

    expect(lawyerNames).toContain("John Doe");
    expect(lawyerNames).not.toContain("Jane Smith");
    expect(lawyerNames).not.toContain("Robert Johnson");
  });

  it("filters lawyers by legal expertise", () => {
    const expertiseInput = screen.getByLabelText("Legal Expertise");
    fireEvent.change(expertiseInput, { target: { value: "Corporate Law" } });

    const filterButton = screen.getByText("Filter");
    fireEvent.click(filterButton);

    const lawyerItems = screen.getAllByTestId(/^lawyer-/);
    const lawyerNames = lawyerItems.map((item) => {
      const nameElement = item.querySelector("[data-testid^='lawyer-name-']");
      return nameElement ? nameElement.textContent : "";
    });

    expect(lawyerNames).toContain("John Doe");
    expect(lawyerNames).not.toContain("Jane Smith");
    expect(lawyerNames).not.toContain("Robert Johnson");
  });

  it("filters lawyers by availability day", () => {
    const daySelect = screen.getByLabelText("Availability Day");
    fireEvent.change(daySelect, { target: { value: "Monday" } });

    const filterButton = screen.getByText("Filter");
    fireEvent.click(filterButton);

    const lawyerItems = screen.getAllByTestId(/^lawyer-/);
    const lawyerNames = lawyerItems.map((item) => {
      const nameElement = item.querySelector("[data-testid^='lawyer-name-']");
      return nameElement ? nameElement.textContent : "";
    });

    expect(lawyerNames).toContain("John Doe");
    expect(lawyerNames).toContain("Robert Johnson");
    expect(lawyerNames).not.toContain("Jane Smith");
  });

  it("filters lawyers by affiliation", () => {
    const affiliationInput = screen.getByLabelText("Affiliation");
    fireEvent.change(affiliationInput, { target: { value: "ABC Law Firm" } });

    const filterButton = screen.getByText("Filter");
    fireEvent.click(filterButton);

    const lawyerItems = screen.getAllByTestId(/^lawyer-/);
    const lawyerNames = lawyerItems.map((item) => {
      const nameElement = item.querySelector("[data-testid^='lawyer-name-']");
      return nameElement ? nameElement.textContent : "";
    });

    expect(lawyerNames).toContain("John Doe");
    expect(lawyerNames).not.toContain("Jane Smith");
    expect(lawyerNames).not.toContain("Robert Johnson");
  });

  it("filters lawyers by price range", () => {
    const priceRangeMin = screen.getByTestId("price-range-min");
    const priceRangeMax = screen.getByTestId("price-range-max");
    fireEvent.change(priceRangeMin, { target: { value: "0" } });
    fireEvent.change(priceRangeMax, { target: { value: "250" } });

    const filterButton = screen.getByText("Filter");
    fireEvent.click(filterButton);

    const lawyerItems = screen.getAllByTestId(/^lawyer-/);
    const lawyerNames = lawyerItems.map((item) => {
      const nameElement = item.querySelector("[data-testid^='lawyer-name-']");
      return nameElement ? nameElement.textContent : "";
    });

    expect(lawyerNames).toContain("Jane Smith");
    expect(lawyerNames).not.toContain("John Doe");
    expect(lawyerNames).not.toContain("Robert Johnson");
  });
});
