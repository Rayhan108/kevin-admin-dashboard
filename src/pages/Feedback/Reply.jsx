import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { message } from "antd";
import { useReplyFeedbackMutation } from "../../redux/feature/feedback/feedbackApi";


const Reply = ({selectedFeedback}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
const [replyFeedback]=useReplyFeedbackMutation()
  const onSubmit = async(data) => {
    const formData = new FormData();

    formData.append(
      "data",
      JSON.stringify({
      message:data.replyMessage
      })
    );

    if (data?.coverImage?.[0]) {
      formData.append("image", data.coverImage[0]);
    }
const id = selectedFeedback?.userId
    try {
      const res = await replyFeedback({payload:formData,id});
      if (res.data) {
        message.success(res?.data?.message);
        reset();
      } else {
        const errorMessage =
          res.error && "data" in res.error && res.error.data?.message
            ? res.error.data.message
            : res.error?.message || "An error occurred";
        message.error(errorMessage);
      }
    } catch (error) {
      message.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  px-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <h2 className="text-white text-2xl font-bold">Feedback</h2>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* User Info */}
          <div className="flex items-center gap-4 border-b pb-4">
            <img
              src={selectedFeedback?.userImg}
              alt="User"
              className="w-14 h-14 rounded-full border shadow-sm"
            />
            <div>
              <p className="text-lg font-semibold text-gray-800">{selectedFeedback?.name}</p>
              <p className="text-sm text-gray-500">{selectedFeedback?.email}</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Reply */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Reply
              </label>
              <textarea
                rows="4"
                placeholder="Write your reply here..."
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                {...register("replyMessage", { required: "Reply is required" })}
              ></textarea>
              {errors.replyMessage && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.replyMessage.message}
                </p>
              )}
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Attach File
              </label>
              <input
                type="file"
                accept="image/*"
                className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                {...register("file")}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between gap-4 pt-4">
              <Link to="/feedback" className="w-1/2">
                <button
                  type="button"
                  className="w-full border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition"
                  onClick={() => reset()}
                >
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                className="w-1/2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow"
              >
                Send Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reply;
