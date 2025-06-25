import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";


const CreateBlog = () => {
      const [title, setTitle] = useState('');
  const [category, setCategory] = useState('News');
  const [coverImage, setCoverImage] = useState(null);
  const [content, setContent] = useState('');

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handlePublish = () => {
    // Logic to handle publishing the blog
    console.log({ title, category, coverImage, content });
  };
    return (
        <div>
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
       <div className=" mx-auto p-8 space-y-6 bg-white rounded-lg ">
      <div>
        <label htmlFor="title" className="block text-gray-700 font-medium">Blog Title</label>
        <input
          type="text"
          id="title"
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
          placeholder="demo blog name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-gray-700 font-medium">Category</label>
        <select
          id="category"
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="News">News</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
      </div>

      <div>
        <label htmlFor="coverImage" className="block text-gray-700 font-medium">Upload Cover Image</label>
        <input
          type="file"
          id="coverImage"
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
          accept="image/jpeg, image/png"
          onChange={handleFileChange}
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-gray-700 font-medium">Content</label>
        <textarea
          id="content"
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
          rows="6"
          placeholder="Write your content here"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="flex gap-8">
        <button
          type="button"
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg"
          onClick={() => console.log("Canceled")}
        >
          Cancel
        </button>
        <button
          type="button"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg"
          onClick={handlePublish}
        >
          Publish Blog
        </button>
      </div>
    </div>
        </div>
    );
};

export default CreateBlog;