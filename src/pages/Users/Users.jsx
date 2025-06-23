
import { Input, Pagination, Table, Modal } from 'antd';
import React, { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { FiEye, FiTrash2 } from 'react-icons/fi';
import userImg from '../../assets/Ellipse 1.png'; // Make sure the user image path is correct

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('client');
  const pageSize = 8;

  // ✅ Separate Client Data
  const clientData = [
    { id: 1, fullName: 'Alice Johnson', email: 'alice@gmail.com', address: '123 Maple St', joiningDate: '01-01-2024' },
    { id: 2, fullName: 'Bob Smith', email: 'bob@gmail.com', address: '456 Oak St', joiningDate: '01-15-2024' },
    { id: 3, fullName: 'Charlie Brown', email: 'charlie@gmail.com', address: '789 Pine St', joiningDate: '02-01-2024' },
    { id: 4, fullName: 'Diana Prince', email: 'diana@gmail.com', address: '321 Birch St', joiningDate: '02-10-2024' },
    { id: 5, fullName: 'Edward Elric', email: 'edward@gmail.com', address: '654 Elm St', joiningDate: '02-20-2024' },
    { id: 6, fullName: 'Fiona Glenanne', email: 'fiona@gmail.com', address: '987 Cedar St', joiningDate: '03-01-2024' },
    { id: 7, fullName: 'George Bailey', email: 'george@gmail.com', address: '147 Spruce St', joiningDate: '03-10-2024' },
    { id: 8, fullName: 'Hannah Abbott', email: 'hannah@gmail.com', address: '258 Fir St', joiningDate: '03-20-2024' },
    { id: 9, fullName: 'Isaac Clarke', email: 'isaac@gmail.com', address: '369 Walnut St', joiningDate: '04-01-2024' },
  ];

  // ✅ Separate Contractor Data
  const contractorData = [
    { id: 101, fullName: 'Jason Bourne', email: 'jason@contractor.com', address: '900 Contractor Ave', joiningDate: '01-05-2024' },
    { id: 102, fullName: 'Karen Page', email: 'karen@contractor.com', address: '800 Legal St', joiningDate: '01-20-2024' },
    { id: 103, fullName: 'Luke Cage', email: 'luke@contractor.com', address: '700 Harlem Rd', joiningDate: '02-03-2024' },
    { id: 104, fullName: 'Matt Murdock', email: 'matt@contractor.com', address: '600 Hell Kitchen', joiningDate: '02-15-2024' },
    { id: 105, fullName: 'Nancy Drew', email: 'nancy@contractor.com', address: '500 Mystery Ln', joiningDate: '02-28-2024' },
    { id: 106, fullName: 'Oliver Queen', email: 'oliver@contractor.com', address: '400 Star City', joiningDate: '03-05-2024' },
    { id: 107, fullName: 'Peter Parker', email: 'peter@contractor.com', address: '300 Queens Blvd', joiningDate: '03-15-2024' },
    { id: 108, fullName: 'Quinn Perkins', email: 'quinn@contractor.com', address: '200 Scandal St', joiningDate: '03-25-2024' },
    { id: 109, fullName: 'Rachel Green', email: 'rachel@contractor.com', address: '100 Friends St', joiningDate: '04-05-2024' },
  ];

  const currentData =
    activeTab === 'client'
      ? clientData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      : contractorData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const onChange = (page) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: 'S.ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text) => (
        <div className="flex items-center gap-3">
          <img src={userImg} alt="User" className="w-8 h-8 rounded-full" />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Joining Date',
      dataIndex: 'joiningDate',
      key: 'joiningDate',
    },
    {
      title: 'Action',
      key: 'action',
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

  const handleDeleteConfirm = () => {
    console.log('Deleted user:', currentUser);
    setIsDeleteModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsDeleteModalVisible(false);
  };

  return (
    <div className="border-2 mt-2">
      <div className="flex justify-between font-title bg-[#2C3E50] px-3 py-2 rounded-md">
        <div className="flex justify-center items-center gap-5">
          <p className="text-[#ffffff] font-title text-3xl font-bold">
            {activeTab === 'client' ? 'Client List' : 'Contractor List'}
          </p>
        </div>
        <div className="flex gap-5">
          <div className="relative w-full sm:w-[300px]">
            <Input
              type="text"
              placeholder="Search anything here..."
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
            onClick={() => setActiveTab('client')}
            className={`px-4 py-2 rounded border ${
              activeTab === 'client'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-800 border-gray-300'
            }`}
          >
            Client List
          </button>
          <button
            onClick={() => setActiveTab('contractor')}
            className={`px-4 py-2 rounded border ${
              activeTab === 'contractor'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-800 border-gray-300'
            }`}
          >
            Contractor List
          </button>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={currentData}
          pagination={false}
          rowKey="id"
          className="rounded-md shadow-sm"
          
        />

        {/* Pagination */}
        <div className="mt-4 flex justify-end">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={activeTab === 'client' ? clientData.length : contractorData.length}
            onChange={onChange}
            showSizeChanger={false}
            
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
            {activeTab === 'client' ? 'Client Details' : 'Contractor Details'}
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            See all details about {currentUser?.fullName}
          </p>
<div className='text-left'>
    
          <div className="flex items-center gap-3  mb-4">
            <img
              src={userImg}
              alt="User"
              className="w-16 h-16 rounded-full object-cover"
            />
          <h3 className="font-semibold text-lg text-gray-700 mb-3">{currentUser?.fullName}</h3>
          </div>

</div>

          <div className="text-left  mx-auto text-sm text-gray-700 space-y-2">
            <p className="text-xl font-bold">User Information</p>
            <p><span className="font-medium">Name</span> : {currentUser?.fullName}</p>
            <p><span className="font-medium">Email</span> : {currentUser?.email}</p>
            <p><span className="font-medium">Address</span> : {currentUser?.address}</p>
            <p><span className="font-medium">Joining Date</span> : {currentUser?.joiningDate}</p>
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
