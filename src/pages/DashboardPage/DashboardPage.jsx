/* eslint-disable no-unused-vars */

import { useState } from "react";
import dayjs from "dayjs";

import { SlArrowLeft } from "react-icons/sl";
import Overview from "../../components/Overview/Overview";
import PracticeSession from "../../components/PracticeSession/PracticeSession";
import RecentActivity from "../../components/RecentActivity/RecentActivity";
import Question from "../../components/RecentActivity/Question";
import { ConfigProvider } from "antd";
import UserTable from "../../components/RecentActivity/UserTable";



function DashboardPage() {
  const currentYear = dayjs().year();
  const startYear = 1900;
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isOpen, setIsOpen] = useState(false);

  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => startYear + index
  );

  const handleSelect = (year) => {
    setSelectedYear(year);
    setIsOpen(false);
  };

  return (
    <div className=" container mx-auto font-title mb-5">
        <div className="flex justify-between my-2"> 
 
        </div>
      <div className="flex flex-col justify-between items-center pt-0 mt-0 mb-1">

      </div>
      {/* main content */}
      <Overview />
      <PracticeSession/>
      <div className=" w-[100%]">
     
            <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
        },
        components: {
          Table: {
            headerBg: "#2C3E50",
            headerColor: "#ffffff",
          },
        },
      }}
    >
      <div className="App" style={{ minHeight: "", backgroundColor: "#f5f5f5" }}>
        <UserTable />
      </div>
    </ConfigProvider>
    
      </div>
    </div>
  );
}

export default DashboardPage;
