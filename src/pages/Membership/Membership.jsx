import { useState } from 'react';
import { Pagination, Table, Modal, Tag } from 'antd';
import { FiTrash2, FiFlag } from 'react-icons/fi';
import { LuDownload } from 'react-icons/lu';
import userImg from '../../assets/Ellipse 1.png';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FaArrowLeft } from 'react-icons/fa';

const Membership = () => {
  const [currentPage, setCurrentPage] = useState(1);
 
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('project');
  const pageSize = 8;

  // Sample data for Vip Clients and Vip Members
  const vipClientData = new Array(8).fill(null).map((_, index) => ({
    id: index + 1,
    invoiceNumber: `00${index + 1}`,
    fullName: 'Robert Fox',
    email: 'abc@gmail.com',
    status: ['Paid', 'Paid', 'Expired', 'Paid', 'Renewal req.', 'Paid', 'Paid', 'Paid'][index],
    expiration: '02-24-2024',
  }));

  const vipMemberData = new Array(8).fill(null).map((_, index) => ({
    id: index + 1,
    invoiceNumber: `00${index + 1}`,
    fullName: 'Robert ',
    email: 'abc@gmail.com',
    status: ['Paid', 'Paid', 'Expired', 'Paid', 'Renewal req.', 'Paid', 'Paid', 'Paid'][index],
    expiration: '02-24-2024',
  }));

  // Set the data to be shown based on the selected tab (VIP Clients or VIP Members)
  const currentData =
    activeTab === 'project' ? vipClientData.slice((currentPage - 1) * pageSize, currentPage * pageSize) :
    vipMemberData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const onChange = (page) => setCurrentPage(page);

  const statusColor = {
    Paid: 'green',
    Expired: 'red',
    'Renewal req.': 'orange',
  };

  // Columns for the table display
  const membershipColumns = [
    { title: 'Invoice Number', dataIndex: 'invoiceNumber', key: 'invoiceNumber', align: 'center' },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text) => (
        <div className="flex items-center gap-2 justify-center">
          <img src={userImg} alt="User" className="w-8 h-8 rounded-full" />
          {text}
        </div>
      ),
      align: 'center',
    },
    { title: 'Email', dataIndex: 'email', key: 'email', align: 'center' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => <Tag color={statusColor[text]}>{text}</Tag>,
      align: 'center',
    },
    { title: 'Expiration', dataIndex: 'expiration', key: 'expiration', align: 'center' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className="flex gap-3 justify-center text-lg">
          <LuDownload
            className="text-blue-500 cursor-pointer"
            onClick={() => handleDownload(record)} // Trigger download on click
          />
          <FiTrash2 className="text-red-500 cursor-pointer" onClick={() => handleDelete(record)} />
        </div>
      ),
      align: 'center',
    },
  ];

  // Handle PDF download
const handleDownload = (record) => {
    try {
        const doc = new jsPDF();

        // Set title
        doc.setFontSize(18);
        doc.text('Invoice Details', 14, 16);

        // Add table data
        autoTable(doc, {
            head: [['Invoice Number', 'Full Name', 'Email', 'Status', 'Expiration']],
            body: [
                [
                    record.invoiceNumber,
                    record.fullName,
                    record.email,
                    record.status,
                    record.expiration,
                ]
            ],
            startY: 20, // Start position for the table
            theme: 'grid', // Grid style for the table
            headStyles: { fillColor: [22, 160, 133], textColor: [255, 255, 255] }, // Header style
            bodyStyles: { fontSize: 10 }, // Body style
            margin: { top: 20 },
        });

        // Save the document as a PDF
        doc.save(`${record.invoiceNumber}_Invoice.pdf`);
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
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

    setIsDeleteModalVisible(false);
  };

  return (
    <div className="border-2 mt-2 rounded">
      <div className="flex justify-between font-title bg-[#2C3E50] px-3 py-2 rounded-md">
        <div className="flex justify-center items-center gap-5">
                  <FaArrowLeft />
          <p className="text-[#ffffff] font-title text-3xl font-bold">Membership</p>
        </div>
        <div className="flex gap-5">
          <div className="relative w-full ">
            <Link to="/membership/manageFees">
            
            <button className="bg-blue-600 px-3 py-1 rounded-md">Manage Fees</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('project')}
            className={`px-4 py-2 rounded-md ${activeTab === 'project' ? 'bg-blue-600 text-white' : 'border border-gray-300 text-black'}`}
          >
            Vip Client
          </button>
          <button
            onClick={() => setActiveTab('service')}
            className={`px-4 py-2 rounded-md ${activeTab === 'service' ? 'bg-blue-600 text-white' : 'border border-gray-300 text-black'}`}
          >
            Vip Member
          </button>
        </div>

        <Table
          columns={membershipColumns}
          dataSource={currentData}
          pagination={false}
          rowKey="id"
          style={{ margin: '0 auto' }} // Centers the table horizontally
        />

        <div className="mt-4 flex justify-end">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={activeTab === 'project' ? vipClientData.length : vipMemberData.length}
            onChange={onChange}
            showSizeChanger={false}
          />
        </div>
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

export default Membership;
