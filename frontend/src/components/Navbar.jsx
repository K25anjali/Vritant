import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { MdLogout } from "react-icons/md"; // Import the logout icon
import { Button, Input } from "./Ui";
import UserAvatar from "./UserAvater";

export const Navbar = () => {
	return (
		<nav className="bg-transparent border rounded-md w-5/6 flex items-center mt-6 font-serif z-50">
			<div className="flex items-center justify-between w-full py-2 px-4">
				<Link
					to="/"
					className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
				>
					Vritant
				</Link>
				<div className="space-x-4">
					<Link
						to="/home"
						className="text-gray-300 hover:bg-zinc-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
					>
						Explore Blogs
					</Link>
					<Link
						to="/login"
						className="text-gray-300 hover:bg-zinc-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
					>
						Profile
					</Link>
					<Link
						to="/login"
						className="text-gray-300 hover:bg-zinc-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
					>
						Log In
					</Link>
					<Link to="/register">
						<Button>Sign Up</Button>
					</Link>
				</div>
			</div>
		</nav>
	);
};

export const HomeNavbar = ({ users, uuid, userName }) => {
	const [search, setSearch] = useState("");
	const [filteredUsers, setFilteredUsers] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => {
			setFilteredUsers(
				users.filter(
					(user) =>
						user.userName.toLowerCase().includes(search.toLowerCase()) ||
						user.name.toLowerCase().includes(search.toLowerCase()),
				),
			);
		}, 300);

		return () => clearTimeout(timer);
	}, [search, users]);

	const handleLogout = async () => {
		try {
			const res = await axios.post("/user/logout", { uuid });
			if (res.status === 200) {
				toast.success("Logout successful");
				navigate("/");
				sessionStorage.removeItem("user");
			}
		} catch (error) {
			toast.error("Failed to Logout, Please try later");
		}
	};

	return (
		<nav className="bg-transparent border rounded-md flex items-center mt-6 font-serif z-50 fixed top-0">
			<div className="flex items-center justify-between w-[80vw] py-2 px-4">
				<Link
					to="/"
					className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
				>
					Vritant
				</Link>
				<div className="space-x-4 flex items-center ">
					<div className="relative z-1000">
						<Input
							id="search"
							type="text"
							required
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search users..."
							className="w-72"
						/>
						{filteredUsers.length > 0 && search.length > 1 && (
							<ul className="absolute bg-gray-900 w-full rounded-md mt-2 px-2">
								{filteredUsers.map((user) => (
									<li className="border-b-[0.1px] border-purple-300 pb-2">
										<Link
											to={`/profile/${user.userName}`}
											key={user.userName}
											className="block px-4 py-2"
										>
											<div className="flex items-center space-x-4">
												<UserAvatar size={6} userName={user.userName} />
												<div>
													<p className="text-base font-light hover:underline">
														{user.userName}
													</p>
													<p className="text-xs font-light hover:underline">
														{user.name}
													</p>
												</div>
											</div>
										</Link>
									</li>
								))}
							</ul>
						)}
					</div>
					{uuid != null && (
						<div className="flex items-center space-x-2">
							<UserAvatar userName={userName} size={6} />
							<button
								onClick={handleLogout}
								className="text-gray-300 hover:bg-zinc-700 hover:text-white px-3 py-2 rounded-md"
							>
								<MdLogout size={30} />
							</button>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};
