import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostExcerpt = ({ post }) => {
	return (
		<article className="post-excerpt">
			<h3>{post.title}</h3>
			<p className="post-content">{post.body.substring(0, 100)}</p>
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
};

export default PostExcerpt;
