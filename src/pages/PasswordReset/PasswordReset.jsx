"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { LuEyeOff } from "react-icons/lu"
import { MdOutlineRemoveRedEye } from "react-icons/md"
import backgroundImg from '../../assets/bgImg.jpg';
import logo from '../../assets/YL 2.png';
import { useNavigate } from "react-router-dom"

import { message } from "antd"
import { useResetPassMutation } from "../../redux/feature/auth/authApi"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../../redux/hooks"
import { clearEmail, selectCurrentEmail } from "../../redux/feature/auth/authSlice"

const PasswordReset = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const dispatch = useDispatch();
  const email = useAppSelector(selectCurrentEmail);

  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm()

    const [resetPassword] = useResetPassMutation();
const navigate = useNavigate();
  const onSubmit = async (data) => {
    const payload = {
      ...data,email
    }
    try {
   
      const res = await resetPassword(payload).unwrap();
      console.log("reset pass response--->", res);
      if (res?.success) {
        message.success(res?.message);
dispatch(clearEmail())
        navigate("/sign-in");
      } else {
        message.error(res?.message);

      }
    } catch (error) {
      message.error(error?.data?.message);

    }
  }

  const togglePasswordVisibility = (field) => {
    switch (field) {
      case "current":
        setShowCurrentPassword(!showCurrentPassword)
        break
      case "new":
        setShowNewPassword(!showNewPassword)
        break

      default:
        break
    }
  }

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
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Current Password */}
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                {...register("oldPassword", {
                  required: "Current password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="*********"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => togglePasswordVisibility("current")}
              >
                {showCurrentPassword ? (
                  <LuEyeOff  className="h-5 w-5 text-gray-400" />
                ) : (
                  <MdOutlineRemoveRedEye  className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.oldPassword && <p className="mt-1 text-sm text-red-600">{errors.oldPassword.message}</p>}
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
            
                })}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="*********"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => togglePasswordVisibility("new")}
              >
                {showNewPassword ? (
                  <LuEyeOff  className="h-5 w-5 text-gray-400" />
                ) : (
                  <MdOutlineRemoveRedEye  className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>}
          </div>

    

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isSubmitting ? "Updating..." : "Send Code"}
            </button>
          </div>
        </form>

        </div>
      </div>
    </div>
  )
}

export default PasswordReset
