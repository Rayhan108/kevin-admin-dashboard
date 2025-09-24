import React, { useState, useEffect, useRef } from "react";
import JoditEditor from "jodit-react";
import { useCreateTermsMutation, useGetTermsQuery } from "../../redux/feature/others/othersApi";
import { message } from "antd";

const Terms = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = {
    readonly: false,
    placeholder: "Start typing...",
    height: 600,
    iframe: false,
  };

  // On component mount, load the content from localStorage
  useEffect(() => {
    const savedContent = localStorage.getItem("termsContent");
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

 const { data: terms, refetch } = useGetTermsQuery(undefined);
  const termsData = terms?.data?.termsCondition;
  console.log("privacy data from backend-->", termsData);

  const [addPrivacy] = useCreateTermsMutation();
  // Load saved content from localStorage when the page loads
  useEffect(() => {
    const savedContent = localStorage.getItem("privacyPolicyContent");
    if (savedContent) {
      setContent(savedContent);
    }
    // else{
    //   setContent(privacyData)
    // }
  }, []);

  // Save content to localStorage whenever it changes
  const handleSave = async () => {
    localStorage.setItem("privacyPolicyContent", content);
    const termsContent = {
      termsCondition: content,
    };
    console.log("privacy content->", termsContent);
    // message.success("Privacy Policy Saved Successfully!");
    try {
      const res = await addPrivacy(termsContent).unwrap();
      console.log("privacy content response ---->", res);
      if (res?.success) {
        message.success(res?.message);
        refetch();
      } else {
        message.error(res?.error);
      }
    } catch (error) {
      message.error(error.data?.message);
    }
  };
  return (
    <div>
      <div className="flex justify-between font-title bg-[#2C3E50] px-3 py-2 rounded-md">
        <div className="flex justify-center items-center gap-5">
          <p className="text-[#ffffff] font-title text-3xl font-bold">
            Terms & Condition
          </p>
        </div>
      </div>

      <div className="container min-h-screen mt-16">
        <div className="mt-5 text-black">
          <JoditEditor
            ref={editor}
            value={termsData}
            config={config}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
            onChange={() => {}}
          />
          <div className="text-center w-full">
            <button
              className="bg-[#1D69E1] p-2 text-white mt-2 rounded-lg w-[30%]"
              onClick={handleSave}
            >
              Save Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
