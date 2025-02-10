import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Input, Button } from "../components/Ui";
import { motion } from "framer-motion";

const BlogPage = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [category, setCategory] = useState("");
	const [blogId, setBlogId] = useState("");
	const [isEditBlog, setIsEditBlog] = useState(false);
	const navigate = useNavigate();
	const userDetail = JSON.parse(sessionStorage.getItem("user"));
	const uuid = userDetail?.uuid;

	const location = useLocation();

	useEffect(() => {
		if (location.state?.blog) {
			setBlogId(location.state.blog.id);
			setTitle(location.state.blog.blogTitle);
			setContent(location.state.blog.blogBody);
			setCategory(location.state.blog.category);
			setIsEditBlog(true);
		}
	}, [location]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!title || !content || !category) {
			toast.error("All fields are required!");
			return;
		}

		try {
			let response;
			if (isEditBlog) {
				response = await axios.post("/blog/update", {
					uuid,
					blogBody: content,
					blogTitle: title,
					category,
					blogId,
				});
				if (response.status === 200) {
					toast.success("Blog updated successfully");
					navigate(`/profile/${response.data.updatedBlog.author}`);
				}
			} else {
				response = await axios.post("/blog/new", {
					uuid,
					blogTitle: title,
					blogBody: content,
					category,
				});
				if (response.status === 200) {
					toast.success(response.data.message);
					navigate("/home");
				}
			}
			setTitle("");
			setContent("");
			setCategory("");
		} catch (err) {
			toast.error("Login expired. Please login again.");
			navigate("/");
		}
	};

	return (
		<div className="relative h-screen flex items-center justify-center bg-black font-serif overflow-hidden">
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-lg p-8 space-y-6 rounded-lg shadow-md bg-gray-900 z-50"
			>
				<h1 className="text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 border-b border-gray-400 pb-3">
					{isEditBlog ? "Edit Blog Post" : "Create a New Post"}
				</h1>
				<form onSubmit={handleSubmit} className="mt-4">
					<div>
						<label className="block text-gray-900">Title</label>
						<Input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
					</div>
					<div>
						<label className="block text-gray-900">Content</label>
						<textarea
							value={content}
							onChange={(e) => setContent(e.target.value)}
							className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-transparent transition"
							rows="5"
							required
						/>
					</div>
					<div className="mb-2">
						<label className="block text-gray-900">Category</label>
						<select
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-transparent transition"
							required
						>
							<option value="" disabled>
								Select a category
							</option>
							<option value="Technology">Technology</option>
							<option value="Health">Health</option>
							<option value="Lifestyle">Lifestyle</option>
							<option value="Education">Education</option>
							<option value="Travel">Travel</option>
						</select>
					</div>
					<div>
						<Button type="submit" className="text-sm w-full mt-8">
							{isEditBlog ? "Update Blog" : "Publish Post"}
						</Button>
					</div>
				</form>
			</motion.div>
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl">
				<div className="absolute top-0 left-0 w-72 h-72 bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
				<div className="absolute top-0 right-0 w-72 h-72 bg-pink-900 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
				<div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-900 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
			</div>
		</div>
	);
};

export default BlogPage;
