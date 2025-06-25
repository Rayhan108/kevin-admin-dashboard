import { useState } from 'react';
import { Modal, Table } from 'antd';
import { FiTrash2 } from 'react-icons/fi';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Feedback = () => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const data =[
  { key: '1', user: 'Robert Fox', userType: 'Painting', projectName: '$80', time: '2-4-25', status: 'Yet to reply' },
  { key: '2', user: 'John Doe', userType: 'Design', projectName: '$120', time: '2-5-25', status: 'Yet to reply' },
  { key: '3', user: 'Jane Smith', userType: 'Illustration', projectName: '$150', time: '2-6-25', status: 'Responded' },
  { key: '4', user: 'Alice Johnson', userType: 'Photography', projectName: '$200', time: '2-7-25', status: 'Yet to reply' },
  { key: '5', user: 'Emily Davis', userType: 'Web Design', projectName: '$250', time: '2-8-25', status: 'Responded' },
  { key: '6', user: 'Michael Brown', userType: 'Painting', projectName: '$90', time: '2-9-25', status: 'Responded' },
  { key: '7', user: 'David Wilson', userType: 'Design', projectName: '$130', time: '2-10-25', status: 'Yet to reply' },
  { key: '8', user: 'Sarah Lee', userType: 'Illustration', projectName: '$160', time: '2-11-25', status: 'Yet to reply' },
  { key: '9', user: 'James Harris', userType: 'Photography', projectName: '$180', time: '2-12-25', status: 'Responded' },
  { key: '10', user: 'Linda Clark', userType: 'Web Design', projectName: '$220', time: '2-13-25', status: 'Yet to reply' },
  { key: '11', user: 'Kevin Lewis', userType: 'Painting', projectName: '$85', time: '2-14-25', status: 'Responded' },
  { key: '12', user: 'Mary Robinson', userType: 'Design', projectName: '$110', time: '2-15-25', status: 'Yet to reply' },
  { key: '13', user: 'William Walker', userType: 'Illustration', projectName: '$140', time: '2-16-25', status: 'Responded' },
  { key: '14', user: 'Patricia Hall', userType: 'Photography', projectName: '$190', time: '2-17-25', status: 'Yet to reply' },
  { key: '15', user: 'Charles Allen', userType: 'Web Design', projectName: '$230', time: '2-18-25', status: 'Responded' },
  ]


  const handleDelete = (user) => {
    console.log(user);
    setIsDeleteModalVisible(true);
  };

  const columns = [
    {
      title: 'Slot',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'User Type',
      dataIndex: 'userType',
      key: 'userType',
    },
    {
      title: 'Project Name',
      dataIndex: 'projectName',
      key: 'projectName',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusColor = status === 'Responded' ? 'green' : 'orange';
        return <span style={{ color: statusColor, fontWeight: 'bold' }}>{status}</span>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className="flex gap-3 justify-center text-lg">
            <Link to="/feedback/reply">
            <MdOutlineRemoveRedEye />
            </Link>
          <FiTrash2
            className="text-red-500 cursor-pointer"
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
      align: 'center',
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
          <p className="text-[#ffffff] font-title text-3xl font-bold">Feedback</p>
        </div>
      </div>

      <div className="mt-8">
        <Table
          dataSource={data}
          columns={columns}
          pagination={{
            pageSize: 12,
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Confirm deleting the entry?</h2>
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

export default Feedback;
