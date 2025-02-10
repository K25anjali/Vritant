import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import UserProfile from "./pages/UserProfile";
import BlogPage from "./pages/BlogPage";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";

const App = () => {
	return (
		<Router>
			<ToastContainer autoClose={3000} />
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/" element={<LandingPage />} />
				<Route path="/home" element={<HomePage />} />
				<Route path="/profile/:userName" element={<UserProfile />} />
				<Route path="/create-post" element={<BlogPage />} />
			</Routes>
		</Router>
	);
};

export default App;
