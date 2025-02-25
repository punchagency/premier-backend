import { Property } from "@/types/property";
import PropertyCard from "./PropertyCard";
import ProfileDashboard from "./ProfileDashboard";
import Nav from "./Nav";
import Footer from "./Footer";

interface DashboardContentProps {
  tab: string;
  properties: Property[];
  handleDelete: any;
}

const DashboardContent = ({
  tab,
  properties,
  handleDelete,
}: DashboardContentProps) => {
  return (
    <div className="flex flex-col w-full h-full min-h-screen ml-[18.177vw]">
      {tab === "dashboard" && (
        <div className="w-full h-full p-[2.604vw] flex-grow">
          <h1 className="text-[1.458vw] font-normal text-premier-blue font-ranade">MY PROPERTY</h1>
          <div className="mt-[1.604vw]">
            <h3 className="text-[1.042vw] font-normal border-b-2 border-premier-orange text-premier-orange pb-[0.156vw] w-[3.802vw] mb-[1.719vw]">Wishilist</h3>
            <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
          {properties.map((property: Property) => (
            <PropertyCard
            key={property.id}
            property={property}
            onDelete={handleDelete}
            />
          ))}
          </div>
          </div>
        </div>
      )}
      {tab === "profile" && <ProfileDashboard />}

      <Footer />
    </div>

  );
};

export default DashboardContent;
