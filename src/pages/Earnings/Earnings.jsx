import { Link } from "react-router-dom";
import EarningsStat from "../../components/Overview/EarningsStat";
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useState } from "react";

import { LuDownload } from "react-icons/lu";
import { FiTrash2 } from "react-icons/fi";
import { Modal, Pagination, Table, Tag } from "antd";

const Earnings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const pageSize = 8;

  // Sample data for the table
  const tableData = [
    { S_ID: '01', Trx_ID: '#Trx234', Name: 'Robert Hawn', TotalPayment: '$380', ContractorPayout: '$342', PlatformFee: '$10', DateOfTrx: '2-4-25', Status: 'Pending' },
    { S_ID: '01', Trx_ID: '#Trx234', Name: 'Elise Gewen', TotalPayment: '$380', ContractorPayout: '$342', PlatformFee: '$10', DateOfTrx: '2-4-25', Status: 'Pending' },
    { S_ID: '01', Trx_ID: '#Trx234', Name: 'Elise Gewen', TotalPayment: '$380', ContractorPayout: '$342', PlatformFee: '$10', DateOfTrx: '2-4-25', Status: 'Pending' },
    { S_ID: '01', Trx_ID: '#Trx234', Name: 'Elise Gewen', TotalPayment: '$380', ContractorPayout: '$342', PlatformFee: '$10', DateOfTrx: '2-4-25', Status: 'Completed' },
    { S_ID: '01', Trx_ID: '#Trx234', Name: 'Elise Gewen', TotalPayment: '$380', ContractorPayout: '$342', PlatformFee: '$10', DateOfTrx: '2-4-25', Status: 'Completed' },
    { S_ID: '01', Trx_ID: '#Trx234', Name: 'Robert Hawn', TotalPayment: '$380', ContractorPayout: '$342', PlatformFee: '$10', DateOfTrx: '2-4-25', Status: 'Completed' },
    { S_ID: '01', Trx_ID: '#Trx234', Name: 'Robert Hawn', TotalPayment: '$380', ContractorPayout: '$342', PlatformFee: '$10', DateOfTrx: '2-4-25', Status: 'Completed' },
    { S_ID: '01', Trx_ID: '#Trx234', Name: 'Ellie Hose Painting', TotalPayment: '$380', ContractorPayout: '$342', PlatformFee: '$10', DateOfTrx: '2-4-25', Status: 'Completed' },
  ];

  const currentData = tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  
  const onChange = (page) => setCurrentPage(page);

  const statusColor = {
    Pending: 'orange',
    Completed: 'green',
  };

  // Columns for the table display
  const membershipColumns = [
    { title: 'S.ID', dataIndex: 'S_ID', key: 'S_ID', align: 'center' },
    { title: 'Trx ID', dataIndex: 'Trx_ID', key: 'Trx_ID', align: 'center' },
    { title: 'Name', dataIndex: 'Name', key: 'Name', align: 'center' },
    { title: 'Total Payment', dataIndex: 'TotalPayment', key: 'TotalPayment', align: 'center' },
    { title: 'Contractor Payout', dataIndex: 'ContractorPayout', key: 'ContractorPayout', align: 'center' },
    { title: 'Platform Fee', dataIndex: 'PlatformFee', key: 'PlatformFee', align: 'center' },
    { title: 'Date of Trx', dataIndex: 'DateOfTrx', key: 'DateOfTrx', align: 'center' },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      render: (text) => <Tag color={statusColor[text]}>{text}</Tag>,
      align: 'center',
    },
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

  const handleDownload = (record) => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('Invoice Details', 14, 16);

      autoTable(doc, {
        head: [['S.ID', 'Trx ID', 'Name', 'Total Payment', 'Contractor Payout', 'Platform Fee', 'Date of Trx', 'Status']],
        body: [
          [
            record.S_ID,
            record.Trx_ID,
            record.Name,
            record.TotalPayment,
            record.ContractorPayout,
            record.PlatformFee,
            record.DateOfTrx,
            record.Status,
          ]
        ],
        startY: 20,
        theme: 'grid',
        headStyles: { fillColor: [22, 160, 133], textColor: [255, 255, 255] },
        bodyStyles: { fontSize: 10 },
        margin: { top: 20 },
      });
      
      doc.save(`${record.Trx_ID}_Invoice.pdf`);
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
    <div>
      <div className="flex justify-between font-title bg-[#2C3E50] px-3 py-2 rounded-md">
        <div className="flex justify-center items-center gap-5">
          <p className="text-[#ffffff] font-title text-3xl font-bold">Earnings</p>
        </div>
        <div className="flex gap-5">
          <div className="relative w-full ">
            <Link to="/earnings/platformFee">
              <button className="bg-white text-black px-3 py-1 rounded-md">Manage Platform Fee</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <EarningsStat />
      </div>

      {/* Table */}
      <Table
        columns={membershipColumns}
        dataSource={currentData}
        pagination={false}
        rowKey="S_ID"
        style={{ margin: '0 auto' }} // Centers the table horizontally
      />

      <div className="mt-4 flex justify-end">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={tableData.length}
          onChange={onChange}
          showSizeChanger={false}
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

export default Earnings;
