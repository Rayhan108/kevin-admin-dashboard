import { Input, Pagination, Table, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FiEye, FiTrash2 } from "react-icons/fi";
import userImg from "../../assets/Ellipse 1.png"; // Make sure the user image path is correct
import { useDeleteUserMutation, useGetAllUserQuery } from "../../redux/feature/user/userApi";
const Users = () => {
  const [deleteUser]=useDeleteUserMutation()
    const [page, setPage] = useState(1);
const [search,setSearch]=useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(search);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  console.log("current user-->",currentUser)
  const [activeTab, setActiveTab] = useState("user");
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(search);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);
const {data:allUsers,refetch}=useGetAllUserQuery({page,role:activeTab,search: debouncedSearchTerm,})

  // Separate Client Data
    const meta = allUsers?.data?.meta;
const limit = meta?.limit;
  const totalItems = meta?.total;

  // Calculate current items to show based on page and limit

  const currentItems = allUsers?.data?.result
    const onPageChange = (page) => {
    setPage(page);
  };





  const columns = [
    {
      title: "S.ID",
      dataIndex: "id",
      key: "id",
        render: (text, record, index) => {

    return index + 1;
  },
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => (
        <div className="flex items-center gap-3">
          <img src={userImg} alt="User" className="w-8 h-8 rounded-full" />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Joining Date",
      dataIndex: "createdAt",
      key: "createdAt",
          render: (text) => (
        <div className="flex items-center gap-3">
      
          <span>{ text.split('T')[0]}</span>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            className=" text-black text-xl px-2 py-1 rounded"
            onClick={() => handleView(record)}
          >
            <FiEye />
          </button>
          <button
            className=" text-red-600 text-xl px-2 py-1 rounded"
            onClick={() => handleDelete(record)}
          >
            <FiTrash2 />
          </button>
        </div>
      ),
    },
  ];

  const handleView = (user) => {
    setCurrentUser(user);
    setIsModalVisible(true);
  };

  const handleDelete = (user) => {
    setCurrentUser(user);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async() => {
    console.log("Deleted user:", currentUser);
          try {
      const res = await deleteUser(currentUser?._id).unwrap()

      console.log("response------->",res);
      if(res?.success){
        message.success(res?.message)
        refetch()
      setIsDeleteModalVisible(false);
      }else{
        message.error(res?.message)
    setIsDeleteModalVisible(false);
      }
    } catch (error) {
      console.log("login error",error)
         message.error(error?.data?.message)
    setIsDeleteModalVisible(false);
    }

  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsDeleteModalVisible(false);
  };
     const handleSearchChange=(e)=>{
    setSearch(e.target.value)
  }
  return (
    <div className="border-2 mt-2">
      <div className="flex justify-between font-title bg-[#2C3E50] px-3 py-2 rounded-md">
        <div className="flex justify-center items-center gap-5">
          <p className="text-[#ffffff] font-title text-3xl font-bold">
            {activeTab === "client" ? "Client List" : "Contractor List"}
          </p>
        </div>
        <div className="flex gap-5">
          <div className="relative w-full sm:w-[300px]">
            <Input
              type="text"
              placeholder="Search anything here..."
                   onChange={(e) =>handleSearchChange(e)}
              className="border border-[#e5eaf2] py-3 outline-none w-full rounded-xl px-3"
            />
            <span className="text-gray-500 absolute top-0 right-0 h-full px-5 flex items-center justify-center cursor-pointer">
              <IoSearch className="text-[1.3rem]" />
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white rounded shadow-md">
        {/* Tabs */}
        <div className="flex space-x-3 mb-6">
          <button
            onClick={() => setActiveTab("user")}
            className={`px-4 py-2 rounded border ${
              activeTab === "user"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800 border-gray-300"
            }`}
          >
            Client List
          </button>
          <button
            onClick={() => setActiveTab("contractor")}
            className={`px-4 py-2 rounded border ${
              activeTab === "contractor"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800 border-gray-300"
            }`}
          >
            Contractor List
          </button>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={currentItems}
          pagination={false}
          rowKey="id"
          className="rounded-md shadow-sm"
        />

        {/* Pagination */}
        <div className="mt-4 flex justify-end">
          <Pagination
          current={page}
          pageSize={limit} 
          total={totalItems} 
          onChange={onPageChange}
          showSizeChanger={false}
          className="flex justify-center"

          pageSizeOptions={[limit?.toString()]}

        />
        </div>
      </div>

      {/* Modals */}
      {/* User Details Modal */}
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        closable={false}
      >
        <div className="text-center px-8 py-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">
            {activeTab === "user" ? "Client Details" : "Contractor Details"}
          </h2>
          <p className="text-sm text-gray-500 mb-4 uppercase">
            See all details about {currentUser?.firstName
}
          </p>
          <div className="text-left">
            <div className="flex items-center gap-3  mb-4">
              <img
                src={userImg}
                alt="User"
                className="w-16 h-16 rounded-full object-cover"
              />
              <h3 className="font-semibold text-lg text-gray-700 mb-3">
                {currentUser?.firstName
}
              </h3>
            </div>
          </div>

          <div className="text-left  mx-auto text-sm text-gray-700 space-y-2">
            <p className="text-xl font-bold">User Information</p>
            <p>
              <span className="font-medium">Name</span> :{" "}
              {currentUser?.firstName
}
            </p>
            <p>
              <span className="font-medium">Email</span> : {currentUser?.email}
            </p>
            <p>
              <span className="font-medium">Address</span> :{" "}
              {currentUser?.address}
            </p>
            <p>
              <span className="font-medium">Joining Date</span> :{" "}
              {currentUser?.createdAt.split('T')[0]}
            </p>
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
    </div>
  );
};

export default Users;
