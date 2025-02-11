import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReqModal from "../components/ReqModal";
import EditProfileModal from "../components/EditProfileModal";
import { BlogCard } from "../components/Card";
import UserAvatar from "../components/UserAvater";
import { motion } from "framer-motion";
import { Button } from "../components/Ui";

const UserProfile = () => {
	const [user, setUser] = useState({});
	const { userName } = useParams();
	const navigate = useNavigate();

	const userDetail = JSON.parse(sessionStorage.getItem("user"));
	const uuid = userDetail?.uuid;

	const [blogs, setBlogs] = useState([]);
	const [req, setReq] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditProfile, setIsEditProfile] = useState(false);
	const [msg, setMsg] = useState("Follow");

	// Fetch User Data
	const fetchUser = async () => {
		try {
			const response = await axios.post("/user/getUser", {
				userName,
				uuid,
			});
			setUser(response.data);
		} catch (error) {
			console.error("Error fetching users:", error);
			if (error.response?.status === 401) {
				toast.warning("Please Login again");
				navigate("/login");
			}
		}
	};

	// Fetch Blogs
	const fetchBlogs = useCallback(
		async (limit, offset) => {
			try {
				const response = await axios.post(
					`/blog/limited?LIMIT=${limit}&OFFSET=${offset}`,
					{
						uuid,
						userName,
					},
				);

				if (response.status === 200) {
					setBlogs(response.data.blogs);
				}
			} catch (error) {
				console.error("Error fetching blogs:", error);
				if (error.response?.status === 401) {
					toast.warning("Please Login again");
					navigate("/login");
				}
			}
		},
		[uuid, userName, navigate],
	);

	useEffect(() => {
		fetchUser();
		fetchBlogs(5, 0);
	}, []);

	// Send Follow Request
	const sendFollowRequest = async (uuid, followingUserName, action) => {
		try {
			const response = await axios.post("/follow/request", {
				uuid,
				followingUserName,
				action,
			});
			if (response.status == 200) {
				toast.success(response.data.message);
				setMsg("Sent");
			}
		} catch (error) {
			console.error("Error:", error.response?.data?.error || error.message);
			if (error.response?.status === 401) {
				toast.warning("Please Login");
				navigate("/login");
			}
			toast.error(error.response?.data?.error);
		}
	};

	const handleRequest = () => {
		sendFollowRequest(uuid, userName, "request");
		// window.location.reload();
	};

	const showAllReq = async (action) => {
		setIsModalOpen(true);
		try {
			const res = await axios.post("/follow/all", { uuid, userName, action });
			setReq(res.data.follow);
		} catch (error) {
			console.error(error);
		}
	};

	const handleAcceptReq = async (followerUserName, action) => {
		try {
			const res = await axios.post("/follow/action", {
				uuid,
				followerUserName,
				action,
			});
			toast.success(res.data.message);
			window.location.reload();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="relative min-h-screen flex flex-col bg-black/90 text-white">
			{/* Background Blobs */}
			<div className="absolute inset-0 overflow-hidden">
				<motion.div
					className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
					animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
					transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
				/>
				<motion.div
					className="absolute top-20 right-20 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
					animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 2,
					}}
				/>
				<motion.div
					className="absolute bottom-20 left-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
					animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 4,
					}}
				/>
				<motion.div
					className="absolute bottom-0 right-1/3 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
					animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 3,
					}}
				/>
			</div>

			{/* User Profile Info */}
			<div className="z-10 flex flex-col items-center justify-center flex-grow text-white pt-16">
				<div className="flex space-x-6 justify-center items-center">
					<UserAvatar size={14} />
					<div>
						<h1 className="text-4xl font-bold">{userName}</h1>
						<p className="font-semibold mt-1">{user.name}</p>
					</div>
				</div>

				{/* Follow & Requests Section */}
				<div
					className={`flex items-center justify-between ${
						user.followStatus == "self" ? "w-[35vw]" : "w-[20vw] flex-shrink"
					} mt-6`}
				>
					<button
						onClick={() => showAllReq("accepted")}
						className="font-semibold text-2xl flex flex-col justify-center items-center"
					>
						{user.followerCount} <span className="text-base">Followers</span>
					</button>
					<div className="h-6 w-px bg-gray-400" />
					<button className="font-semibold text-2xl flex flex-col justify-center items-center">
						{user.followingCount} <span className="text-base">Following</span>
					</button>

					{user.followStatus === "self" && (
						<>
							<div className="h-6 w-[0.2px] bg-gray-400" />
							<button
								onClick={() => showAllReq("pending")}
								className="font-semibold text-2xl flex flex-col justify-center items-center"
							>
								{user.followReqCount}{" "}
								<span className="text-base">Requests</span>
							</button>
						</>
					)}
				</div>

				<p className="mt-4">
					Manage your posts and explore your blog activity.
				</p>

				{/* Buttons */}
				<div className="mt-12 space-x-8 flex items-center">
					{user.followStatus === "self" ? (
						<>
							<Link to="/create-post">
								<Button className="w-40">Create New Post</Button>
							</Link>
							<Button
								onClick={() => setIsEditProfile(!isEditProfile)}
								className="w-40"
							>
								Edit Profile
							</Button>
						</>
					) : (
						<button
							onClick={handleRequest}
							className={`bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300 ease-in-out w-36`}
						>
							{user.followStatus === "pending"
								? "Requested"
								: user.followStatus === "accepted"
								? "Following"
								: "Follow"}
						</button>
					)}
				</div>
			</div>

			{/* Posts Section */}
			<div className="w-full flex flex-col justify-center items-center">
				<h2 className="mt-8 text-2xl border-b border-gray-400 pb-4 w-[80vw] text-start">
					Your All Posts
				</h2>
				<div className="w-[50rem] mb-20 z-50">
					<motion.div className="w-full grid grid-cols-1 gap-8 my-10">
						{blogs.length > 0 ? (
							blogs.map((blog) => (
								<BlogCard key={blog.id} blog={blog} uuid={uuid} user={user} />
							))
						) : (
							<p className="text-center text-gray-400">No blogs available</p>
						)}
					</motion.div>
				</div>
			</div>

			<footer className="bg-zinc-800 text-zinc-300 w-full mt-auto z-10">
				<div className="border-t border-b border-gray-700 text-gray-400 flex justify-center items-center">
					<p className="py-8 text-center">
						&copy; {new Date().getFullYear()} Vritant. Made with ❤️ by{" "}
						<Link to="https://github.com/K25anjali">Anjali</Link>
					</p>
				</div>
			</footer>

			{/* Modals */}
			<ReqModal
				isModalOpen={isModalOpen}
				req={req}
				msg={msg}
				handleAcceptReq={handleAcceptReq}
				handleRequest={handleRequest}
				setIsModalOpen={setIsModalOpen}
			/>
			<EditProfileModal
				isEditProfile={isEditProfile}
				setIsEditProfile={setIsEditProfile}
				userDetail={userDetail}
			/>
		</div>
	);
};

export default UserProfile;
