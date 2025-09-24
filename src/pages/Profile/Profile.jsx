import { useState, useRef, useEffect } from "react";
import { FiCamera, FiUser } from "react-icons/fi";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/feature/auth/authSlice";
import { useSpecUserQuery, useUpdateProfileMutation } from "../../redux/feature/user/userApi";
import { message } from "antd";
import { useForm } from "react-hook-form";
import PassChange from "./PassChange";

const Profile = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data: specUser, refetch } = useSpecUserQuery(user?.userId);
  const loggedUser = specUser?.data;

  const [activeTab, setActiveTab] = useState("edit");
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=120&width=120");
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const [updateUser] = useUpdateProfileMutation();

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
 
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  // Reset form values when user data loads
  useEffect(() => {
    if (loggedUser) {
      reset({
        firstName: loggedUser.firstName || "",
        lastName: loggedUser.lastName || "",
        email: loggedUser.email || "",
        phone: loggedUser.phone || "",
      });
      if (loggedUser?.image) {
        setProfileImage(loggedUser.image);
      }
    }
  }, [loggedUser, reset]);

  // Image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Handler
  const onSubmit = async (data) => {
    try {
      if (!user?.userId) {
        console.error("User ID is missing");
        return;
      }

      const form = new FormData();
      form.append("data", JSON.stringify(data));

      if (imageFile) {
        form.append("image", imageFile);
      }

      const res = await updateUser({
        id: user?.userId,
        payload: form,
      });

      if (res.error) {
        message.error("Failed to update user");
      } else {
        message.success(res?.data?.message || "Profile updated successfully!");
        refetch();
      }
    } catch (err) {
      console.error("Update error:", err);
      message.error("Server error");
    }
  };

  return (
    <div>
      <div className="flex justify-between font-title bg-[#2C3E50] px-3 py-2 rounded-md">
        <div className="flex justify-center items-center gap-5">
          <p className="text-[#ffffff] font-title text-3xl font-bold">Profile</p>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors"
              >
                <FiCamera className="w-4 h-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">
              {loggedUser?.firstName + " " + loggedUser?.lastName}
            </h2>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-gray-200 mb-8 justify-center">
            <button
              onClick={() => setActiveTab("edit")}
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                activeTab === "edit"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Edit Profile
            </button>
            <button
              onClick={() => setActiveTab("password")}
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                activeTab === "password"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Change Password
            </button>
          </div>

          {/* Form */}
            {activeTab === "edit" ? (
              <>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      {...register("firstName", { required: "First name is required" })}
                      className="w-full pl-10 pr-4 text-black py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Enter first name"
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    {...register("lastName", { required: "Last name is required" })}
                    className="w-full px-4 text-black py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter last name"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                  )}
                </div>

             
        {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none"
            >
              {activeTab === "edit" ? "Update Profile" : "Update Password"}
            </button>
          </form>
            
              </>
    
            ) : (
              <>
          
<PassChange/>
           
              </>
            )}

    
        </div>
      </div>
    </div>
  );
};

export default Profile;
