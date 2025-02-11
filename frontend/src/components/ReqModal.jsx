import React from "react";
import { IoMdClose } from "react-icons/io";

const ReqModal = ({
	isModalOpen,
	req,
	msg,
	handleAcceptReq,
	handleRequest,
	setIsModalOpen,
}) => {
	if (!isModalOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-opacity-50 flex items-center justify-center"
			style={{ zIndex: 9999 }}
		>
			<div className="bg-gray-900 w-1/2 rounded-lg shadow-lg py-4">
				<div className="mb-4 flex justify-end">
					<button onClick={() => setIsModalOpen(false)} className="px-4 ">
						<IoMdClose size={24} />
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
								<div className="space-x-4">
									{request.followStatus === "pending" ? (
										<>
											<button
												onClick={() =>
													handleAcceptReq(request.followerUserName, "accept")
												}
												className="bg-purple-500 text-white rounded px-2 py-1"
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
											onClick={() => handleRequest("request")}
											className="bg-purple-400 text-gray-100 rounded px-2 py-1"
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
