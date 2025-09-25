import { FaArrowLeft } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useAddFeesMutation,
  useGetAllFeesQuery,
} from "../../redux/feature/membership/membershipApi";
import { message } from "antd";

// ================= Fee Section Component =================
const FeeSection = ({ data, onSubmit }) => {
  const { yearlyValue, monthlyValue, label } = data;

  const [monthlyValues, setMonthlyValues] = useState(monthlyValue);
  const [yearlyValues, setYearlyValues] = useState(yearlyValue);

  // Increment / Decrement handlers
  const handleMonthlyIncrement = () => setMonthlyValues((prev) => prev + 1);
  const handleMonthlyDecrement = () =>
    setMonthlyValues((prev) => (prev > 0 ? prev - 1 : 0));

  const handleYearlyIncrement = () => setYearlyValues((prev) => prev + 1);
  const handleYearlyDecrement = () =>
    setYearlyValues((prev) => (prev > 0 ? prev - 1 : 0));

  // Reset to default API values
  const resetValue = () => {
    setMonthlyValues(monthlyValue);
    setYearlyValues(yearlyValue);
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      label,
      monthlyValue:monthlyValues,
      yearlyValue:yearlyValues,


    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{label}</h2>

      <div className="flex justify-between mb-6">
        {/* Monthly */}
        <div className="flex flex-col">
          <span className="text-sm text-gray-600 mb-1">Monthly: {monthlyValues}</span>
          <div className="flex items-center gap-3">
            <button type="button" onClick={handleMonthlyDecrement} className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full">
              <AiOutlineMinus className="text-gray-600 text-sm" />
            </button>
            <span className="text-lg font-medium text-gray-900 min-w-[2rem] text-center">{monthlyValues}</span>
            <button type="button" onClick={handleMonthlyIncrement} className="w-8 h-8 flex items-center justify-center bg-green-50 hover:bg-green-100 rounded-full">
              <AiOutlinePlus className="text-green-500 text-sm" />
            </button>
          </div>
        </div>

        {/* Yearly */}
        <div className="flex flex-col">
          <span className="text-sm text-gray-600 mb-1">Annually: {yearlyValues}</span>
          <div className="flex items-center gap-3">
            <button type="button" onClick={handleYearlyDecrement} className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full">
              <AiOutlineMinus className="text-gray-600 text-sm" />
            </button>
            <span className="text-lg font-medium text-gray-900 min-w-[2rem] text-center">{yearlyValues}</span>
            <button type="button" onClick={handleYearlyIncrement} className="w-8 h-8 flex items-center justify-center bg-green-50 hover:bg-green-100 rounded-full">
              <AiOutlinePlus className="text-green-500 text-sm" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button type="submit" className="flex-1 px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-blue-700 rounded-md hover:bg-blue-50 transition-colors">Submit Fee</button>
        <button type="button" onClick={resetValue} className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 transition-colors">Reset to default</button>
      </div>
    </form>
  );
};
// ================= Manage Fees Component =================
const ManageFees = () => {
  const [addFee] = useAddFeesMutation();
  const { data: allPrices, refetch } = useGetAllFeesQuery(undefined);

  const handleSubmit = async (data) => {
    console.log("data for submit--------->",data);
    try {
      const res = await addFee(data).unwrap();
      if (res?.success) {
        message.success(res?.message);
        refetch();
      } else {
        message.error(res?.message);
      }
    } catch (error) {
      console.log("submit error", error);
      message.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="flex justify-between font-title bg-[#2C3E50] px-3 py-2 rounded-md">
        <div className="flex justify-center items-center gap-5">
          <p className="text-[#ffffff] font-title text-3xl font-bold flex items-center gap-3">
            <Link to="/membership">
              <FaArrowLeft />
            </Link>
            Membership Fees
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl">
          {allPrices?.data?.map((data, idx) => (
            <FeeSection key={idx} data={data} onSubmit={handleSubmit} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageFees;
