import { useState } from "react";
import { Modal, Pagination, Table } from "antd";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useGetAllFeedbackQuery } from "../../redux/feature/feedback/feedbackApi";
import Reply from "./Reply";

const Feedback = () => {

  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);

  const { data: allFeedback } = useGetAllFeedbackQuery(page);
  const meta = allFeedback?.data?.meta;

  const limit = meta?.limit || 10;
  const totalItems = meta?.total || 0;
  const currentItems = allFeedback?.data?.data;

  const onPageChange = (page) => {
    setPage(page);
  };

  const openImageModal = (imgSrc) => {
    setSelectedImage(imgSrc);

  };

  const openFeedbackModal = (record) => {
    setSelectedFeedback(record);

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
      title: "User",
      dataIndex: "name",
      key: "user",
    },
    {
      title: "User Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Attach File",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (text) =>
        text ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={() => openImageModal(text)}
          >
            <img src={text} alt="image" style={{ width: 70, height: 40 }} />
          </div>
        ) : (
          "-"
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-3 justify-center text-lg cursor-pointer">
          <MdOutlineRemoveRedEye onClick={() => openFeedbackModal(record)} />
        </div>
      ),
      align: "center",
    },
  ];

  const handleCancel = () => {

    setSelectedFeedback(null);
    setSelectedImage(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between font-title bg-[#2C3E50] px-3 py-2 rounded-md">
        <div className="flex justify-center items-center gap-5">
          <p className="text-[#ffffff] font-title text-3xl font-bold">
            Feedback
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="mt-8">
        <Table dataSource={currentItems} columns={columns} pagination={false} />
      </div>

      {/* Pagination */}
      <div className="my-5">
        <Pagination
          current={page}
          pageSize={limit}
          total={totalItems}
          onChange={onPageChange}
          showSizeChanger={false}
          className="flex justify-center"
          pageSizeOptions={[limit.toString()]}
        />
      </div>

      {/* Feedback Details Modal */}
      <Modal
        open={!!selectedFeedback}
        onCancel={handleCancel}
        footer={null}
        centered
        width={600}
      >
        {selectedFeedback && (
          <div>
      <Reply selectedFeedback={selectedFeedback}/>
          </div>
        )}
      </Modal>

      {/* Image Preview Modal */}
      <Modal
        open={!!selectedImage}
        footer={null}
        onCancel={handleCancel}
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

export default Feedback;
