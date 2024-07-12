import { type Lawyer } from "@repo/domain";

type LawyerItemProps = {
  lawyer: Lawyer;
};

const LawyerProfilePage: React.FC<LawyerItemProps> = ({ lawyer }) => {
  return (
    <div
      data-testid={`lawyer-${lawyer.id}`}
      className="flex flex-row flex-nowrap bg-light-purple h-auto min-w-60 p-4 rounded-lg content-center z-50"
    >
      <div className="flex flex-col min-w-32 overflow-clip grow">
        <div className="font-poppins text-md font-semibold truncate">
          {lawyer.name}
        </div>
        <p className="text-sm">Location: {lawyer.location}</p>
        <p className="text-sm">Expertise: {lawyer.legalExpertise.join(", ")}</p>
        <p className="text-sm">Affiliation: {lawyer.affiliation}</p>
        <p className="text-sm">Price: ${lawyer.price}/hr</p>
      </div>
    </div>
  );
};

export default LawyerProfilePage;
