import { type Lawyer } from "@repo/domain/src/lawyer-mgmt/Lawyer";
import Link from "next/link";
import React from "react";

import LawyerItem from "../components/LawyerItem";

interface LawyerListProps {
  lawyers: Lawyer[];
}

const LawyerList: React.FC<LawyerListProps> = ({ lawyers }) => {
  return (
    <ul className="mt-6 space-y-4">
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
  );
};

export default LawyerList;
