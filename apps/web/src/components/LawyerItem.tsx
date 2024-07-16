import { type Lawyer } from "@repo/domain/src/lawyer-mgmt/Lawyer";

type LawyerItemProps = {
  lawyer: Lawyer;
};

const LawyerItem: React.FC<LawyerItemProps> = ({ lawyer }) => {
  return (
    <div data-testid={`lawyer-${lawyer.id}`} className="p-4 border rounded">
      <div>
        <div className="font-bold text-lg">{lawyer.name}</div>
        <p className="text-gray-600">Location: {lawyer.location}</p>
        <p className="text-gray-600">
          Expertise: {lawyer.legalExpertise.join(", ")}
        </p>
        <p className="text-gray-600">Affiliation: {lawyer.affiliation}</p>
        <p className="text-gray-600">Price: ${lawyer.price}/hr</p>
        <div className="text-gray-600">
          Availability:
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
  );
};

export default LawyerItem;
