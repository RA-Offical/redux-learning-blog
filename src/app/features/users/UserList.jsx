import { useSelector } from "react-redux";
import { getUsers } from "./usersSlice";
import { Link } from "react-router-dom";

const UserList = () => {
	const users = useSelector(getUsers);

	const renderedUsers = users.map((user) => {
		return (
			<li key={user.id}>
				<Link to={`/users/${user.id}`}>{user.name}</Link>
			</li>
		);
	});

	return (
		<section>
			<h2>Users</h2>

			<ul>{renderedUsers}</ul>
		</section>
	);
};

export default UserList;
