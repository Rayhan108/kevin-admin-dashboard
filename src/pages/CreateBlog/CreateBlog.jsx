import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const CreateBlog = () => {
  const { register, handleSubmit, reset } = useForm();

  const handlePublish = (data) => {
    // File আলাদা ভাবে নিতে হবে
    const blogData = {
      title: data.title,
      content: data.content,
      coverImage: data.coverImage[0], // file input array হিসেবে আসে
    };
    console.log("Form Data:", blogData);
  };

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between font-title bg-[#2C3E50] px-3 py-2 rounded-md">
        <div className="flex justify-center items-center gap-5">
          <Link to="/blogs">
            <FaArrowLeft />
          </Link>
          <p className="text-[#ffffff] font-title text-3xl font-bold">Blogs</p>
        </div>
        <div className="flex gap-5">
          <div className="relative w-full">
            <Link to="/blogs/createBlogs">
              <button className="bg-white text-black px-3 py-1 rounded-md">
                + Create Blog
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit(handlePublish)}
        className="mx-auto p-8 space-y-6 rounded-lg"
      >
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium"
          >
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg text-black"
            placeholder="demo blog name"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label
            htmlFor="coverImage"
            className="block text-gray-700 font-medium"
          >
            Upload Cover Image
          </label>
          <input
            type="file"
            id="coverImage"
            {...register("coverImage")}
            className="mt-2 p-3 w-full border text-black border-gray-300 rounded-lg"
            accept="image/jpeg, image/png"
          />
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="content"
            className="block text-gray-700 font-medium"
          >
            Content
          </label>
          <textarea
            id="content"
            {...register("content")}
            className="mt-2 p-3 w-full text-black border border-gray-300 rounded-lg"
            rows="6"
            placeholder="Write your content here"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-8">
          <button
            type="button"
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg"
            onClick={() => reset()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg"
          >
            Publish Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
