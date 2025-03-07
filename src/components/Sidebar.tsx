import Link from "next/link";
import React, { useState } from "react";
import Logo from "../../public/images/logo";
import ReturnToWebsite from "../../public/icons/ReturnToWebsite";
import Profile from "../../public/icons/Profile";
import Logout from "../../public/icons/Logout";
import Dashboard from "../../public/icons/Dashboard";
import LogoutModal from "./Modals/LogoutModal";


const Sidebar = ({
  handleLogout,
  setTab,
  tab,
}: {
  handleLogout: () => void;
  setTab: (tab: string) => void;
  tab: string;
}) => {

  const [hoverStates, setHoverStates] = useState({
    website: false,
    dashboard: false,
    profile: false,
    logout: false
  });

  const [open, setOpen] = useState(false);

  return (
   
      <div className="fixed top-0 left-0 w-[18.177vw] bg-premier-blue h-screen p-[4.167vw] text-[#B9C2CE] font-normal z-10">
        <Logo  /> 
        <ul className="flex flex-col gap-2 mt-[4.167vw]">
          <li className="mb-2">
            <Link
              href={"https://www.premierproperties.ae/"}
              className="px-4 py-2 text-[0.833vw] rounded hover:text-white text-nowrap flex items-center gap-[1.302vw] "
              onClick={() => setTab("Return to Website")}
              onMouseEnter={() => setHoverStates({ ...hoverStates, website: true })}
              onMouseLeave={() => setHoverStates({ ...hoverStates, website: false })}
            >
              <ReturnToWebsite active={tab === "Return to Website"} hover={hoverStates.website} />
              Return to Website
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="#"
              onClick={() => setTab("dashboard")}
              className={`px-4  py-2 text-[0.833vw] rounded flex items-center gap-[1.302vw] hover:text-white ${tab === "dashboard" ? "text-white font-semibold" : ""}`}
              onMouseEnter={() => setHoverStates({ ...hoverStates, dashboard: true })}
                onMouseLeave={() => setHoverStates({ ...hoverStates, dashboard: false })}
            >
                <Dashboard active={tab === "dashboard"} hover={hoverStates.dashboard} />
                Dashboard
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="#"
              onClick={() => setTab("profile")}
              className={`px-4 py-2 text-[0.833vw] rounded flex items-center gap-[1.302vw] hover:text-white ${tab === "profile" ? "text-white font-semibold" : ""}`} 
              onMouseEnter={() => setHoverStates({ ...hoverStates, profile: true })}
                onMouseLeave={() => setHoverStates({ ...hoverStates, profile: false })}
            >

                <Profile active={tab === "profile"} hover={hoverStates.profile} />
          Profile
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="#"
              onClick={() => setOpen(true)}
              className="px-4 py-2 text-[0.833vw] rounded flex items-center gap-[1.302vw] hover:text-white"
              onMouseEnter={() => setHoverStates({ ...hoverStates, logout: true })}   
              onMouseLeave={() => setHoverStates({ ...hoverStates, logout: false })}
            >
              <Logout active={tab === "logout"} hover={hoverStates.logout} />
              Logout
            </Link>
            {open && <LogoutModal open={open} setOpen={setOpen} handleLogout={handleLogout} />}
          </li>
        </ul>
      </div>
   
  );
};

export default Sidebar;
