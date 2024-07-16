// eslint-disable-next-line fp/no-unused-expression
"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LawyerFilter: React.FC = () => {
  const [location, setLocation] = useState<string>("");
  const [expertise, setExpertise] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [affiliation, setAffiliation] = useState<string>("");
  const router = useRouter();

  // eslint-disable-next-line fp/no-nil
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    // eslint-disable-next-line fp/no-unused-expression
    e.preventDefault();
    const query = new URLSearchParams({
      location,
      expertise,
      day,
      priceRangeMin: priceRange[0].toString(),
      priceRangeMax: priceRange[1].toString(),
      affiliation,
    }).toString();
    // eslint-disable-next-line fp/no-unused-expression, fp/no-mutating-methods
    router.push(`/?${query}`);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="location" className="mb-1">
          Location
        </label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="expertise" className="mb-1">
          Legal Expertise
        </label>
        <input
          id="expertise"
          type="text"
          value={expertise}
          onChange={(e) => setExpertise(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="day" className="mb-1">
          Availability Day
        </label>
        <select
          id="day"
          value={day}
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
        <label htmlFor="priceRangeMin" className="mb-1">
          Price Range Min
        </label>
        <input
          id="priceRangeMin"
          type="range"
          min="0"
          max="1000"
          value={priceRange[0]}
          onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
          className="mb-2"
        />
        <label htmlFor="priceRangeMax" className="mb-1">
          Price Range Max
        </label>
        <input
          id="priceRangeMax"
          type="range"
          min="0"
          max="1000"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="affiliation" className="mb-1">
          Affiliation
        </label>
        <input
          id="affiliation"
          type="text"
          value={affiliation}
          onChange={(e) => setAffiliation(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
        Filter
      </button>
    </form>
  );
};

export default LawyerFilter;
