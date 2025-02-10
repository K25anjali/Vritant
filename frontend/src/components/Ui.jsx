import React, { children } from "react";

export const Input = ({
	id,
	name,
	type,
	placeholder,
	value,
	onChange,
	className = "",
	...props
}) => {
	return (
		<input
			id={id}
			name={name}
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			className={`w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-transparent transition ${className}`}
			{...props}
		/>
	);
};

export const Button = ({
	size = "md",
	onClick,
	className = "",
	children,
	...props
}) => {
	const sizeClasses = {
		sm: "text-sm px-3 py-1.5",
		md: "text-base px-4 py-2",
		lg: "text-lg px-5 py-3",
	};

	return (
		<button
			onClick={onClick}
			className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-colors font-medium rounded focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-transparent ${sizeClasses[size]} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
};
