import { type Lawyer } from "@repo/domain/src/lawyer-mgmt/Lawyer";
import Link from "next/link";
import React from "react";

import LawyerItem from "../components/LawyerItem";

interface LawyerListProps {
  lawyers: Lawyer[];
}

const LawyerList: React.FC<LawyerListProps> = ({ lawyers }) => {
  return (
    <div className=" bg-slate-300 bg-opacity-15 backdrop-filter backdrop-blur-lg backdrop-brightness-75 p-8 rounded-lg shadow-md">
      <h1 className="font-bold text-2xl">LAWYERS</h1>
      <ul className="space-y-4 mt-3 ">
        {lawyers.map((lawyer) => (
          <li key={lawyer.id}>
            <Link href={`/lawyers/${lawyer.id}`}>
              <div>
                <LawyerItem lawyer={lawyer} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LawyerList;
