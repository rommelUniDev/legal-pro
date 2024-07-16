import { type Lawyer } from "@repo/domain/src/lawyer-mgmt/Lawyer";

import { lawyers } from "../lib/const/dummyLawyerList";

interface Filters {
  location: string;
  expertise: string;
  day: string;
  priceRange: number[];
  affiliation: string;
}

export function filterLawyers(filters: Filters): Promise<Lawyer[]> {
  const filteredLawyers = Object.values(lawyers).filter((lawyer: Lawyer) => {
    const matchesLocation = filters.location
      ? lawyer.location.includes(filters.location)
      : true;
    const matchesExpertise = filters.expertise
      ? lawyer.legalExpertise.includes(filters.expertise)
      : true;
    const matchesDay = filters.day
      ? lawyer.availability.some((avail) => avail.day === filters.day)
      : true;
    const matchesPrice =
      lawyer.price >= filters.priceRange[0] &&
      lawyer.price <= filters.priceRange[1];
    const matchesAffiliation = filters.affiliation
      ? lawyer.affiliation.includes(filters.affiliation)
      : true;

    return (
      matchesLocation &&
      matchesExpertise &&
      matchesDay &&
      matchesPrice &&
      matchesAffiliation
    );
  });

  return Promise.resolve(filteredLawyers);
}
