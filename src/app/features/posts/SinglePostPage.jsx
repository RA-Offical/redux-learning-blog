import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { findPostById } from "./postSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const SinglePostPage = () => {
	const { postId } = useParams();

	const post = useSelector((store) => findPostById(store, postId));

	if (!post) {
		return (
			<section>
				<p>Post Not found</p>
			</section>
		);
	}

	return (
		<section>
			<article className="post">
				<h2>{post.title}</h2>
				<p className="post-content">{post.body}</p>
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

				<Link to={`/posts/edit/${post.id}`} className="button">
					Edit Post
				</Link>
				<ReactionButtons post={post} />
			</article>
		</section>
	);
};

export default SinglePostPage;
