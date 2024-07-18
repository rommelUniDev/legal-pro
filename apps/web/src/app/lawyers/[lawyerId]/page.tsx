import { type Lawyer } from "@repo/domain/src/lawyer-mgmt/Lawyer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

import { lawyers } from "../../../lib/const/dummyLawyerList";

type Params = {
  params: {
    lawyerId: string;
  };
};

const fetchLawyer = (id: string): Lawyer | undefined => {
  const lawyerId = parseInt(id, 10);
  return lawyers[lawyerId];
};

const LawyerProfilePage = ({ params }: Params) => {
  const lawyer = fetchLawyer(params.lawyerId);

  if (lawyer === undefined) {
    return notFound();
  }

  return (
    <div
      data-testid={`lawyer-${lawyer.id}`}
      className="flex flex-col bg-slate-700 shadow-lg p-6 rounded-lg max-w-2xl mx-auto mt-8 text-gray-800"
    >
      <Link href="/" className="mb-6">
        <button
          type="button"
          className="btn btn-primary bg-gray-500 text-white rounded  px-3"
        >
          Back
        </button>
      </Link>
      <div className="flex flex-row items-center">
        <div className="w-24 h-24 rounded-full mr-6 relative">
          <Image
            src={`/lawyerImage/${lawyer.id}.jpg`}
            alt={`${lawyer.name}'s profile`}
            className="w-full h-full object-cover rounded-full"
            fill={true}
          />
        </div>
        <div className="flex flex-col">
          <div className="font-poppins text-2xl font-semibold truncate">
            {lawyer.name}
          </div>
          <p className="text-sm text-blue-500">Location: {lawyer.location}</p>
          <p className="text-sm text-blue-500">
            Affiliation: {lawyer.affiliation}
          </p>
          <p className="text-sm text-blue-500">Price: ${lawyer.price}/hr</p>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="font-poppins text-xl font-semibold mb-2">Expertise</h2>
        <p className="text-sm text-blue-500">
          {lawyer.legalExpertise.join(", ")}
        </p>
      </div>
      <div className="mt-6">
        <h2 className="font-poppins text-xl font-semibold mb-2">Biography</h2>
        <p className="text-sm text-blue-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac
          vestibulum erat. Cras venenatis euismod malesuada.
        </p>
      </div>
      <div className="mt-6">
        <h2 className="font-poppins text-xl font-semibold mb-2">
          Availability
        </h2>
        <ul className="list-disc list-inside text-sm text-blue-500">
          {lawyer.availability.map((avail, index) => (
            <li key={index}>
              {avail.day}: {avail.startTime} - {avail.endTime}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LawyerProfilePage;
