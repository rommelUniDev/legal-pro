import { type Lawyer, type LawyerId } from "@repo/domain";

export const lawyers: Record<LawyerId, Lawyer> = [
  {
    id: 1,
    name: "John Doe",
    location: "New York",
    legalExpertise: ["Corporate Law", "Tax Law"],
    availability: [
      { day: "Monday", startTime: "09:00", endTime: "17:00" },
      { day: "Wednesday", startTime: "10:00", endTime: "16:00" },
    ],
    price: 300,
    affiliation: "ABC Law Firm",
  },
  {
    id: 2,
    name: "Jane Smith",
    location: "Los Angeles",
    legalExpertise: ["Criminal Law", "Family Law"],
    availability: [
      { day: "Tuesday", startTime: "08:00", endTime: "15:00" },
      { day: "Thursday", startTime: "09:00", endTime: "17:00" },
    ],
    price: 250,
    affiliation: "XYZ Legal Services",
  },
  {
    id: 3,
    name: "Robert Johnson",
    location: "Chicago",
    legalExpertise: ["Real Estate Law", "Environmental Law"],
    availability: [
      { day: "Monday", startTime: "10:00", endTime: "18:00" },
      { day: "Friday", startTime: "09:00", endTime: "16:00" },
    ],
    price: 500,
    affiliation: "Green & Partners",
  },
];
