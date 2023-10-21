import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPosts } from "./postSlice";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import PostExcerpt from "./PostExcerpt";
import { Spinner } from "../../../components/Spinner";

const PostList = () => {
	const dispatch = useDispatch();
	const postStatus = useSelector((store) => store.posts.status);
	const postError = useSelector((store) => store.posts.error);
	const posts = useSelector(getPosts);

	//calling useEffect to fetch posts when component mount
	useEffect(() => {
		if (postStatus === "idle") {
			dispatch(fetchPosts());
		}
	}, [postStatus, dispatch]);

	let content = "";
	if (postStatus === "loading") {
		content = <Spinner />;
	} else if (postStatus === "succeeded") {
		const orderedPosts = posts
			.slice()
			.sort((a, b) => b.date.localeCompare(a.date));

		content = orderedPosts.map((post) => {
			return <PostExcerpt key={post.id} post={post} />;
		});
	} else if (postStatus === "failed") {
		content = <div>{postError}</div>;
	}

	return (
		<section className="posts-list">
			<h2>Posts</h2>
			{content}
		</section>
	);
};

export default PostList;
