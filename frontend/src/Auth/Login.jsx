import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateHash } from "../utils/hash";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Input } from "../components/Ui";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	const fetchApi = async (email, hashedPassword) => {
		try {
			const response = await axios.post("/user/login", {
				email,
				password: hashedPassword,
			});
			return response;
		} catch (error) {
			console.error("Error while logging in:", error);
			toast.error("Email or password is not correct", {
				position: "top-right",
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const hashedPassword = generateHash(password);

		try {
			setIsLoading(true);
			const response = await fetchApi(email, hashedPassword);
			setIsLoading(false);

			if (response.status === 200) {
				console.log("Login successful", response.data.user);
				sessionStorage.setItem("user", JSON.stringify(response.data.user));
				toast.success("Login successful!", { position: "top-center" });
				navigate(`/home`);
			}
		} catch (error) {
			setIsLoading(false);
			console.error(error.message);
		}
	};

	return (
		<div className="relative min-h-screen flex items-center justify-center bg-black font-serif overflow-hidden">
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-lg p-8 space-y-6 rounded-lg shadow-md bg-gray-900 z-50"
			>
				<div className="text-center">
					<h2 className="text-3xl font-bold text-white">
						Login to{" "}
						<span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 text-4xl">
							Vritant
						</span>
					</h2>
					<p className="text-gray-400 mt-2">Your personal blogging space</p>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="space-y-4">
						<Input
							id="email"
							type="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md"
							placeholder="Email address"
						/>
						<Input
							id="password"
							type="password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
						/>
					</div>
					<motion.button
						whileHover={{ scale: 1.05 }}
						className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 font-semibold px-4 py-2 rounded transition-all ${
							isLoading ? "bg-gray-600" : "bg-gray-700 hover:bg-gray-600"
						}`}
						type="submit"
						disabled={isLoading}
					>
						Login
					</motion.button>
					<div className="text-center">
						<p className="text-gray-400">
							Don't have an account?{" "}
							<Link to="/Register" className="text-gray-300 hover:underline">
								Register here
							</Link>
						</p>
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

export default Login;
