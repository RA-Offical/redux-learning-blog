import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPosts, getPostsIds } from "./postSlice";
import PostExcerpt from "./PostExcerpt";
import { Spinner } from "../../../components/Spinner";

const PostList = () => {
	const dispatch = useDispatch();
	const postStatus = useSelector((store) => store.posts.status);
	const postError = useSelector((store) => store.posts.error);
	const postsIds = useSelector(getPostsIds);

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
		content = postsIds.map((postId) => (
			<PostExcerpt key={postId} postId={postId} />
		));
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
