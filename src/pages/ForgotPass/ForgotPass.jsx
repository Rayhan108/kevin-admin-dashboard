

import { useForm } from 'react-hook-form';

import backgroundImg from '../../assets/bgImg.jpg';
import logo from '../../assets/YL 2.png';
import { useNavigate } from 'react-router-dom';
import { useSendOtpMutation } from '../../redux/feature/auth/authApi';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { setEmail } from '../../redux/feature/auth/authSlice';


const Forgotpass = () => {
const [sendOtp] =useSendOtpMutation()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
const navigate = useNavigate();
  const onSubmit = async(data) => {
    console.log('Form Data:', data);
    const email = data?.email
   dispatch(setEmail({email: email}))
       try {
      const res = await sendOtp(data).unwrap()

      console.log("response------->",res);
 
      if(res?.success){
        message.success(res?.message)
 
        navigate('/verify')
      }else{
        message.error(res?.message)
   
      }
    } catch (error) {
      console.log("login error",error)
         message.error(error?.data?.message)
        
    }

    // Handle reset code sending logic here
  };

  return (
    <div className="relative h-screen w-full">
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
            Forgot Password
          </h2>
          <p className="text-black text-sm mb-5 text-left">
            Enter your email address to get a verification code for resetting your password.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <input
                type="email"
                placeholder="Email"
                {...register('email', {
                  required: 'Email is Required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email format',
                  },
                })}
                className="w-full p-2.5 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
            >
              Send Code
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgotpass;
