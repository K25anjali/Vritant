import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import UserAvatar from "./UserAvater";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export const LandingBlogCard = ({ blog, translate }) => {
	return (
		<motion.div
			style={{
				x: translate,
			}}
			whileHover={{
				y: -20,
				scale: 1.05,
			}}
			key={blog.title}
			className="group/blog h-80 w-[25rem] relative flex-shrink-0 rounded-lg overflow-hidden"
		>
			<div className="block group-hover/blog:shadow-2xl">
				<img
					src={blog.thumbnail}
					className="object-cover object-left-top absolute h-full w-full inset-0"
					alt={blog.title}
				/>
			</div>
			<div className="absolute inset-0 h-full w-full opacity-0 group-hover/blog:opacity-80 bg-black pointer-events-none"></div>
			<h2 className="absolute bottom-4 left-4 opacity-0 group-hover/blog:opacity-100 text-white">
				By {blog.author}
			</h2>
			<p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover/blog:opacity-100 text-white text-lg">
				{blog.title}
			</p>
		</motion.div>
	);
};

export const BlogCard = ({ blog, user, uuid }) => {
	const navigate = useNavigate();

	const handleDelete = async (id) => {
		try {
			const response = await axios.post("/blog/delete", {
				uuid,
				id,
			});
			if (response.status === 200) {
				toast.success("Blog deleted successfully");
				window.location.reload();
			}
		} catch (error) {
			toast.error("Failed to delete blog");
		}
	};

	return (
		<article
			key={blog.id}
			className="border border-purple-400 p-4 h-full rounded max-w-3xl"
		>
			<div className="flex">
				<div className="w-full flex justify-between">
					<div className="flex space-x-2 text-lg mb-8">
						<UserAvatar userName={blog.author} size="6" />
						<Link to={`/profile/${blog.author}`}>
							<h1 className="hover:underline text-xl font-semibold">
								{blog.author}
							</h1>
							<h3 className="hover:underline text-sm mt-1">
								{blog.name} .{" "}
								<span className="text-purple-400">{blog.category}</span>
							</h3>
						</Link>
					</div>
				</div>
				{user?.followStatus === "self" && (
					<div className="flex items-start justify-center space-x-6">
						<FaEdit
							size={22}
							className="cursor-pointer"
							onClick={() => {
								navigate("/create-post", { state: { blog } });
							}}
						/>
						<MdDelete
							size={22}
							className="cursor-pointer"
							onClick={() => handleDelete(blog.id)}
						/>
					</div>
				)}
			</div>
			<div className="mx-10 text-gray-200">
				<h3 className="font-serif text-3xl font-bold mb-2 leading-tight">
					{blog.blogTitle}
				</h3>
				<p className="leading-relaxed font-serif text-gray-400">
					{blog.blogBody}
				</p>
			</div>
			<p className="text-sm flex justify-end pt-8">
				{new Date(blog.createdAt).toLocaleDateString()}
			</p>
		</article>
	);
};
