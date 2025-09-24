import { useDashboardStatsQuery } from "../../redux/feature/others/othersApi";

const Overview = () => {
    const { data: stats } = useDashboardStatsQuery(undefined);
    return (
        <div className="grid grid-cols-5 gap-5 mb-3 p-5 bg-white shadow-md rounded-lg">
            {/* Total User Section */}
            <div className="flex flex-col justify-center items-center p-6 bg-blue-50 rounded-lg shadow-md">
                <p className="font-title font-bold text-3xl text-blue-600">{stats?.data?.totalUsers}</p>
                <p className="font-title text-lg text-gray-700">Total Users</p>
            </div>

            {/* Total Clients Section */}
            <div className="flex flex-col justify-center items-center p-6 bg-green-50 rounded-lg shadow-md">
                <p className="font-title font-bold text-3xl text-green-600">{stats?.data?.totalClient}</p>
                <p className="font-title text-lg text-gray-700">Total Clients</p>
            </div>

            {/* Total VIP Clients Section */}
            <div className="flex flex-col justify-center items-center p-6 bg-purple-50 rounded-lg shadow-md">
                <p className="font-title font-bold text-3xl text-purple-600">{stats?.data?.totalVipMember}</p>
                <p className="font-title text-lg text-gray-700">Total VIP Clients</p>
            </div>

            {/* Total Contractors Section */}
            <div className="flex flex-col justify-center items-center p-6 bg-yellow-50 rounded-lg shadow-md">
                <p className="font-title font-bold text-3xl text-yellow-600">{stats?.data?.totalContractor}</p>
                <p className="font-title text-lg text-gray-700">Total Contractors</p>
            </div>

            {/* Total VIP Contractors Section */}
            <div className="flex flex-col justify-center items-center p-6 bg-red-50 rounded-lg shadow-md">
                <p className="font-title font-bold text-3xl text-red-600">{stats?.data?.totalVipContractor}</p>
                <p className="font-title text-lg text-gray-700">Total VIP Contractors</p>
            </div>
        </div>
    );
};

export default Overview;
