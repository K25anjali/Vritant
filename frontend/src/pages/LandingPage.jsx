import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { PenSquare, Users, Search, MessageSquare } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Button, Input } from "../components/Ui";
import { LandingBlogCard } from "../components/Card";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const blogs = [
	{
		title: "A high-quality blog designed to meet your needs.",
		thumbnail: "https://picsum.photos/600/600?random=1",
		author: "John Doe",
	},
	{
		title: "An innovative solution for everyday challenges.",
		thumbnail: "https://picsum.photos/600/600?random=2",
		author: "Jane Smith",
	},
	{
		title: "Built for performance and reliability.",
		thumbnail: "https://picsum.photos/600/600?random=3",
		author: "Chris Johnson",
	},
	{
		title: "Sleek design with modern features.",
		thumbnail: "https://picsum.photos/600/600?random=4",
		author: "Emily Brown",
	},
	{
		title: "The ultimate choice for those who value quality.",
		thumbnail: "https://picsum.photos/600/600?random=5",
		author: "Michael Lee",
	},
	{
		title: "Efficient and easy-to-use blog for busy people.",
		thumbnail: "https://picsum.photos/600/600?random=6",
		author: "Sarah Wilson",
	},
	{
		title: "Crafted with precision for superior performance.",
		thumbnail: "https://picsum.photos/600/600?random=7",
		author: "David Kim",
	},
	{
		title: "An affordable option without compromising on quality.",
		thumbnail: "https://picsum.photos/600/600?random=8",
		author: "Linda Clark",
	},
	{
		title: "A versatile blog that fits various use cases.",
		thumbnail: "https://picsum.photos/600/600?random=9",
		author: "James Taylor",
	},
];

const LandingPage = () => {
	const navigate = useNavigate();

	if (!blogs || blogs.length === 0) {
		return <p className="text-center text-gray-500">No blogs available</p>;
	}

	const firstRow = blogs.slice(0, 5);
	const secondRow = blogs.slice(5, 10);

	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});

	const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

	const translateX = useSpring(
		useTransform(scrollYProgress, [0, 1], [0, 1000]),
		springConfig,
	);
	const translateXReverse = useSpring(
		useTransform(scrollYProgress, [0, 1], [0, -1000]),
		springConfig,
	);
	const rotateX = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [15, 0]),
		springConfig,
	);
	const opacity = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
		springConfig,
	);
	const rotateZ = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [20, 0]),
		springConfig,
	);
	const translateY = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [-700, -10]),
		springConfig,
	);

	return (
		<div
			ref={ref}
			className="h-auto overflow-hidden antialiased relative flex flex-col self-auto perspective-1000 transform-style-preserve-3d bg-black justify-center items-center"
		>
			<Navbar />
			<div className="max-w-7xl">
				<Header />
				<motion.div
					style={{
						rotateX,
						rotateZ,
						translateY,
						opacity,
					}}
				>
					<motion.div className="flex flex-row-reverse space-x-reverse space-x-10 mb-20">
						{firstRow.map((blog) => (
							<LandingBlogCard
								blog={blog}
								translate={translateX}
								key={blog.title}
							/>
						))}
					</motion.div>
					<motion.div className="flex flex-row mb-20 space-x-10">
						{secondRow.map((blog) => (
							<LandingBlogCard
								blog={blog}
								translate={translateXReverse}
								key={blog.title}
							/>
						))}
					</motion.div>
				</motion.div>
			</div>
			{/* Features Section */}
			<section className="relative py-20 bg-zinc-800 text-white overflow-hidden mb-20">
				<div className="flex items-center justify-center mx-auto px-20 relative z-10">
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center ">
						<div className="flex flex-col items-center gap-4">
							<PenSquare className="h-10 w-10 text-purple-400" />
							<h3 className="text-xl font-semibold">Effortless Blogging</h3>
							<p className="text-gray-300 max-w-xs">
								Craft and share your stories with our intuitive,
								distraction-free editor.
							</p>
						</div>

						<div className="flex flex-col items-center gap-4">
							<Users className="h-10 w-10 text-purple-400" />
							<h3 className="text-xl font-semibold">Vibrant Community</h3>
							<p className="text-gray-300 max-w-xs">
								Connect with like-minded individuals and grow your network.
							</p>
						</div>

						<div className="flex flex-col items-center gap-4">
							<Search className="h-10 w-10 text-purple-400" />
							<h3 className="text-xl font-semibold">Smart Discovery</h3>
							<p className="text-gray-300 max-w-xs">
								Find content that resonates with you through our AI-powered
								recommendations.
							</p>
						</div>

						<div className="flex flex-col items-center gap-4">
							<MessageSquare className="h-10 w-10 text-purple-400" />
							<h3 className="text-xl font-semibold">Engaging Discussions</h3>
							<p className="text-gray-300 max-w-xs">
								Spark conversations and exchange ideas with readers and writers
								alike.
							</p>
						</div>
					</div>
				</div>

				{/* Background Blobs */}
				<div className="absolute inset-0 flex justify-center items-center overflow-hidden">
					<div className="absolute top-0 left-0 w-72 h-72 bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
					<div className="absolute top-10 right-10 w-72 h-72 bg-pink-700 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
					<div className="absolute bottom-10 left-20 w-72 h-72 bg-blue-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
				</div>
			</section>

			<section className="py-20 bg-gradient-to-r from-purple-900 to-pink-900 text-white w-full">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-4xl font-bold mb-6">
						Ready to Share Your Story?
					</h2>
					<p className="text-xl mb-8 max-w-2xl mx-auto">
						Join Vritant today and become part of a global community of
						passionate storytellers and readers.
					</p>
					<div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
						<Input
							type="email"
							placeholder="Enter your email"
							className="w-full sm:w-64 p-3"
						/>
						<button
							onClick={() => navigate("/register")}
							size="lg"
							className="w-full sm:w-auto p-3 font-semibold bg-white text-purple-600 hover:bg-gray-200 transition-colors rounded"
						>
							Get Started for Free
						</button>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default LandingPage;

export const Header = () => {
	const navigate = useNavigate();

	return (
		<div className="max-w-7xl mx-auto py-20 md:py-40 px-4 w-full left-0 top-0 space-y-8">
			<h1 className="text-2xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
				Unleash Your Voice, <br />{" "}
				<span className="text-white">Inspire the World</span>
			</h1>
			<p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
				Join Vritant, where every story finds its audience. Create, connect, and
				captivate with your unique perspective.
			</p>
			<Button className="z-1000" onClick={() => navigate("/register")}>
				Get Started
			</Button>
		</div>
	);
};
