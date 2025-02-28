import { Property } from "@/types/property";
import PropertyCard from "./PropertyCard";
import ProfileDashboard from "./ProfileDashboard";
import { BsBuildingsFill } from "react-icons/bs";
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
    <div className="flex flex-col w-full h-full min-h-screen ml-[18.177vw] bg-[#E8EBEF]">
      {tab === "dashboard" && (
        <div className="w-full h-full p-[2.604vw] flex-grow">
          <h1 className="text-[1.458vw] font-normal text-premier-blue font-ranade">
            MY PROPERTIES
          </h1>
          <div className="mt-[1.604vw]">
            <h3 className="text-[1.042vw] font-normal border-b-2 border-premier-orange text-premier-orange pb-[0.156vw] w-[3.802vw] mb-[1.719vw]">
              Wishilist
            </h3>
            {properties.length === 0 && (
              <>
                <p className="text-[0.833vw] font-normal text-premier-blue">
                  Quickly Get Started !
                </p>

                <div className="flex items-center justify-start p-[1.342vw] h-[7.42vw] mt-[2.042vw] text-premier-blue border p-[0.625vw] rounded-[0.833vw] bg-white">
                  <div className="flex items-center justify-center p-[1vw] bg-gray-200 rounded-full mr-[1.625vw]">
                    <BsBuildingsFill size={25} className="text-premier-blue" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-[0.933vw] font-semibold">
                      Add properties to your dashboard.
                    </h3>
                    <p className="font-light text-[0.833vw]">
                      Keep track of properties you like.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      (window.location.href =
                        "https://www.premierproperties.ae")
                    }
                    className="text-[0.833vw] font-normal ms-auto text-white bg-premier-blue p-[0.625vw] rounded-[0.833vw] hover:bg-premier-blue"
                  >
                    Search for properties
                  </button>
                </div>
              </>
            )}
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
