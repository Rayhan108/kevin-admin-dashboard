import { Modal, Pagination, Table, Tag, Input, Button } from "antd";
import { useState } from "react";
import { BiMessageDetail } from "react-icons/bi";
import { FiFlag, FiTrash2 } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import icon1 from '../../assets/icon1.png';
import icon2 from '../../assets/icon2.png';
import { RiCloseLine, RiGalleryLine } from "react-icons/ri";
import { HiX } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";

const Categories = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("main");
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const pageSize = 8;

  const mainCategoryData = [
    { id: 1, categoryName: "Handyman", categoryImage: icon1 },
    { id: 2, categoryName: "Plumber", categoryImage: icon2 },
    { id: 1, categoryName: "Handyman", categoryImage: icon1 },
    { id: 2, categoryName: "Plumber", categoryImage: icon2 },
    { id: 1, categoryName: "Handyman", categoryImage: icon1 },
    { id: 2, categoryName: "Plumber", categoryImage: icon2 },
    { id: 1, categoryName: "Handyman", categoryImage: icon1 },
    { id: 2, categoryName: "Plumber", categoryImage: icon2 },
    { id: 1, categoryName: "Handyman", categoryImage: icon1 },
    { id: 2, categoryName: "Plumber", categoryImage: icon2 },
    { id: 1, categoryName: "Handyman", categoryImage: icon1 },
    { id: 2, categoryName: "Plumber", categoryImage: icon2 },
  ];

  const subCategoryData = [
    { id: 1, categoryName: "Plumber", categoryImage: icon1 },
    { id: 2, categoryName: "Plumber", categoryImage: icon2 },
    { id: 1, categoryName: "Plumber", categoryImage: icon1 },
    { id: 2, categoryName: "Plumber", categoryImage: icon2 },
    { id: 1, categoryName: "Plumber", categoryImage: icon1 },
    { id: 2, categoryName: "Plumber", categoryImage: icon2 },
    { id: 1, categoryName: "Plumber", categoryImage: icon1 },
    { id: 2, categoryName: "Plumber", categoryImage: icon2 },
    { id: 1, categoryName: "Plumber", categoryImage: icon1 },
    { id: 2, categoryName: "Plumber", categoryImage: icon2 },
    { id: 1, categoryName: "Plumber", categoryImage: icon1 },
    { id: 2, categoryName: "Plumber", categoryImage: icon2 },
  ];

  const currentData = activeTab === "main" ? mainCategoryData : subCategoryData;

  const onChange = (page) => setCurrentPage(page);

  const handleView = (user) => {
    setCurrentUser(user);
    setIsModalVisible(true);
  };

  const handleDelete = (user) => {
    setCurrentUser(user);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    console.log("Deleted user:", currentUser);
    setIsDeleteModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsDeleteModalVisible(false);
    setIsAddCategoryModalVisible(false);
  };


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    console.log('Category Name:', categoryName);
    console.log('Category Image:', categoryImage);
  };




  const [category, setCategory] = useState('Handyman');
  const [subCategory, setSubCategory] = useState('demo category');

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubCategoryChange = (e) => {
    setSubCategory(e.target.value);
  };

  const handleEditCatSave = () => {
    // Add save logic here
    console.log('Category Saved:', category, subCategory);
  };




  return (
    <>
      <div className="flex justify-between font-title bg-[#2C3E50] px-3 py-2 rounded-md">
        <div className="flex justify-center items-center gap-5">
          <p className="text-[#ffffff] font-title text-3xl font-bold">Categories</p>
        </div>
        <div className="flex gap-5">
          <div className="relative w-full">
            <button
              className="bg-white text-black px-3 py-1 rounded-md"
              onClick={() => setIsAddCategoryModalVisible(true)}
            >
              + Add Category
            </button>
          </div>
        </div>
      </div>
      <div className="p-6 bg-white">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("main")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "main"
                ? "bg-blue-600 text-white"
                : "border border-gray-300 text-black"
            }`}
          >
            Main Service Categories
          </button>
          <button
            onClick={() => setActiveTab("sub")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "sub"
                ? "bg-blue-600 text-white"
                : "border border-gray-300 text-black"
            }`}
          >
            Sub Service Categories
          </button>
        </div>

        <Table
          columns={[
            { title: "S.ID", dataIndex: "id", key: "id", align: "center" },
            { title: "Category Name", dataIndex: "categoryName", key: "categoryName", align: "center" },
        {
              title: "Category Image/Icon",
              dataIndex: "categoryImage",
              key: "categoryImage",
              render: (image) => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img src={image} alt="Category Icon" className="w-8 h-8 rounded-full" />
                </div>
              ),
              align: "center",
            },
            {
              title: "Action",
              key: "action",
              render: (_, record) => (
                <div className="flex gap-3 justify-center text-lg">
                  <FaRegEdit
                    className="text-gray-600 cursor-pointer"
                    onClick={() => handleView(record)}
                  />
                  <FiTrash2
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(record)}
                  />
                </div>
              ),
              align: "center",
            },
          ]}
          dataSource={currentData}
          pagination={false}
          rowKey="id"
          style={{ margin: "0 auto" }} // Centers the table horizontally
        />

        <div className="mt-4 flex justify-end">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={currentData.length}
            onChange={onChange}
            showSizeChanger={false}
          />
        </div>
      </div>

      {/* Edit Category Modal */}
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
    <div className="max-w-md mx-auto p-4  rounded-lg ">
      <div className="flex items-center space-x-2">
        <span className="bg-[#2C3E50] text-white px-3 py-1 rounded-full text-sm">
          {category}
        </span>
        <RiCloseLine className="text-xl text-red-600 cursor-pointer" onClick={() => setCategory('')} />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">For Category</label>
        <div className="flex items-center border border-gray-300 rounded-md mt-2">
          <AiOutlineSearch className="text-gray-500 ml-2" />
          <input
            type="text"
            placeholder="Search the category you are looking for..."
            value={category}
            onChange={handleCategoryChange}
            className="w-full p-2 text-sm border-none focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Sub Category Name</label>
        <input
          type="text"
          value={subCategory}
          onChange={handleSubCategoryChange}
          className="w-full p-2 mt-2 border border-gray-300 rounded-md text-sm"
        />
      </div>

      <div className="mt-6 flex w-full space-x-4">
        <button
          onClick={() => console.log('Canceled')}
          className="text-gray-600 hover:text-gray-800 font-semibold w-1/2 border rounded-md border-black"
        >
          Cancel
        </button>
        <button
          onClick={handleEditCatSave}
          className="bg-purple-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-purple-700 w-1/2"
        >
          Save
        </button>
      </div>
    </div>
      </Modal>

      {/* Add Category Modal */}
      <Modal
        visible={isAddCategoryModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg ">
     
      <div className="mb-4">
        <label htmlFor="category-name" className="block text-sm font-medium text-gray-700">
          Category Name
        </label>
        <input
          type="text"
          placeholder="demo category"
          id="category-name"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="category-image" className="block text-sm font-medium text-gray-700">
          Category Image/Icon
        </label>
        <div className="mt-1 bg-[#EAECEE] p-4 flex items-center flex-col" onClick={() => document.getElementById('category-image').click()}>
          {categoryImage ? (
            <img src={categoryImage} alt="Category" className="w-12 h-12 rounded-full object-cover mr-4" />
          ) : (
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
              <span className="text-2xl"><RiGalleryLine />
</span>
            </div>
          )}
          <input
            type="file"
            id="category-image"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <button
            
            className="text-sm text-gray-600"
          >
            Upload Image
          </button>
        </div>
      </div>

      <div className="flex  w-full space-x-4">
        <button
          type="button"
          className="text-gray-600 hover:text-gray-800 font-medium w-1/2 border border-black"
          onClick={() => setCategoryName('')}
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 w-1/2"
        >
          Save
        </button>
      </div>
    </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={isDeleteModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        closable={false}
      >
        <div className="text-center px-6 py-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Do you want to Remove this user?
          </h2>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleCancel}
              className="border border-gray-400 px-5 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600"
            >
              Yes, Confirm
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Categories;
