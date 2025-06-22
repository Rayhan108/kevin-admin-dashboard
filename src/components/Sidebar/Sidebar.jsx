import { Link, useLocation } from "react-router-dom";
import { FaCarAlt, FaHome, FaRegBookmark, FaRegUser, FaUsers } from "react-icons/fa";
import { IoMdInformationCircleOutline, IoMdSettings } from "react-icons/io";
import { IoArrowRedoCircleSharp, IoCloseSharp } from "react-icons/io5";
import { MdCategory, MdOutlineEditRoad, MdOutlinePayment, MdOutlinePrivacyTip } from "react-icons/md";
import { GoDeviceCameraVideo } from "react-icons/go";
import { SlArrowDown, SlBadge } from "react-icons/sl";
import { RiFeedbackLine, RiLogoutCircleLine } from "react-icons/ri";
import { SiSimpleanalytics } from "react-icons/si";
import { CgMail } from "react-icons/cg";
import { useState } from "react";
import logo from "../../assets/navLogo.png";
import { RxDashboard } from "react-icons/rx";
import { FaCalendarDays } from "react-icons/fa6";
import { GiProgression } from "react-icons/gi";
import { TbLogs } from "react-icons/tb";
import { VscFeedback } from "react-icons/vsc";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
const user = false;
  const routes = [
    {
      path: "/",
      label: "Dashboard",
      icon: <RxDashboard  className="w-5 h-5" />,
    },
    {
      path: "/userManagement",
      label: "User",
      icon: <FaUsers  className="w-5 h-5" />,
    },
    {
      path: "/booking",
      label: "Booking",
      icon: <FaCalendarDays  className="w-5 h-5" />,
    },
    {
      path: "/membership",
      label: "Membership",
      icon: <SlBadge  className="w-5 h-5" />,
    },
    {
      path: "/earnings",
      label: "Earnings",
      icon: <GiProgression  className="w-5 h-5" />,
    },
    {
      path: "/categories",
      label: "Categories",
      icon: <MdCategory  className="w-5 h-5" />,
    },
    {
      path: "/blogs",
      label: "Blogs",
      icon: <TbLogs  className="w-5 h-5" />,
    },
    {
      path: "/feedback",
      label: "Feedback",
      icon: <VscFeedback  className="w-5 h-5" />,
    },
    // {
    //   path: "/feedback",
    //   label: "Settings",
    //   icon: <RiFeedbackLine className="w-5 h-5" />,
    // },
  
  ];

  const settingsRoutes = [
    {
      path: "/setting/updateProfile",
      label: "Profile",
      icon: <IoMdInformationCircleOutline className="w-5 h-5 text-lg" />,
    },
    {
      path: "/setting/terms",
      label: "Terms and Condition",
      icon: <FaRegBookmark className="w-5 h-5 text-lg" />,
    },
    {
      path: "/setting/privacy",
      label: "Privacy Policy",
      icon: <MdOutlinePrivacyTip className="w-5 h-5 text-lg" />,
    },
  ];

  const isActive = (path) => currentPath === path;
  const isSettingsActive = currentPath.startsWith("/setting");
  const toggleSettingsDropdown = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <div
      className={`shadow-2xl rounded-xl border-2 m-5 fixed lg:static bg-[#FFFFFF] text-black w-[70%] sm:w-[70%] md:w-[15%] lg:w-[20%] p-5  overflow-y-auto  z-50 transition-transform font-title ${
        isOpen ? "translate-x-0 top-0 left-0 " : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 lg:hidden text-black  focus:outline-none p-2 rounded-full"
      >
        <IoCloseSharp/>
      </button>

      <div className="flex justify-center items-center mb-7">
        <img src={logo} className="w-44 mb-3 mt-3" />
      </div>
      
      <ul className="-mt-2 pl-5 text-[10px]">
        {routes.map(({ path, label, icon }) => (
          <Link to={path} className="flex justify-between" key={path}>
            {/* {isActive(path) && (
              <div className="bg-[#1D69E1] w-[3%] h-14 ml-0 -left-8 mt-5 relative"></div>
            )} */}
            <li
              className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out w-[98%] ${
                isActive(path)
                  ? "bg-[#1D69E1] text-white px-3 py-3 rounded-2xl"
                  : ""
              }`}
            >
              {icon}
              <p className="text-lg">{label}</p>
            </li>
          </Link>
        ))}

        {/* Settings Dropdown */}
        <div className="relative mt-3">
          <button
            onClick={toggleSettingsDropdown}
            className={`flex w-full justify-between items-center gap-2 mt-1 cursor-pointer transition-all duration-300 ease-in-out ${
              isSettingsActive ? "bg-[#F3F3F3] text-black px-3 pb-2 rounded-2xl" : ""
            } relative`}
          >
            {isSettingsActive && (
              <div
                className="bg-[#F3F3F3] w-[3%] -left-6 top-0 absolute h-14"
                style={{ transform: "translateX(-100%)" }}
              ></div>
            )}
            <li className="flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out w-[98%]">
              <IoMdSettings className="w-5 h-5 " />
              <p className="text-lg">Settings</p>
              <SlArrowDown className={`w-5 h-5 text-right ml-5 hover:-rotate-90 ${isSettingsActive ? "bg-[#F3F3F3] text-black" : "text-black"}`} />
            </li>
          </button>
        </div>

        {/* Settings Submenu */}
        {isSettingsOpen && (
          <ul className="text-right">
            {settingsRoutes.map(({ path, label, icon }) => (
              <Link to={path} key={path}>
                <li
                  className={`flex items-center gap-2 transition-all duration-300 ease-in-out mb-5 mt-5 ${
                    isActive(path) ? "pl-3 pr-5 py-[14px] rounded-2xl bg-[#F3F3F3] text-black" : ""
                  }`}
                >
                  {icon}
                  <p className="text-lg">{label}</p>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </ul>

      {/* Logout Button */}
      <div className="absolute bottom-5 w-[90%] px-5">
        {user ? (
          <Link to="/sign-in">
            <button className="flex items-center gap-2 w-full px-0 py-3 border-2 border-black text-black rounded-xl duration-200 justify-center">
              <span className="text-lg text-title font-bold">Login</span>
            </button>
          </Link>
        ) : (
          <Link to="">
            <button className="flex items-center gap-2 w-full px-0 py-3 border-2 border-black text-black rounded-xl duration-200 justify-center">
              <RiLogoutCircleLine className="w-7 h-7 font-bold text-2xl text-white rotate-90" />
              <span className="text-lg text-title font-bold">Logout</span>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
