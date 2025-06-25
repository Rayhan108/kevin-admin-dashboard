import userImg from '../../assets/Ellipse 1.png';
const Reply = () => {
    return (
        <div>
                  <div className="flex justify-between font-title bg-[#2C3E50] px-3 py-2 rounded-md">
        <div className="flex justify-center items-center gap-5">
          <p className="text-[#ffffff] font-title text-3xl font-bold">Feedback</p>
        </div>
      </div>
       <div className=" mx-auto p-6 bg-white rounded-xl min-h-screen space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">User Info</h2>

      <div className="flex items-center space-x-4">
        <img
          src={userImg}
          alt="User"
          className="w-14 h-14 rounded-full"
        />
        <div>
          <h3 className="text-lg font-medium text-gray-900">John Doe</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <span className="font-semibold">User Type</span>: Client
        </div>
        <div>
          <span className="font-semibold">Issue</span>: Reporting unprofessionalism
        </div>
        <div>
          <span className="font-semibold">Project Name</span>: John Doe House Painting
        </div>
        <div>
          <span className="font-semibold">Issue Date</span>: 04-05-25
        </div>
        <div>
          <span className="font-semibold">Contractor</span>: Alberto Deiman
        </div>
        <div>
          <span className="font-semibold">Contractor ID</span>: 1213
        </div>
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-2">Reply</label>
        <textarea
          rows="4"
          placeholder="Describe your issue or question"
          className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        ></textarea>
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-2">Attach File</label>
        <input
          type="file"
          className="block text-sm text-gray-500 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 hover:file:bg-gray-200"
        />
      </div>

      <div className="flex gap-3 w-full mt-4">
        <button className="border border-[#4E46B4] text-[#4E46B4] px-6 py-2 rounded-md hover:bg-blue-50 w-1/2">
          Cancel
        </button>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 w-1/2">
          Send Feedback
        </button>
      </div>
    </div>
        </div>
    );
};

export default Reply;