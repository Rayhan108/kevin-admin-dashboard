import { Link, useNavigate } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { Badge } from "antd";
import { GiHamburgerMenu } from "react-icons/gi";
const MainHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <div className="relative font-title mr-5 ">
      <header className=" bg-[#ffffff] shadow-2xl rounded-xl mt-5 border-2">
        <div className="flex justify-between items-center px-5 md:px-10 h-[80px]">
          <div>
            <GiHamburgerMenu className="text-3xl text-black" />
          </div>
          <div className="flex gap-5 items-center">
            {/* <div>
              <Link to={"/notification"}>
                <Badge count={5}>
                  <IoIosNotificationsOutline className="text-black  bg-white rounded-full border border-black w-8 h-8 p-1 text-4xl" />
                </Badge>
              </Link>
            </div> */}
            <div
              onClick={() => navigate("/setting/updateProfile")}
              className="flex items-center gap-2  px-5 py-2 "
            >
              <FaRegUser className="text-black border border-black bg-white rounded-full w-9 h-9 p-2 text-4xl" />
            </div>
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default MainHeader;
