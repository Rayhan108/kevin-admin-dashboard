import React, { useState } from "react";
import { message, Modal, Pagination, Table } from "antd";
import { FaRegEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  useAllBlogsQuery,
  useDeleteBlogMutation,
  useUpdateBlogStatusMutation,
} from "../../redux/feature/others/othersApi";

const Blogs = () => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [updateBlog] = useUpdateBlogStatusMutation();
  const [deleteBlog] = useDeleteBlogMutation();
  const [page, setPage] = useState(1);
  const { data: allArticles, refetch } = useAllBlogsQuery(page);
  const meta = allArticles?.data?.meta;
  console.log("all article---->", allArticles);

  // Ensure meta and limit are defined
  const limit = meta?.limit || 10;
  const totalItems = meta?.total || 0;

  // Check if there are enough items to slice
  const currentItems = allArticles?.data?.result;

  console.log("items-------->", currentItems);
  const onPageChange = (page) => {
    setPage(page);
  };

  const handleDelete = (blog) => {
    console.log(blog);
    setCurrentBlog(blog);
    setIsDeleteModalVisible(true);
  };
  const handleAccept = async (data) => {
    console.log("Accepted:", data);
    const payload = {
      id: data?._id,
      status: "approved",
    };
    try {
      const res = await updateBlog(payload).unwrap();

      console.log("response------->", res);
      if (res?.success) {
        message.success(res?.message);
        refetch();
      } else {
        message.error(res?.message);
      }
    } catch (error) {
      console.log("login error", error);
      message.error(error?.data?.message);
    }
  };

  const handleReject = async (data) => {
    console.log("Rejected:", data);
    const payload = {
      id: data?._id,
      status: "rejected",
    };
    try {
      const res = await updateBlog(payload).unwrap();

      console.log("response------->", res);
      if (res?.success) {
        message.success(res?.message);
        refetch();
      } else {
        message.error(res?.message);
      }
    } catch (error) {
      console.log("login error", error);
      message.error(error?.data?.message);
    }
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
      title: "Blog",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_text, record) => <p>{record.user?.email}</p>,
    },
    {
      title: "Status",
      dataIndex: "blogStatus",
      key: "blogStatus",
      render: (blogStatus, record) => (
        <div>
          {blogStatus === "approved" ? (
            <span
              style={{
                color: "green",
                fontWeight: "bold",
              }}
            >
              Published
            </span>
          ) : blogStatus === "rejected" ? (
            <span
              style={{
                color: "red",
                fontWeight: "bold",
              }}
            >
              Rejected
            </span>
          ) : (
            <div className="flex gap-3">
              <button
                className=" border border-[#1D69E1] text-[#1D69E1] px-5  "
                onClick={() => handleAccept(record)}
              >
                Publish
              </button>
              <button
                className="border border-[#F44848] text-[#F44848] px-5 "
                onClick={() => handleReject(record)}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => value.split("T")[0],
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

  const handleDeleteConfirm = async () => {
    try {
      const res = await deleteBlog(currentBlog?._id).unwrap();

      console.log("response------->", res);
      if (res?.success) {
        message.success(res?.message);
        refetch();
        setIsDeleteModalVisible(false);
      } else {
        message.error(res?.message);
        setIsDeleteModalVisible(false);
      }
    } catch (error) {
      console.log("login error", error);
      message.error(error?.data?.message);
      setIsDeleteModalVisible(false);
    }
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

      <div className="mt-8">
        <Table dataSource={currentItems} columns={columns}    pagination={false}/>
      </div>

     <div className="my-5">
       <Pagination
        current={page}
        pageSize={limit}
        total={totalItems}
        onChange={onPageChange}
        showSizeChanger={false}
        className="flex justify-center"
        // Show the total number of pages (meta.totalPage)
        pageSizeOptions={[limit.toString()]}
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
