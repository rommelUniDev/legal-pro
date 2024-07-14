// eslint-disable-next-line fp/no-unused-expression
"use client";

import { type Lawyer } from "@repo/domain/src/lawyer-mgmt/Lawyer";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import React, { useState } from "react";

import LawyerItem from "../components/LawyerItem";
import { lawyers } from "../lib/const/dummyLawyerList";

const LawyersPage: React.FC = () => {
  const [location, setLocation] = useState<string>("");
  const [expertise, setExpertise] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [affiliation, setAffiliation] = useState<string>("");

  const filteredLawyers = Object.values(lawyers).filter((lawyer: Lawyer) => {
    const matchesLocation = location
      ? lawyer.location.includes(location)
      : true;
    const matchesExpertise = expertise
      ? lawyer.legalExpertise.includes(expertise)
      : true;
    const matchesDay = day
      ? lawyer.availability.some((avail) => avail.day === day)
      : true;
    const matchesPrice =
      lawyer.price >= priceRange[0] && lawyer.price <= priceRange[1];
    const matchesAffiliation = affiliation
      ? lawyer.affiliation.includes(affiliation)
      : true;

    return (
      matchesLocation &&
      matchesExpertise &&
      matchesDay &&
      matchesPrice &&
      matchesAffiliation
    );
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    return e.preventDefault();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lawyers</h1>

      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div className="flex flex-col">
          <Label htmlFor="location" className="mb-1">
            Location
          </Label>
          <Input
            id="location"
            type="text"
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 border rounded"
          />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="expertise" className="mb-1">
            Legal Expertise
          </Label>
          <Input
            id="expertise"
            type="text"
            onChange={(e) => setExpertise(e.target.value)}
            className="p-2 border rounded"
          />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="day" className="mb-1">
            Availability Day
          </Label>
          <select
            id="day"
            onChange={(e) => setDay(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Select a day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
          </select>
        </div>

        <div className="flex flex-col">
          <Label htmlFor="priceRangeMin" className="mb-1">
            Price Range Min
          </Label>
          <Input
            id="priceRangeMin"
            type="range"
            min="0"
            max="1000"
            data-testid="price-range-min"
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
            className="mb-2"
          />
          <Label htmlFor="priceRangeMax" className="mb-1">
            Price Range Max
          </Label>
          <Input
            id="priceRangeMax"
            type="range"
            min="0"
            max="1000"
            data-testid="price-range-max"
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
          />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="affiliation" className="mb-1">
            Affiliation
          </Label>
          <Input
            id="affiliation"
            type="text"
            onChange={(e) => setAffiliation(e.target.value)}
            className="p-2 border rounded"
          />
        </div>

        <Button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Filter
        </Button>
      </form>

      <Input
        type="email"
        placeholder="Email"
        className="mt-6 p-2 border rounded"
      />

      <ul className="mt-6 space-y-4">
        {filteredLawyers.map((lawyer) => (
          <li key={lawyer.id}>
            <LawyerItem lawyer={lawyer} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LawyersPage;
