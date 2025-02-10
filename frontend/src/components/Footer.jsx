import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./Ui";
import { useNavigate } from "react-router-dom";

const Footer = () => {
	const navigate = useNavigate();

	return (
		<footer className="bg-zinc-800 text-zinc-300 py-12 w-full text-center">
			<div className="container mx-auto px-4">
				<div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
					<div>
						<h3 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
							Vritant
						</h3>
						<p className="text-gray-400">
							Empowering voices, connecting stories.
						</p>
					</div>

					<div>
						<h4 className="text-lg font-semibold mb-4 text-gray-100">
							Quick Links
						</h4>
						<ul className="space-y-2">
							<li>
								<Link
									to="/home"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									to="/login"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Login In
								</Link>
							</li>
							<li>
								<Link
									to="/register"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Sign Up
								</Link>
							</li>
							<li>
								<Link
									to="/"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Contact
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="text-lg font-semibold mb-4 text-gray-100">Legal</h4>
						<ul className="space-y-2">
							<li>
								<Link
									to="/"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									to="/"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Terms of Service
								</Link>
							</li>
							<li>
								<Link
									to="/"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Cookie Policy
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="text-lg font-semibold mb-4 text-gray-100">
							Stay Connected
						</h4>
						<p className="text-gray-400 mb-4">
							Subscribe to our newsletter for the latest updates and stories.
						</p>
						<div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-2">
							<Button onClick={() => navigate("/register")}>
								Get Started for Free
							</Button>
						</div>
					</div>
				</div>

				<div className="mt-8 pt-8 border-t border-gray-700 text-gray-400 text-center">
					<p>&copy; {new Date().getFullYear()} Vritant. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
