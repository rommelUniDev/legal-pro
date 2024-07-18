/* eslint-disable fp/no-nil */
/* eslint-disable fp/no-unused-expression */
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { describe, it, beforeEach, expect, afterEach, vi } from "vitest";

import LawyerFilter from "../components/LawyerFilter";

vi.mock("next/navigation", () => {
  return {
    useRouter: () => ({
      push: (url: string) => window.history.pushState({}, "", url),
    }),
  };
});

describe("LawyerFilter component", () => {
  beforeEach(() => {
    render(<LawyerFilter />);
  });

  afterEach(cleanup);

  it("renders without crashing", () => {
    render(<LawyerFilter />);
  });

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

  /** Functionality Test */

  it("filters lawyers by location", () => {
    const locationInput = screen.getByLabelText("Location");
    fireEvent.change(locationInput, { target: { value: "New York" } });

    const filterButton = screen.getByText("Filter");
    fireEvent.click(filterButton);

    expect(window.location.search).toContain("location=New+York");
  });

  it("filters lawyers by legal expertise", () => {
    const expertiseInput = screen.getByLabelText("Legal Expertise");
    fireEvent.change(expertiseInput, { target: { value: "Corporate Law" } });

    const filterButton = screen.getByText("Filter");
    fireEvent.click(filterButton);

    expect(window.location.search).toContain("expertise=Corporate+Law");
  });

  it("filters lawyers by availability day", () => {
    const daySelect = screen.getByLabelText("Availability Day");
    fireEvent.change(daySelect, { target: { value: "Monday" } });

    const filterButton = screen.getByText("Filter");
    fireEvent.click(filterButton);

    expect(window.location.search).toContain("day=Monday");
  });

  it("filters lawyers by affiliation", () => {
    const affiliationInput = screen.getByLabelText("Affiliation");
    fireEvent.change(affiliationInput, { target: { value: "ABC Law Firm" } });

    const filterButton = screen.getByText("Filter");
    fireEvent.click(filterButton);

    expect(window.location.search).toContain("affiliation=ABC+Law+Firm");
  });

  it("filters lawyers by price range", () => {
    const priceRangeMinLabel = screen.getByText(/Price Range Min:/);
    const priceRangeMinInput =
      priceRangeMinLabel.nextElementSibling as HTMLInputElement;
    const priceRangeMaxLabel = screen.getByText(/Price Range Max:/);
    const priceRangeMaxInput =
      priceRangeMaxLabel.nextElementSibling as HTMLInputElement;

    fireEvent.change(priceRangeMinInput, { target: { value: "0" } });
    fireEvent.change(priceRangeMaxInput, { target: { value: "250" } });

    const filterButton = screen.getByText("Filter");
    fireEvent.click(filterButton);

    expect(window.location.search).toContain("priceRangeMin=0");
    expect(window.location.search).toContain("priceRangeMax=250");
  });

  it("resets the filters when the reset button is clicked", () => {
    const locationInput = screen.getByLabelText("Location");
    fireEvent.change(locationInput, { target: { value: "New York" } });

    const expertiseInput = screen.getByLabelText("Legal Expertise");
    fireEvent.change(expertiseInput, { target: { value: "Corporate Law" } });

    const daySelect = screen.getByLabelText("Availability Day");
    fireEvent.change(daySelect, { target: { value: "Monday" } });

    const affiliationInput = screen.getByLabelText("Affiliation");
    fireEvent.change(affiliationInput, { target: { value: "ABC Law Firm" } });

    const priceRangeMinLabel = screen.getByText(/Price Range Min:/);
    const priceRangeMinInput =
      priceRangeMinLabel.nextElementSibling as HTMLInputElement;
    const priceRangeMaxLabel = screen.getByText(/Price Range Max:/);
    const priceRangeMaxInput =
      priceRangeMaxLabel.nextElementSibling as HTMLInputElement;

    fireEvent.change(priceRangeMinInput, { target: { value: "0" } });
    fireEvent.change(priceRangeMaxInput, { target: { value: "250" } });

    const resetButton = screen.getByText("Reset");
    fireEvent.click(resetButton);

    expect((locationInput as HTMLInputElement).value).toBe("");
    expect((expertiseInput as HTMLInputElement).value).toBe("");
    expect((daySelect as HTMLSelectElement).value).toBe("");
    expect(priceRangeMinInput.value).toBe("0");
    expect(priceRangeMaxInput.value).toBe("1000");
    expect((affiliationInput as HTMLInputElement).value).toBe("");
    expect(window.location.pathname).toBe("/");
  });
});
