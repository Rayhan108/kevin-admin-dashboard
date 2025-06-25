import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";

const FeeSection = ({ label, defaultValue }) => {
  const [value, setValue] = useState(defaultValue);

  const handleIncrement = () => setValue(value + 1);
  const handleDecrement = () => setValue(value - 1);
  const resetValue = () => setValue(defaultValue);

  return (
    <div className="  border p-4 rounded-lg  w-full max-w-xl mt-5">
      <div className="space-y-1">
        <h2 className="text-xl font-bold">{label}</h2>
        <p className="text-gray-600">Current Value: ${value}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={handleDecrement}
          className="text-lg p-2 bg-gray-200 rounded-full"
        >
          <AiOutlineMinus />
        </button>
        <span className="text-lg">{value}</span>
        <button
          onClick={handleIncrement}
          className="text-lg p-2 bg-[#3BD89226] rounded-full"
        >
          <AiOutlinePlus className="text-[#3BD892]" />
        </button>
      </div>
      <div className="mt-8 flex gap-8">
        <button
          onClick={resetValue}
          className="text-sm  text-[#1F2D76] border border-[#1F2D76] px-4 py-2 rounded-md"
        >
               Update fee
        
        </button>
        <button className="text-sm bg-[#1F2D76] text-white px-4 py-2 rounded-md">
         Reset to default
        </button>
      </div>
    </div>
  );
};

const ManagePlatformFee = () => {
    return (
          <div className="min-h-screen  p-">
            {/* Top Navigation Bar */}
              <div className="flex justify-between font-title bg-[#2C3E50] px-3 py-2 rounded-md">
              <div className="flex justify-center items-center gap-5">
                <p className="text-[#ffffff] font-title text-3xl font-bold flex items-center gap-3">
                  <FaArrowLeft />
                 Manage Platform Fee
                </p>
              </div>
           
            </div>
    
            {/* Fee Management Sections */}
            <div className="mt-8  text-black grid grid-cols-2 ">
              <FeeSection label="Platform Fee" defaultValue={19} />
           
            </div>
          </div>
    );
};

export default ManagePlatformFee;