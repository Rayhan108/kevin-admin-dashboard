
import React, { useState } from 'react';
import { Input, Pagination, Table, Modal, Tag } from 'antd';
import { IoSearch } from 'react-icons/io5';
import { FiTrash2, FiFlag } from 'react-icons/fi';
import { BiMessageDetail } from 'react-icons/bi';
import userImg from '../../assets/Ellipse 1.png';
import { Link } from 'react-router-dom';

const Bookings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('project');
  const pageSize = 8;

  const projectData = new Array(8).fill(null).map((_, index) => ({
    id: index + 1,
    slot:index + 1,
    client: 'Robert Fox',
    contractor: 'Robert Fox',
    service: 'Painting',
    project: 'Ellie Hose Painting',
    pricing: '$380',
    date: '2-4-25',
    status: ['Pending', 'In progress', 'Completed'][Math.floor(index / 3)],
  }));

  const serviceData = new Array(8).fill(null).map((_, index) => ({
    id: index + 1,
    slot:index + 1,
    contractor: 'Robert Fox',
    service: 'Painting',
    pricing: '$80',
    date: '2-4-25',
    bookings: 26,
  }));

  const currentData =
    activeTab === 'project'
      ? projectData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      : serviceData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const onChange = (page) => setCurrentPage(page);

  const statusColor = {
    Pending: 'orange',
    'In progress': 'blue',
    Completed: 'green',
  };

  const projectColumns = [
    { title: 'Slot', dataIndex: 'slot', key: 'slot', align: 'center' },
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
      render: (text) => (
        <div className="flex items-center gap-2 justify-center">
          <img src={userImg} alt="Client" className="w-8 h-8 rounded-full" />
          {text}
        </div>
      ),
      align: 'center',
    },
    {
      title: 'Contractor',
      dataIndex: 'contractor',
      key: 'contractor',
      render: (text) => (
        <div className="flex items-center gap-2 justify-center">
          <img src={userImg} alt="Contractor" className="w-8 h-8 rounded-full" />
          {text}
        </div>
      ),
      align: 'center',
    },
    { title: 'Service', dataIndex: 'service', key: 'service', align: 'center' },
    { title: 'Project', dataIndex: 'project', key: 'project', align: 'center' },
    { title: 'Pricing', dataIndex: 'pricing', key: 'pricing', align: 'center' },
    { title: 'Date Listed', dataIndex: 'date', key: 'date', align: 'center' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => <Tag color={statusColor[text]}>{text}</Tag>,
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className="flex gap-3 justify-center text-lg">
            <Link to="/message">
          <BiMessageDetail className="text-blue-500 cursor-pointer" onClick={() => handleView(record)} />
            </Link>
              <Link to="/flag">
          <FiFlag className="text-gray-600 cursor-pointer" />
              </Link>
          <FiTrash2 className="text-red-500 cursor-pointer" onClick={() => handleDelete(record)} />
        </div>
      ),
      align: 'center',
    },
  ];

  const serviceColumns = [
    { title: 'Slot', dataIndex: 'slot', key: 'slot', align: 'center' },
    {
      title: 'Contractor',
      dataIndex: 'contractor',
      key: 'contractor',
      render: (text) => (
        <div className="flex items-center gap-2 justify-center">
          <img src={userImg} alt="Contractor" className="w-8 h-8 rounded-full" />
          {text}
        </div>
      ),
      align: 'center',
    },
    { title: 'Service', dataIndex: 'service', key: 'service', align: 'center' },
    { title: 'Pricing/hr', dataIndex: 'pricing', key: 'pricing', align: 'center' },
    { title: 'Date Listed', dataIndex: 'date', key: 'date', align: 'center' },
    { title: 'No of Booking', dataIndex: 'bookings', key: 'bookings', align: 'center' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className="flex gap-3 justify-center text-lg">
          <FiFlag className="text-gray-600 cursor-pointer" />
          <FiTrash2 className="text-red-500 cursor-pointer" onClick={() => handleDelete(record)} />
        </div>
      ),
      align: 'center',
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
    <div className="border-2 mt-2 rounded">
      <div className="flex justify-between font-title bg-[#2C3E50] px-3 py-2 rounded-md">
        <div className="flex justify-center items-center gap-5">
          <p className="text-[#ffffff] font-title text-3xl font-bold">
            Bookings
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

      <div className="p-6 bg-white">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('project')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'project' ? 'bg-blue-600 text-white' : 'border border-gray-300 text-black'
            }`}
          >
            Project
          </button>
          <button
            onClick={() => setActiveTab('service')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'service' ? 'bg-blue-600 text-white' : 'border border-gray-300 text-black'
            }`}
          >
            Services
          </button>
        </div>

        <Table
          columns={activeTab === 'project' ? projectColumns : serviceColumns}
          dataSource={currentData}
          pagination={false}
          rowKey="id"
          style={{ margin: '0 auto' }} // Centers the table horizontally
        />

        <div className="mt-4 flex justify-end">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={activeTab === 'project' ? projectData.length : serviceData.length}
            onChange={onChange}
            showSizeChanger={false}
          />
        </div>
      </div>

      <Modal visible={isModalVisible} onCancel={handleCancel} footer={null} centered>
        <div className="text-center">
          <img src={userImg} alt="User" className="w-16 h-16 mx-auto rounded-full" />
          <h3 className="mt-4 text-lg font-bold">{currentUser?.client}</h3>
          <p className="text-sm">Service: {currentUser?.service}</p>
        </div>
      </Modal>

      <Modal visible={isDeleteModalVisible} onCancel={handleCancel} footer={null} centered>
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Do you want to remove this user?</h2>
          <div className="flex justify-center gap-4">
            <button onClick={handleCancel} className="px-4 py-2 border rounded">Cancel</button>
            <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-red-600 text-white rounded">Yes, Confirm</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Bookings;
