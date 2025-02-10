import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UserAvatar from "./UserAvater";

const EditProfileModal = ({ isEditProfile, setIsEditProfile, userDetail }) => {

  const [name, setName] = useState(userDetail.name);
  const [email, setEmail] = useState(userDetail.email);
  const [password, setPassword] = useState("");

  const uuid = userDetail.uuid
  const userName = userDetail.userName
  if (!isEditProfile) return null;

  const updateProfile = async () => {
    try {
      const response = await axios.post("/user/update", { uuid, userName, name, email, password });
      console.log(response.data);
      const updatedUser = { ...userDetail, name, email }; 
      sessionStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Profile updated successfully!");
      setIsEditProfile(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white max-w-2xl rounded-lg shadow-lg p-6 flex flex-col justify-center">
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setIsEditProfile(false)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800"
          >
            Close
          </button>
        </div>
        <div className="flex justify-center items-center space-x-10 p-10">
          <div className="space-y-2 flex flex-col justify-center items-center">
            <UserAvatar size={10} />
            <h1 className="text-lg font-semibold">{userName}</h1>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-b p-1 border-gray-800 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-b p-1 border-gray-800 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-b p-1 border-gray-800 focus:outline-none"
            />
          </div>
        </div>
        <button
          type="submit"
          onClick={updateProfile}
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 my-4"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditProfileModal;
