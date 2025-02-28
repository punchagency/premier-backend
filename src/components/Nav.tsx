
import DropdownIcon from "../../public/icons/DropdownIcon";
import { useState } from "react";

const Nav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (

        <div className="px-8 py-4">
          <div className="flex justify-end space-x-4">
            <button
              className="hover:text-premier-blue transition-colors duration-200 flex items-center gap-[0.833vw]"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              John
              <DropdownIcon active={isDropdownOpen} />
            </button>
          </div>
        </div>
  );
};

export default Nav;
