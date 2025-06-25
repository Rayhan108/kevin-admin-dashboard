import React, { useState } from 'react';
import { Modal, Table } from 'antd';
import { FaRegEdit } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Blogs = () => {
      const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [data, setData] = useState([
    {
      key: '1',
      blog: '5 reasons to choose roomy for your next renting!',
      email: 'abc@gmail.com',
      visibility: 'Publish',
      time: '02-24-2024',
      action: 'Edit',
    },
    {
      key: '2',
      blog: '5 reasons to choose roomy for your next renting!',
      email: 'abc@gmail.com',
      visibility: 'Publish',
      time: '02-24-2024',
      action: 'Edit',
    },
    {
      key: '3',
      blog: '5 reasons to choose roomy for your next renting!',
      email: 'abc@gmail.com',
      visibility: 'Published',
      time: '02-24-2024',
      action: 'Edit',
    },
    {
      key: '4',
      blog: '5 reasons to choose roomy for your next renting!',
      email: 'abc@gmail.com',
      visibility: 'Rejected',
      time: '02-24-2024',
      action: 'Edit',
    },
    {
      key: '1',
      blog: '5 reasons to choose roomy for your next renting!',
      email: 'abc@gmail.com',
      visibility: 'Publish',
      time: '02-24-2024',
      action: 'Edit',
    },
    {
      key: '2',
      blog: '5 reasons to choose roomy for your next renting!',
      email: 'abc@gmail.com',
      visibility: 'Publish',
      time: '02-24-2024',
      action: 'Edit',
    },
    {
      key: '3',
      blog: '5 reasons to choose roomy for your next renting!',
      email: 'abc@gmail.com',
      visibility: 'Published',
      time: '02-24-2024',
      action: 'Edit',
    },
    {
      key: '4',
      blog: '5 reasons to choose roomy for your next renting!',
      email: 'abc@gmail.com',
      visibility: 'Rejected',
      time: '02-24-2024',
      action: 'Edit',
    },
    {
      key: '1',
      blog: '5 reasons to choose roomy for your next renting!',
      email: 'abc@gmail.com',
      visibility: 'Publish',
      time: '02-24-2024',
      action: 'Edit',
    },
    {
      key: '2',
      blog: '5 reasons to choose roomy for your next renting!',
      email: 'abc@gmail.com',
      visibility: 'Publish',
      time: '02-24-2024',
      action: 'Edit',
    },
    {
      key: '3',
      blog: '5 reasons to choose roomy for your next renting!',
      email: 'abc@gmail.com',
      visibility: 'Published',
      time: '02-24-2024',
      action: 'Edit',
    },
    {
      key: '4',
      blog: '5 reasons to choose roomy for your next renting!',
      email: 'abc@gmail.com',
      visibility: 'Rejected',
      time: '02-24-2024',
      action: 'Edit',
    },
  ]);
  const handleDelete = (user) => {
console.log(user);
    setIsDeleteModalVisible(true);
  };
  const handleVisibilityChange = (key, visibility) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, visibility } : item
      )
    );
  };

  const columns = [
    {
      title: 'S.ID',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Blog',
      dataIndex: 'blog',
      key: 'blog',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Visibility',
      dataIndex: 'visibility',
      key: 'visibility',
      render: (visibility, record) => (
        <div>
          {visibility === 'Published' ? (
            <span
              style={{
                color: 'green',
                fontWeight: 'bold',
              }}
            >
              Published
            </span>
          ) : visibility === 'Rejected' ? (
            <span
              style={{
                color: 'red',
                fontWeight: 'bold',
              }}
            >
              Rejected
            </span>
          ) : (
            <div className='flex gap-3'>
              <button
                className=" border border-[#1D69E1] text-[#1D69E1] px-5  "
              
                onClick={() => handleVisibilityChange(record.key, 'Published')}
              >
                Publish
              </button>
              <button
                className="border border-[#F44848] text-[#F44848] px-5 "
           
                onClick={() => handleVisibilityChange(record.key, 'Rejected')}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
              title: "Action",
              key: "action",
              render: (_, record) => (
                <div className="flex gap-3 justify-center text-lg">
                  {/* <FaRegEdit
                    className="text-gray-600 cursor-pointer"
                  
                  /> */}
                  <FiTrash2
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(record)}
                  />
                </div>
              ),
              align: "center",
            },
  ];

  const handleDeleteConfirm = () => {

    setIsDeleteModalVisible(false);
  };

  const handleCancel = () => {

    setIsDeleteModalVisible(false);

  };
  return (
    <div>
      <div className="flex justify-between font-title bg-[#2C3E50] px-3 py-2 rounded-md">
        <div className="flex justify-center items-center gap-5">
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

<div className='mt-8'>
          <Table
        dataSource={data}
        columns={columns}
        pagination={{
          pageSize: 10,
          total: data.length,
      
       
        }}
      />
</div>
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
            Confirm deleting the Blog?
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

export default Blogs;
