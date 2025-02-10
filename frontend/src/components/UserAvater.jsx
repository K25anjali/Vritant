import { Link } from "react-router-dom";

const UserAvatar = ({ userName, size }) => {
	return (
		<div className="flex justify-center items-center space-x-2">
			<Link
				to={`/profile/${userName}`}
				className="cursor-pointer border-2 border-pink-300 rounded-full p-1"
			>
				<img
					className={`h-${size} w-${size}`}
					src="/public/user.png"
					alt="avatar"
				/>
			</Link>
		</div>
	);
};

export default UserAvatar;
