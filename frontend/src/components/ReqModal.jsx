import React from "react";
import { IoMdClose } from "react-icons/io";

const ReqModal = ({ isModalOpen, req, msg, handleAcceptReq, handleRequest, setIsModalOpen }) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-1/2 rounded-lg shadow-lg py-4">
        <div className="mb-4 flex justify-end">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 "
          >
          <IoMdClose size={24}/>
          </button>
        </div>
        <ul className="space-y-2 px-6 py-4">
  {req.length > 0 ? (
    req.map((request) => (
      <li
        key={request.id}
        className="p-2 border-b flex justify-between items-center"
      >
        {request.followerUserName}
        <div className="space-x-3">
          {request.followStatus === "Pending" ? (
            <>
              <button
                onClick={() =>
                  handleAcceptReq(request.followerUserName, "accept")
                }
                className="bg-blue-500 text-white rounded px-2 py-1"
              >
                Accept
              </button>
              <button
                onClick={() =>
                  handleAcceptReq(request.followerUserName, "reject")
                }
                className="bg-red-500 text-white rounded px-2 py-1"
              >
                Reject
              </button>
            </>
          ) : request.followStatus === "accepted" ? (
            <button
              onClick={() =>
                handleRequest("request")
              }
              className="bg-black text-white rounded px-2 py-1"
            >
              {msg}
            </button>
          ) : null}
        </div>
      </li>
    ))
  ) : (
    <p className="text-red-600 text-center my-8">Empty</p>
  )}
</ul>


      </div>
    </div>
  );
};

export default ReqModal;
