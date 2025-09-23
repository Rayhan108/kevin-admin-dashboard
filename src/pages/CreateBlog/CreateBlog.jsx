import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCreateBlogsMutation } from "../../redux/feature/others/othersApi";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/feature/auth/authSlice";
import { message } from "antd";

const CreateBlog = () => {
  const { register, handleSubmit, reset } = useForm();
  const user = useAppSelector(selectCurrentUser);
  const [createBlog] = useCreateBlogsMutation();

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append(
      "data",
      JSON.stringify({
        user: user?.userId,
        title: data?.title,
        content: data?.content,
        isFeatured: data?.isFeatured || false,
        isPopular: data?.isPopular || false,
      })
    );

    if (data?.coverImage?.[0]) {
      formData.append("image", data.coverImage[0]);
    }

    try {
      const res = await createBlog(formData);
      if (res.data) {
        message.success(res?.data?.message);
        reset();
      } else {
        const errorMessage =
          res.error && "data" in res.error && res.error.data?.message
            ? res.error.data.message
            : res.error?.message || "An error occurred";
        message.error(errorMessage);
      }
    } catch (error) {
      message.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="p-4 md:p-8">
      {/* Header Section */}
      <div className="flex justify-between font-title bg-[#2C3E50] px-3 py-2 rounded-md items-center">
        <div className="flex items-center gap-3">
          <Link to="/blogs" className="text-white hover:text-gray-300">
            <FaArrowLeft size={20} />
          </Link>
          <p className="text-white font-title text-xl md:text-3xl font-bold">
            Create Blog
          </p>
        </div>
        <Link to="/blogs/createBlogs">
          <button className="bg-white text-black px-4 py-2 rounded-md font-semibold shadow hover:bg-gray-200 transition">
            + Create Blog
          </button>
        </Link>
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 p-6 md:p-8 space-y-6 bg-white shadow rounded-lg "
      >
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            className="p-3 w-full border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter blog title"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label
            htmlFor="coverImage"
            className="block text-gray-700 font-medium mb-2"
          >
            Upload Cover Image
          </label>
          <input
            type="file"
            id="coverImage"
            {...register("coverImage")}
            className="p-2 w-full border text-black border-gray-300 rounded-lg"
            accept="image/jpeg, image/png"
          />
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="content"
            className="block text-gray-700 font-medium mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            {...register("content")}
            className="p-3 w-full text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            rows="6"
            placeholder="Write your content here..."
          />
        </div>

        {/* Options (isFeatured, isPopular) */}
        <div className="flex flex-col md:flex-row gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("isFeatured")}
              className="w-5 h-5 accent-blue-600"
            />
            <span className="text-gray-700 font-medium">Featured Blog</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("isPopular")}
              className="w-5 h-5 accent-green-600"
            />
            <span className="text-gray-700 font-medium">Popular Blog</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-end">
          <Link to={'/blogs'}>
          <button
            type="button"
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
            onClick={() => reset()}
          >
            Cancel
          </button>
          </Link>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Publish Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
