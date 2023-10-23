import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUserById } from "./usersSlice";
import { getPosts, getPostsByUser } from "../posts/postSlice";

const UserPage = () => {
	let { userId } = useParams();

	const user = useSelector((store) => getUserById(store, userId));

	const userPosts = useSelector((store) => getPostsByUser(store, userId));
	const postTitles = userPosts.map((post) => {
		return (
			<li key={post.id}>
				<Link to={`/posts/${post.id}`}>{post.title}</Link>
			</li>
		);
	});

	return (
		<section>
			<h2>{user.name}</h2>

			<ul>{postTitles}</ul>
		</section>
	);
};

export default UserPage;
