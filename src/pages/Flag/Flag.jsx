import React from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowLeft } from 'react-icons/fa';

const Flag = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className='border-2 mt-2 rounded'>
      <div className="flex justify-between font-title bg-[#2C3E50] px-3 py-2 rounded-md">
        <div className="flex justify-center items-center gap-5">
          <p className="text-[#ffffff] font-title text-3xl font-bold flex items-center gap-3">
            <FaArrowLeft />
            Flag User
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="px-5 py-8 p-6 bg-white min-h-screen">
        <div className="mb-4">
          <label className="block text-[#2C3E50] font-semibold mb-2">Flag Notice</label>
          <input
            type="text"
            placeholder="Enter a brief subject"
            {...register("subject", { required: "Subject is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
          />
          {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-[#2C3E50] font-semibold mb-2">Detailed Message</label>
          <textarea
            placeholder="Describe your issue or question  "
            {...register("message", { required: "Message is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
          />
          {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-[#2C3E50] font-semibold mb-2">Attach File</label>
          <input
            type="file"
            
            {...register("file")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
          />
        </div>

        <div className="flex gap-5  w-full mt-16">
          <button type="button" className="px-6 py-2 w-1/2 bg-gray-300 text-black rounded-md">
            Cancel
          </button>
          <button type="submit" className="px-6 py-2 w-1/2 bg-blue-500 text-white rounded-md">
            Send Flag
          </button>
        </div>
      </form>
    </div>
  );
};

export default Flag;
