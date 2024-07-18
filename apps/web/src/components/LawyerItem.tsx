import { type Lawyer } from "@repo/domain/src/lawyer-mgmt/Lawyer";
import Image from "next/image";

type LawyerCardProps = {
  lawyer: Lawyer;
};

const LawyerCard: React.FC<LawyerCardProps> = ({ lawyer }) => {
  return (
    <div
      data-testid={`lawyer-${lawyer.id}`}
      className="card w-full bg-base-100 shadow-xl"
    >
      <div className="card-body flex flex-row items-center space-x-4">
        <div className="w-24 h-24 rounded-full relative">
          <Image
            src={`/lawyerImage/${lawyer.id}.jpg`}
            alt={`${lawyer.name}'s profile`}
            className="w-full h-full object-cover rounded-full"
            fill={true}
          />
        </div>
        <div className="flex-grow">
          <h1 className="card-title text-xl font-bold">{lawyer.name}</h1>
          <p className="text-base">Location: {lawyer.location}</p>
          <p className="text-base">
            Expertise: {lawyer.legalExpertise.join(", ")}
          </p>
          <p className="text-base">Affiliation: {lawyer.affiliation}</p>
          <p className="text-base">Price: ${lawyer.price}/hr</p>
          <div>
            <h2 className="text-base font-semibold">Availability:</h2>
            <ul className="list-disc list-inside">
              {lawyer.availability.map((avail, index) => (
                <li key={index}>
                  {avail.day} ({avail.startTime} - {avail.endTime})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerCard;
