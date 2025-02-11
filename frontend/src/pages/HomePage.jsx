import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
import { HomeNavbar } from "../components/Navbar";
import { BlogCard } from "../components/Card";
import { Link } from "react-router-dom";

const HeroPage = () => {
	const [blogs, setBlogs] = useState([]);
	const [users, setUsers] = useState([]);
	const userDetail = JSON.parse(sessionStorage.getItem("user"));
	const uuid = userDetail ? userDetail.uuid : null;
	const userName = userDetail ? userDetail.userName : "";

	useEffect(() => {
		const fetchBlogsAndUsers = async () => {
			try {
				const blogResponse = await axios.get("/blog/all");
				setBlogs(blogResponse.data.blogs);
				const userResponse = await axios.get("/user/all");
				setUsers(userResponse.data.users);
			} catch (error) {
				toast.error("Error fetching data");
			}
		};
		fetchBlogsAndUsers();
	}, []);

	return (
		<div className="relative min-h-screen flex flex-col bg-black/90 text-white overflow-hidden">
			{/* Background Blobs */}
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl ">
				<div className="absolute top-0 left-0 w-72 h-64 bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob overflow-y-hidden "></div>
				<div className="absolute top-0 right-0 w-72 h-72 bg-pink-900 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
				<div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-900 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
			</div>

			<div className="relative max-w-7xl mx-auto">
				<HomeNavbar users={users} uuid={uuid} userName={userName} />
			</div>

			<div className="relative max-w-7xl mx-auto h-auto mb-20 z-10">
				<motion.div className="grid grid-cols-1 gap-8 my-10">
					{blogs.length > 0 ? (
						blogs.map((blog) => (
							<BlogCard key={blog.id} blog={blog} user={userDetail} />
						))
					) : (
						<p className="text-center text-gray-400">No blogs available</p>
					)}
				</motion.div>
			</div>
			<footer className="bg-zinc-800 text-zinc-300 w-full z-50">
				<div className="border-t border-b border-gray-700 text-gray-400 flex justify-center items-center">
					<p className="py-6 text-center">
						&copy; {new Date().getFullYear()} Vritant. Made with ❤️ by{" "}
						<Link to="https://github.com/K25anjali">Anjali</Link>
					</p>
				</div>
			</footer>
		</div>
	);
};

export default HeroPage;
