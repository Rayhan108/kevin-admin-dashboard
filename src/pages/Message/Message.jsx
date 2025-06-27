// Updated Message UI based on design
"use client";

import { Input } from "antd";
import { FiSend, FiPaperclip } from "react-icons/fi";
import { BiSolidFlag } from "react-icons/bi";
import userImg1 from '../../assets/Ellipse 1.png';
import socketImg from '../../assets/choket.png';
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

const Message = () => {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);

  const messages = [
    {
      id: 1,
      sender: "robert",
      time: "10:16",
      type: "text",
      content:
        "Vel et commodo et scelerisque aliquam. Sed libero, non praesent felis, sem eget venenatis neque...",
    },
    {
      id: 2,
      sender: "robert",
      time: "10:16",
      type: "image",
      content: socketImg,
    },
    {
      id: 3,
      sender: "me",
      time: "11:04",
      type: "text",
      content:
        "Vestibulum viverra lacus, congue scelerisque neque. Vivamus cur...",
    },
    {
      id: 4,
      sender: "robert",
      time: "10:16",
      type: "text",
      content:
        "Vel et commodo et scelerisque aliquam. Sed libero, non praesent felis, sem eget venenatis neque...",
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Message sent:", message);
      setMessage("");
    }
    if (files.length) {
      files.forEach((file) => {
        console.log("File uploaded:", file.name);
      });
      setFiles([]);
    }
  };

  const handleFileUpload = (e) => {
    const uploaded = e.target.files;
    if (uploaded) {
      setFiles((prev) => [...prev, ...Array.from(uploaded)]);
    }
  };

  return (
    <div>
    <div className="flex justify-between font-title bg-[#2C3E50] px-3 py-2 rounded-md">
        <div className="flex justify-center items-center gap-5">
          <p className="text-[#ffffff] font-title text-3xl font-bold flex items-center gap-3">
            <Link to="/booking">
            <FaArrowLeft />
            </Link>
           Inspect Message
          </p>
        </div>
        <div className="flex gap-5">
          <div className="relative w-full sm:w-[300px]">
            <Input
              type="text"
              placeholder="Search anything here..."
              className="border border-[#e5eaf2] py-3 outline-none w-full rounded-xl px-3"
            />
            <span className="text-gray-500 absolute top-0 right-0 h-full px-5 flex items-center justify-center cursor-pointer">
              <IoSearch className="text-[1.3rem]" />
            </span>
          </div>
        </div>
      </div>
      {/* inbox */}

    <div className="bg-white rounded-lg p-6 py-16">
      <h2 className="text-xl text-black font-bold mb-4">
        Conversation In Project Ellie Hose Painting
      </h2>

      <div className="space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender !== "me" && (
              <div className="flex flex-col items-center mr-2 ">
                <img
                  src={userImg1}
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <button className="text-red-500 text-xs mt-1 flex items-center gap-1 border p-1 border-red-300">
                  <BiSolidFlag className="text-sm" /> Flag, Robert
                </button>
              </div>
            )}

            <div>
              <p className="text-xs text-black mb-1">{msg.time}</p>
              {msg.type === "text" ? (
                <div className="bg-[#E8F0FE] text-black px-4 py-2 rounded-xl max-w-md text-sm">
                  {msg.content}
                </div>
              ) : (
                <img src={msg.content} alt="shared" className="w-48 rounded-lg mt-1" />
              )}
            </div>

            {msg.sender === "me" && (
              <div className="ml-2 flex flex-col items-center">
                <img
                  src={userImg1}
                  alt="Me"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <button className="text-red-500 text-xs mt-1 flex items-center gap-1 border p-1 border-red-300">
                  <BiSolidFlag className="text-sm" /> Flag, Ellie
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="mt-6 flex items-center gap-3 border-t pt-4">
        <label className="text-gray-500 cursor-pointer">
          <FiPaperclip className="w-5 h-5" />
          <input
            type="file"
            className="hidden"
            multiple
            onChange={handleFileUpload}
          />
        </label>
        <Input
          placeholder="Type your message..."
          className="flex-1 py-2 px-4 rounded-full border border-gray-300"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-2 rounded-full"
        >
          <FiSend className="w-4 h-4" />
        </button>
      </div>
    </div>
    </div>
  );
};

export default Message;
