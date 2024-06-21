import {
  IoHomeOutline,
  IoSettingsOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FaMoneyBillAlt } from "react-icons/fa";
import { Icon as IconComponent } from "./Icon";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();
  const [activeIcon, setActiveIcon] = useState("home");

  const handleIconClick = (name) => {
    setActiveIcon(name.toLowerCase());
    if (name !== "Home") {
      navigate(`/${name.toLowerCase()}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col justify-between border-e bg-white w-16">
        <div>
          <div className="inline-flex size-16 items-center justify-center">
            <span className="grid size-20 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
              IB
            </span>
          </div>

          <div className="border-t border-gray-100">
            <div className="px-2">
              <div className="py-4">
                <IconComponent
                  icon={IoHomeOutline}
                  name="Home"
                  active={activeIcon === "home"}
                  onClick={() => handleIconClick("Home")}
                />
              </div>

              <ul className="space-y-1 border-t border-gray-100 pt-4">
                <li>
                  <IconComponent
                    icon={MdOutlineAccountCircle}
                    name="Account"
                    active={activeIcon === "account"}
                    onClick={() => handleIconClick("Account")}
                  />
                </li>
                <li>
                  <IconComponent
                    icon={FaMoneyBillAlt}
                    name="Transfer"
                    active={activeIcon === "transfer money"}
                    onClick={() => handleIconClick("Transfer money")}
                  />
                </li>
                <li>
                  <IconComponent
                    icon={IoSettingsOutline}
                    name="Settings"
                    active={activeIcon === "settings"}
                    onClick={() => handleIconClick("Settings")}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2 z-10">
          <form action="#">
            <IconComponent
              icon={IoLogOutOutline}
              name="Logout"
              active={activeIcon === "logout"}
              onClick={() => handleIconClick("Logout")}
            />
          </form>
        </div>
      </div>
      <div className="flex-grow p-4">
        <Outlet />
      </div>
    </div>
  );
};
