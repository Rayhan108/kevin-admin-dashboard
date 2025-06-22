"use client"
import { Table, Avatar, Button, Space } from "antd"
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons"
import userImg from '../../assets/Ellipse 1.png'
const UserTable = () => {
  const columns = [
    {
      title: "S.ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      align: 'center', // Center-align the column
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text, record) => (
        <Space>
          <Avatar src={record.avatar} size={32} />
          <span>{text}</span>
        </Space>
      ),
      align: 'center', // Center-align the column
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: 'center', // Center-align the column
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      align: 'center', // Center-align the column
    },
    {
      title: "Joining Date",
      dataIndex: "joiningDate",
      key: "joiningDate",
      align: 'center', // Center-align the column
    },
    {
      title: "User Type",
      dataIndex: "userType",
      key: "userType",
      render: (userType) => <span>{userType}</span>, // Removed the Tag component
      align: 'center', // Center-align the column
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" align="center">
          <Button
            type="text"
            icon={<DeleteOutlined />}
            style={{ color: "#ff4d4f" }}
            onClick={() => handleDelete(record.key)}
          />
          <Button
            type="text"
            icon={<EyeOutlined />}
            style={{ color: "#1890ff" }}
            onClick={() => handleView(record.key)}
          />
        </Space>
      ),
      align: 'center', // Center-align the column
    },
  ]

  const data = [
    {
      key: "1",
      id: "01",
      fullName: "Robert Fox",
      email: "abc@gmail.com",
      address: "36 Guild Street Lon...",
      joiningDate: "",
      userType: "Client",
      avatar:userImg,
    },
    {
      key: "2",
      id: "02",
      fullName: "Robert Fox",
      email: "abc@gmail.com",
      address: "36 Guild Street Lon...",
      joiningDate: "02-24-2024",
      userType: "Contractor",
      avatar:userImg,
    },
    {
      key: "3",
      id: "03",
      fullName: "Robert Fox",
      email: "abc@gmail.com",
      address: "36 Guild Street Lon...",
      joiningDate: "02-24-2024",
      userType: "Client",
      avatar:userImg,
    },
    {
      key: "4",
      id: "04",
      fullName: "Robert Fox",
      email: "abc@gmail.com",
      address: "36 Guild Street Lon...",
      joiningDate: "02-24-2024",
      userType: "Client",
      avatar:userImg,
    },
  ]

  const handleDelete = (key) => {
    console.log("Delete user with key:", key)
    // Add your delete logic here
  }

  const handleView = (key) => {
    console.log("View user with key:", key)
    // Add your view logic here
  }

  return (
    <div style={{ padding: "10px" }}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          padding: '5px', 
        }}
      />
    </div>
  )
}

export default UserTable
