import { useState } from "react";


import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import MainHeader from "../components/MainHeader/MainHeader";



const Main = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (


    <div className="flex bg-[#F4F5F9] h-screen text-white">
      {/* Sidebar  */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <MainHeader toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto  px-2 pt-3 bg-[#F4F5F9]">
                  
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
};

export default Main;
