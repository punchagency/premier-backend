"use client";

import { IoChevronBack } from "react-icons/io5";

const ReturnToWebsite = () => {
  return (
    <span
      className="text-[0.833vw] flex items-center gap-[0.521vw] text-start self-start text-premier-blue cursor-pointer"
      onClick={() =>
        (window.location.href = "https://www.premierproperties.ae")
      }
    >
      <IoChevronBack size="1.142vw" />
      Return to Website
    </span>
  );
};

export default ReturnToWebsite;
