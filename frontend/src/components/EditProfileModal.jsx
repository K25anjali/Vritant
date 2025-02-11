import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UserAvatar from "./UserAvater";
import { Input, Button } from "./Ui";

const EditProfileModal = ({ isEditProfile, setIsEditProfile, userDetail }) => {
	const [name, setName] = useState(userDetail.name);
	const [email, setEmail] = useState(userDetail.email);
	const [password, setPassword] = useState("");

	const uuid = userDetail.uuid;
	const userName = userDetail.userName;
	if (!isEditProfile) return null;

	const updateProfile = async () => {
		try {
			const response = await axios.post("/user/update", {
				uuid,
				userName,
				name,
				email,
				password,
			});
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
		<div
			className=" fixed inset-0  bg-opacity-50 flex items-center justify-center"
			style={{ zIndex: 9999 }}
		>
			<div className="bg-gray-900 w-[500px] h-auto rounded-lg shadow-lg p-6 flex flex-col justify-center">
				<div className="mt-4 flex justify-end">
					<button
						onClick={() => setIsEditProfile(false)}
						className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800"
					>
						Close
					</button>
				</div>
				<div className="flex justify-center items-center space-x-10 p-10 my-5 ">
					<div className="space-y-2 flex flex-col justify-center items-center">
						<UserAvatar size="12" />
						<h1 className="text-lg font-semibold">{userName}</h1>
					</div>
					<div className="flex flex-col items-center space-y-4">
						<Input
							type="text"
							placeholder="Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<Input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
				</div>
				<Button type="submit" onClick={updateProfile}>
					Update
				</Button>
			</div>
		</div>
	);
};

export default EditProfileModal;
