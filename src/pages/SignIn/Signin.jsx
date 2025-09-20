
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import backgroundImg from '../../assets/bgImg.jpg';
import logo from '../../assets/YL 2.png';

import {  AiOutlineEyeInvisible } from 'react-icons/ai';
import { RiEyeCloseLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../redux/feature/auth/authApi';
import { verifyToken } from '../../utils/VerifyToken';
import { message } from 'antd';
import { setUser } from '../../redux/feature/auth/authSlice';


const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()
const [login]=useLoginMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
const navigate = useNavigate();
  const onSubmit = async(data) => {
    console.log('Form Data:', data);
    // Handle sign-in logic here
       try {
      const res = await login(data).unwrap()
      const user = verifyToken(res.data.accessToken);
      console.log("response------->",res);
      if(res?.success){
        message.success(res?.message)
  
        dispatch(setUser({user: user, token: res.data.accessToken }))
        navigate('/')
      }else{
        message.error(res?.message)

      }
    } catch (error) {
      console.log("login error",error)
         message.error(error?.data?.message)

    }

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
        {/* Login Box */}
        <div className="bg-white bg-opacity-70 px-8 py-6 sm:px-16 sm:py-10 md:px-24 md:py-12 rounded-md shadow-md  max-w-full text-center">
          {/* Logo and Title */}
          <div className="flex items-center justify-center mb-6 space-x-2">
            <img src={logo} alt="Logo"  className="sm:w-32 sm:h-16 md:w-44 md:h-22" />
            <div className="text-blue-600 font-semibold text-lg sm:text-2xl md:text-3xl lg:text-4xl">
              Your Trade Source
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <input
                type="email"
                placeholder="Email"
                {...register('email', {
                  required: 'Email is required',
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

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                {...register('password', { required: 'Password is required' })}
                className="w-full p-2.5 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <AiOutlineEyeInvisible size={22} /> : <RiEyeCloseLine  size={22} />}
              </button>
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Remember and Forgot */}
            <div className="flex items-center justify-between text-sm text-left">
              <label className="flex items-center space-x-2 select-none">
                <input type="checkbox" {...register('remember')} className="w-4 h-4" />
                <span>Remember password</span>
              </label>
              <Link to="/forget-password" className="text-blue-600 hover:underline">Forgot password?</Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Signin;
