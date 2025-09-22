import { useState } from "react";
import { Table, Tag, Pagination, Modal, Button, message } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useGetAllDocQuery, useUpdateDocStatusMutation } from "../../redux/feature/doc/docApi";

const DocVerify = () => {
    const [updateStatus]=useUpdateDocStatusMutation();
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { data: allDocs,refetch} = useGetAllDocQuery(undefined);
  // Separate Client Data
  const meta = allDocs?.data?.meta;
  const limit = meta?.limit;
  const totalItems = meta?.total;
console.log("all docs------->",allDocs);
  // Calculate current items to show based on page and limit

  const currentItems = allDocs?.data;
  const onPageChange = (page) => {
    setPage(page);
  };

  const statusColor = {
    pending: "orange",
    approved: "green",
    rejected: "red",
  };

  const handleAccept = async(data) => {
    console.log("Accepted:", data);
    const payload ={
        id:data?._id,
        status:'approved'
    }
           try {
          const res = await updateStatus(payload).unwrap()
         
          console.log("response------->",res);
          if(res?.success){
            message.success(res?.message)
    refetch()
          }else{
            message.error(res?.message)
    
          }
        } catch (error) {
          console.log("login error",error)
             message.error(error?.data?.message)
    
        }
  };

  const handleReject = async(data) => {
    console.log("Rejected:", data);
        const payload ={
        id:data?._id,
        status:'rejected'
    }
        try {
          const res = await updateStatus(payload).unwrap()
         
          console.log("response------->",res);
          if(res?.success){
            message.success(res?.message)
    refetch()
          }else{
            message.error(res?.message)
    
          }
        } catch (error) {
          console.log("login error",error)
             message.error(error?.data?.message)
    
        }

  };

  const openImageModal = (imgSrc) => {
    setSelectedImage(imgSrc);
    setIsModalOpen(true);
  };

  const membershipColumns = [
    {
      title: "S.ID",
      dataIndex: "id",
      key: "id",
        render: (text, record, index) => {

    return index + 1;
  },
    },

    {
      title: "Document Type",
      dataIndex: "documentType",
      key: "documentType",
      align: "center",
    },
    {
      title: "Front Licence",
      dataIndex: "frontLicense",
      key: "frontLicense",
      align: "center",
      render: (text) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => openImageModal(text)}
        >
          <img
            src={text}
            alt="Front License"
            style={{ width: 70, height: 40 }}
          />
        </div>
      ),
    },
    {
      title: "Back Licence",
      dataIndex: "backLicense",
      key: "backLicense",
      align: "center",
      render: (text) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => openImageModal(text)}
        >
          <img
            src={text}
            alt="Back License"
            style={{ width: 70, height: 40 }}
          />
        </div>
      ),
    },
    {
      title: "License Status",
      dataIndex: "licenseStatus",
      key: "licenseStatus",
      render: (text) => <Tag color={statusColor[text]}>{text}</Tag>,
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-3 justify-center">
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            className="bg-green-500"
            onClick={() => handleAccept(record)}
          >
            Accept
          </Button>
          <Button
            danger
            icon={<CloseCircleOutlined />}
            onClick={() => handleReject(record)}
          >
            Reject
          </Button>
        </div>
      ),
      align: "center",
    },
  ];

  return (
    <div>
      <div className="flex justify-between font-title bg-[#2C3E50] px-3 py-2 rounded-md">
        <div className="flex justify-center items-center gap-5">
          <p className="text-[#ffffff] font-title text-3xl font-bold">
            Document Verification
          </p>
        </div>
      </div>

      {/* Table */}
      <Table
        columns={membershipColumns}
        dataSource={currentItems}
        pagination={false}
        rowKey="S_ID"
        style={{ margin: "0 auto" }}
      />

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

      {/* Image Preview Modal */}
      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        centered
          width={800}
      >
        {selectedImage && (
          <img src={selectedImage} alt="Document" style={{ width: "100%" }} />
        )}
      </Modal>
    </div>
  );
};

export default DocVerify;
