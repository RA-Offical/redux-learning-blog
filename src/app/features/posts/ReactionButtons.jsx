import React from "react";
import { useDispatch } from "react-redux";
import { addReaction } from "./postSlice";

const reactionEmoji = {
	thumbsUp: "👍",
	hooray: "🎉",
	heart: "❤️",
	rocket: "🚀",
	eyes: "👀",
};

const ReactionButtons = ({ post }) => {
	const dispatch = useDispatch();

	const reactionButtons = Object.entries(reactionEmoji).map(
		([name, emoji]) => {
			return (
				<button
					key={name}
					type="button"
					className="muted-button reaction-button"
					onClick={(e) =>
						dispatch(
							addReaction({ postId: post.id, reaction: name })
						)
					}
				>
					{emoji} {post.reactions[name]}
				</button>
			);
		}
	);

	return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
