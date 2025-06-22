import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

const data = [
  { month: "Jan", users: 50000 },
  { month: "Feb", users: 28000 },
  { month: "Mar", users: 58000 },
  { month: "Apr", users: 39000 },
  { month: "May", users: 32000 },
  { month: "June", users: 60000 },
  { month: "July", users: 40000 },
  { month: "Aug", users: 45000 },
  { month: "Sep", users: 62000 },
  { month: "Oct", users: 55000 },
  { month: "Nov", users: 41000 },
  { month: "Dec", users: 58000 },
]

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-yellow-500 text-white px-3 py-2 rounded-lg shadow-lg relative">
        <div className="font-medium">Users</div>
        <div className="text-sm">{payload[0].value.toLocaleString()}</div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-yellow-500"></div>
        </div>
      </div>
    )
  }
  return null
}

export default function PracticeSession() {
  const [selectedYear, setSelectedYear] = useState("2024")

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">User Ratio</h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-blue-500 font-medium">Users</span>
          </div>
        </div>
        <div className="relative">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-32 py-2 px-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="2024">Year-2024</option>
            <option value="2023">Year-2023</option>
            <option value="2022">Year-2022</option>
          </select>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barCategoryGap="40%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#666" }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#666" }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} />
            <Bar dataKey="users" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.month === "June" ? "#D4A574" : "#3B82F6"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
