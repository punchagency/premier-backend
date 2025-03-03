"use client";
import { Property } from "@/types/property";
import Image from "next/image";
import { useEffect, useState } from "react";
import Cancel from "../../public/icons/Cancel";

interface PropertyCardProps {
  property: Property;
  onDelete?: (id: string) => void;
}


export default function PropertyCard({
  property,
  onDelete,
}: PropertyCardProps) {
  const [hover, setHover] = useState(false);
  const [url, setUrl] = useState("");

  const Rent_property = "b2f0a41fd7c327c10366827ae6439b61";
  const Off_plan_property = "5fe363f78dddef4aebf24a49d82c6d5f";
  const Buy_property = "3fdef2e82bd992cac8b18a19ed38925c";
  
  const propertyType = property.fieldData["property-tag"];

  useEffect(() => {
  if (propertyType === Rent_property) {
     setUrl(`https://www.premierproperties.ae/properties/rent/${property.fieldData.slug}`);
  } else if (propertyType === Off_plan_property) {
     setUrl(`https://www.premierproperties.ae/properties/off-plan/${property.fieldData.slug}`);
  } else if (propertyType === Buy_property) {
     setUrl(`https://www.premierproperties.ae/properties/buy/${property.fieldData.slug}`);
  }
  }, [propertyType]);

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: "AED",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };
  return (
    <div
      className={`relative mb-4 overflow-hidden rounded-2xl  transition-all duration-500 hover:shadow-lg bg-white cursor-pointer`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    
    >
      {typeof property.fieldData["card-thumnail"]?.url === "string" && (
        <div className="relative w-full h-[13.021vw] overflow-hidden">
          <Image
            src={property.fieldData["card-thumnail"]?.url}
            alt={property.fieldData["card-thumnail"]?.alt || "Property"}
            fill
            style={{ objectFit: "cover" }}
            className={`rounded-t-2xl transition-all duration-500 ${
              hover ? "scale-125" : ""
            }`}
            onClick={() => window.location.href = url}
          />
        </div>
      )}
      <div className="p-[1.042vw]">
        <div
          className={`p-[0.763vw] rounded-[0.763vw] bg-[#F4F5F7] ${
            hover ? "bg-[#d67a4533]" : ""
          } border border-[#1C3A600D]`}
        >
          <div
            className={`text-premier-blue font-ranade text-[1.185vw] font-normal ${
              hover ? "text-premier-orange" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-[0.763vw] ">
              <span
                className={`font-heebo bg-premier-blue ${
                  hover ? "bg-premier-orange" : ""
                } rounded-full text-white px-[0.535vw] py-[0.223vw] text-[0.624vw]`}
              >
                Ready
              </span>
            </div>
            {property.fieldData["property-price-2"] && formatPrice(property.fieldData["property-price-2"])}
            {property.fieldData["property-price-3"] && formatPrice(property.fieldData["property-price-3"])}
          </div>
        </div>
        <div className="px-[0.338vw]">
          <h3 className="text-[1.042vw] font-medium mb-2 mt-6 text-premier-blue">
            {property.fieldData["card-title"]}
          </h3>
          <div className="flex justify-between items-center">
            <span className="font-normal text-[0.833vw] text-[#677B94]">
              {property.fieldData["property-location-name"]}
            </span>
          </div>
        </div>
      </div>
      {onDelete && (
        <button
          onClick={() => onDelete(property.fieldData.slug)}
          className="my-[1.042vw] mx-[0.885vw] text-red-600 hover:text-red-800 absolute top-0 right-0"
        >
          <Cancel />
        </button>
      )}
    </div>
  );
}
