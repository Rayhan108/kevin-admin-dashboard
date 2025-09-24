
import { useForm } from "react-hook-form";
import { useChangePasswordMutation } from "../../redux/feature/auth/authApi";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/feature/auth/authSlice";

const PassChange = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },

  } = useForm();
  const dispatch=useDispatch()
const [changePass]=useChangePasswordMutation()
  // Submit handler
  const onSubmit = async(data) => {
    console.log("Form Data:", data);
  try {
      const res = await changePass(data).unwrap();
      if (res.success) {
        message.success(res.message);
       dispatch(logout())
      }
    } catch (error) {
      message.error(error?.data?.message || 'Something went wrong');
      console.error('Error:', error);
    }

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Current Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Password
        </label>
        <input
          type="password"
          {...register("oldPassword", {
            required: "Current password is required",
          })}
          className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          placeholder="Enter current password"
        />
        {errors.oldPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.oldPassword.message}</p>
        )}
      </div>

      {/* New Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          New Password
        </label>
        <input
          type="password"
          {...register("newPassword", {
            required: "New password is required",
          })}
          className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          placeholder="Enter new password"
        />
        {errors.newPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
      >
        Change Password
      </button>
    </form>
  );
};

export default PassChange;
