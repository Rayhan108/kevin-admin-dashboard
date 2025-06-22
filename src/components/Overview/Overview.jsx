const Overview = () => {
    return (
        <div className="grid grid-cols-3 border-2 shadow-sm bg-[#ffffff] gap-5 mb-3">
            {/* Total User Section */}
            <div className="text-black  w-full">
                <div className="flex flex-col justify-center items-center px-16 py-5 border-r border-black my-3">
                    <p className="font-title font-bold text-xl pt-2">18.6K</p>
                    <p className="font-title text-xl pb-2">Total User</p>
                </div>
            </div>

            {/* Total Clients Section */}
            <div className="text-black border-r border-black my-3 w-full">
                <div className="flex flex-col justify-center items-center px-16 py-5">
                    <p className="font-title font-bold text-xl pt-2">18.6K</p>
                    <p className="font-title text-xl pb-2">Total Clients</p>
                </div>
            </div>

            {/* Total Contractor Section */}
            <div className="text-black  w-full">
                <div className="flex flex-col justify-center items-center px-16 py-5">
                    <p className="font-title font-bold text-xl pt-2">20.9K</p>
                    <p className="font-title text-xl pb-2">Total Contractor</p>
                </div>
            </div>
        </div>
    );
};

export default Overview;
