import { Modal, Pagination, Table, Tag, Input, Button, message } from "antd";
import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import {
  useDeleteCatMutation,
  useEditCatMutation,
  useGetAllCateQuery,
} from "../../redux/feature/others/othersApi";
import { useFieldArray, useForm } from "react-hook-form";
import AddCategory from "../../components/Category/AddCategory";

const Categories = () => {
  const [page, setPage] = useState(1);
  const { data: allCategory, refetch } = useGetAllCateQuery(page);
  const meta = allCategory?.data?.meta;
  const limit = meta?.limit;
  const totalItems = meta?.total;
  console.log("all docs------->", allCategory);
  // Calculate current items to show based on page and limit

  const currentItems = allCategory?.data?.result;
  console.log("current data------>", currentItems);
  const onPageChange = (page) => {
    setPage(page);
  };
  const [editCat] = useEditCatMutation();
  const [deleteCat] = useDeleteCatMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] =
    useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentData, setCurrentData] = useState(null);

  // const [activeTab, setActiveTab] = useState("main");

  const { control, register, handleSubmit, reset } = useForm({
    defaultValues: {
      category: currentData?.category || "",
      subCategory: currentData?.subCategory?.map((s) => ({ name: s })) || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subCategory",
  });
  useEffect(() => {
    if (currentData) {
      reset({
        category: currentData.category || "",
        subCategory: currentData.subCategory?.map((s) => ({ name: s })) || [],
      });
    }
  }, [currentData, reset]);

  const onSubmit = async (data) => {
    const formattedData = {
      category: data.category,
      subCategory: data.subCategory.map((s) => s.name),
    };
    try {
      const res = await editCat({
        payload: formattedData,
        id: currentData?._id,
      }).unwrap();

      console.log("response------->", res);
      if (res?.success) {
        message.success(res?.message);
        refetch();
        handleCancel();
      } else {
        message.error(res?.message);
      }
    } catch (error) {
      console.log("login error", error);
      message.error(error?.data?.message);
    }
    console.log("Form Data:", formattedData);
  };

  const handleView = (user) => {
    setCurrentData(user);
    setIsModalVisible(true);
  };

  const handleDelete = (user) => {
    setCurrentUser(user);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    const id = currentUser?._id;
    console.log("Deleted user:", currentUser);

    try {
      const res = await deleteCat(id).unwrap();

      console.log("response------->", res);
      if (res?.success) {
        message.success(res?.message);
        refetch();
        handleCancel();
      } else {
        message.error(res?.message);
      }
    } catch (error) {
      console.log("login error", error);
      message.error(error?.data?.message);
    }
    setIsDeleteModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsDeleteModalVisible(false);
    setIsAddCategoryModalVisible(false);
  };

  return (
    <>
      <div className="flex justify-between font-title bg-[#2C3E50] px-3 py-2 rounded-md">
        <div className="flex justify-center items-center gap-5">
          <p className="text-[#ffffff] font-title text-3xl font-bold">
            Categories
          </p>
        </div>
        <div className="flex gap-5">
          <div className="relative w-full">
            <button
              className="bg-white text-black px-3 py-1 rounded-md"
              onClick={() => setIsAddCategoryModalVisible(true)}
            >
              + Add Category
            </button>
          </div>
        </div>
      </div>
      <div className="p-6 bg-white">
        {/* <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("main")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "main"
                ? "bg-blue-600 text-white"
                : "border border-gray-300 text-black"
            }`}
          >
            Main Service Categories
          </button>
          <button
            onClick={() => setActiveTab("sub")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "sub"
                ? "bg-blue-600 text-white"
                : "border border-gray-300 text-black"
            }`}
          >
            Sub Service Categories
          </button>
        </div> */}

        <Table
          columns={[
            {
              title: "S.ID",
              dataIndex: "id",
              key: "id",
              render: (text, record, index) => {
                return index + 1;
              },
            },
            {
              title: "Category Name",
              dataIndex: "category",
              key: "category",
              align: "center",
            },
            // {
            //       title: "Category Image/Icon",
            //       dataIndex: "categoryImage",
            //       key: "categoryImage",
            //       render: (image) => (
            //         <div style={{ display: 'flex', justifyContent: 'center' }}>
            //           <img src={image} alt="Category Icon" className="w-8 h-8 rounded-full" />
            //         </div>
            //       ),
            //       align: "center",
            //     },
            {
              title: "Action",
              key: "action",
              render: (_, record) => (
                <div className="flex gap-3 justify-center text-lg">
                  <FaRegEdit
                    className="text-gray-600 cursor-pointer"
                    onClick={() => handleView(record)}
                  />
                  <FiTrash2
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(record)}
                  />
                </div>
              ),
              align: "center",
            },
          ]}
          dataSource={currentItems}
          pagination={false}
          rowKey="id"
          style={{ margin: "0 auto" }} // Centers the table horizontally
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
      </div>

      {/* Edit Category Modal */}
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto p-4 rounded-lg border"
        >
          {/* Category */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              For Category{" "}
              <span className="bg-[#2C3E50] text-white px-3 py-1 rounded-full text-sm">
                {currentData?.category}
              </span>
            </label>
            <div className="flex items-center border border-gray-300 rounded-md mt-2">
              <input
                type="text"
                {...register("category")}
                className="w-full p-2 text-sm border-none focus:outline-none bg-gray-100"
              />
            </div>
          </div>

          {/* Sub Category List */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Sub Categories
            </label>

            <div className="space-y-2 mt-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <input
                    type="text"
                    {...register(`subCategory.${index}.name`)}
                    defaultValue={field.name} // field থেকে default আসবে
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 text-sm font-medium"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Add new subcategory */}
            <button
              type="button"
              onClick={() => append({ name: "" })}
              className="mt-2 text-sm text-blue-600 font-medium"
            >
              + Add Subcategory
            </button>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex w-full space-x-4">
            <button
              type="button"
              onClick={() => console.log("Canceled")}
              className="text-gray-600 hover:text-gray-800 font-semibold w-1/2 border rounded-md border-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-purple-700 w-1/2"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Category Modal */}
      <Modal
        visible={isAddCategoryModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg ">
          <AddCategory handleCancel={handleCancel} refetch={refetch} />
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
            Confirm deleting the Category?
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
    </>
  );
};

export default Categories;
