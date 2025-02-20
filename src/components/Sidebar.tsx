import Image from "next/image";
import Link from "next/link";
import React from "react";

const Sidebar = ({
  handleLogout,
  setTab,
  tab,
}: {
  handleLogout: () => void;
  setTab: (tab: string) => void;
  tab: string;
}) => {
  return (
   
      <div className="w-[20vw] bg-blue-900 h-screen p-20 text-white font-sans">
        <Image src="/images/logo.png" alt="logo" width={100} height={100} />
        <ul className="flex flex-col gap-2 mt-16">
          <li className="mb-2">
            <Link
              href={"https://www.premierproperties.ae/"}
              className="block font-semibold px-4 py-2 rounded hover:bg-blue-700"
            >
              Home
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="#"
              onClick={() => setTab("profile")}
              className={`block font-semibold px-4 py-2 rounded hover:bg-blue-700 ${tab === "profile" ? "bg-white text-blue-900 hover:bg-blue-100"  : ""}`}
            >
          Profile
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="#"
              onClick={() => setTab("saved")}
              className={`block font-semibold px-4  py-2 rounded hover:bg-blue-700 ${tab === "saved" ? "bg-white text-blue-900 hover:bg-blue-100" : ""}`}
            >
                Saved 
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="#"
              onClick={handleLogout}
              className="block font-semibold px-4  py-2 rounded hover:bg-blue-700"
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
   
  );
};

export default Sidebar;
