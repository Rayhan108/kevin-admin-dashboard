
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import backgroundImg from '../../assets/bgImg.jpg';
import logo from '../../assets/YL 2.png';
import { message } from 'antd';
import { useSendOtpMutation, useVerifyOtpMutation } from '../../redux/feature/auth/authApi';
import { useState } from 'react';
export default function Verify() {
  const navigate = useNavigate()
      const [email, setEmail] = useState("");
      const [sendOtp] =useSendOtpMutation()
  const { register, handleSubmit,
    //  watch
     } = useForm({
    mode: 'onChange',
  });
  const [verifyOtp] = useVerifyOtpMutation();
 const onSubmit = async (data) => {
    const verifyCode = `${data.digit1}${data.digit2}${data.digit3}${data.digit4}${data.digit5}${data.digit6}`;

    console.log(data);
    const modifiedData = {
      email: data?.email,
      otp: verifyCode,
    };
    console.log("verify otp data--->", modifiedData);
    // handle code verification here
    try {
  
      const res = await verifyOtp(modifiedData).unwrap();
      console.log("verify otp response--->", res);
      if (res?.success) {
        message.success(res?.message);
        navigate("/passReset");
      } else {
        message.error(res?.message);
      }
    } catch (error) {
      message.error(error?.data?.message);
    }
  };

  const handleResendOtp = async () => {
        if (!email) {
      message.error("Please enter your email before requesting a resend.");
      return;
    }
    const data = {
      email: email,
    };
    try {
      const res = await sendOtp(data).unwrap();
      if (res?.success) {
        message.success(res?.message);
      } else {
        message.error(res?.message);
      }
    } catch (error) {
      message.error(error?.data?.message);
    }
  };

  return (
  <div className="relative h-screen w-full text-black">
      {/* Background Image */}
      <img
        src={backgroundImg}
        alt="Background"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16">
        {/* Forgot Password Box */}
        <div className="bg-white bg-opacity-70 px-8 py-6 sm:px-16 sm:py-10 md:px-24 md:py-12 rounded-md shadow-md max-w-full  text-center">
          {/* Logo and Title */}
          <div className="flex items-center justify-center mb-6 space-x-2">
            <img
              src={logo}
              alt="Logo"
              width={120}
              height={60}
              className="sm:w-32 sm:h-16 md:w-44 md:h-22"
            />
            <div className="text-blue-600 font-semibold text-lg sm:text-2xl md:text-3xl lg:text-4xl">
              Your Trade Source
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-black font-bold text-xl sm:text-2xl mb-3 text-left">
         Verify OTP
          </h2>
          <p className="text-black text-sm mb-5 text-left">
            Please check your email. We have sent a code to contact @gmail.com
          </p>

          <form
        className="flex flex-col w-full mb-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Email input */}
        <input
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            pattern: /^[^@]+@[^@]+\.[^@]+$/,
          })}
     onChange={(e) => setEmail(e.target.value)} 
          className="w-full h-10 mb-4 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
        />

        {/* OTP input */}
        <div className="flex justify-between w-full mb-6">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              {...register(`digit${i + 1}`, {
                required: true,
                pattern: /^[0-9]$/,
              })}
              className="w-10 h-10 border border-gray-300 rounded-md text-center text-lg focus:outline-none focus:border-blue-600"
              inputMode="numeric"
            />
          ))}
        </div>

        {/* Submit button */}

    


 <div className='flex justify-between items-center'>
     <div>
        <p className="text-xs text-black">
   Didn’t receive code?
        </p>
  </div>
  <div>
          <button
          type="button"
          className="text-blue-600 underline"
          onClick={() => handleResendOtp()}
        >
          Resend
        </button>
  </div>
  
 </div>
    
      <button
        type="submit"
        onClick={handleSubmit(onSubmit)}
        className="bg-blue-600 text-white text-sm rounded-md mt-3 px-5 py-2 w-full mb-4"
      >
        Send Code
      </button>
        </form>
        </div>
      </div>
    </div>
  );
}
