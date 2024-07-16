import React from "react";

import { filterLawyers } from "../actions/filterLawyers";
import LawyerFilter from "../components/LawyerFilter";
import LawyerList from "../components/LawyerList";

const LawyersPage: React.FC<{
  searchParams: Record<string, string | string[]>;
}> = async ({ searchParams }) => {
  const filters = {
    location: Array.isArray(searchParams.location)
      ? searchParams.location[0]
      : searchParams.location || "",
    expertise: Array.isArray(searchParams.expertise)
      ? searchParams.expertise[0]
      : searchParams.expertise || "",
    day: Array.isArray(searchParams.day)
      ? searchParams.day[0]
      : searchParams.day || "",
    priceRange: [
      Number(
        Array.isArray(searchParams.priceRangeMin)
          ? searchParams.priceRangeMin[0]
          : searchParams.priceRangeMin
      ) || 0,
      Number(
        Array.isArray(searchParams.priceRangeMax)
          ? searchParams.priceRangeMax[0]
          : searchParams.priceRangeMax
      ) || 1000,
    ],
    affiliation: Array.isArray(searchParams.affiliation)
      ? searchParams.affiliation[0]
      : searchParams.affiliation || "",
  };

  const filteredLawyers = await filterLawyers(filters);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lawyers</h1>
      <LawyerFilter />
      <LawyerList lawyers={filteredLawyers} />
    </div>
  );
};

export default LawyersPage;
