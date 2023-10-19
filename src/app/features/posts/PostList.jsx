import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPosts } from "./postSlice";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostList = () => {
	const dispatch = useDispatch();
	const postStatus = useSelector((store) => state.posts.status);
	const posts = useSelector(getPosts);

	//calling useEffect to fetch posts when component mount
	useEffect(() => {
		if (postStatus === "idle") {
			dispatch(fetchPosts());
		}
	}, []);

	const orderedPosts = posts
		.slice()
		.sort((a, b) => b.date.localeCompare(a.date));

	const renderedPosts = orderedPosts.map((post) => {
		return (
			<article className="post-excerpt" key={post.id}>
				<h3>{post.title}</h3>
				<p className="post-content">{post.content.substring(0, 100)}</p>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<PostAuthor userId={post.userId} />
					<TimeAgo timestamp={post.date} />
				</div>
				<Link to={`/posts/${post.id}`} className="button muted-button">
					View Post
				</Link>

				<ReactionButtons post={post} />
			</article>
		);
	});

	return (
		<section className="posts-list">
			<h2>Posts</h2>
			{renderedPosts}
		</section>
	);
};

export default PostList;
