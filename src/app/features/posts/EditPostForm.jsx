import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { editPost, findPostById } from "./postSlice";

export const EditPostForm = () => {
	const { postId } = useParams();
	const post = useSelector((store) => findPostById(store, postId));

	const [title, setTitle] = useState(post.title);
	const [content, setContent] = useState(post.body);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onTitleChanged = (e) => setTitle(e.target.value);
	const onContentChanged = (e) => setContent(e.target.value);

	const onSavePostClicked = (e) => {
		e.preventDefault();
		if (!title || !content) {
			return;
		}

		dispatch(editPost({ id: postId, title, content }));
		navigate(`/posts/${postId}`);
	};

	return (
		<section>
			<h2>Edit Post</h2>
			<form onSubmit={onSavePostClicked}>
				<label htmlFor="postTitle">Post Title:</label>
				<input
					type="text"
					id="postTitle"
					name="postTitle"
					placeholder="What's on your mind?"
					value={title}
					onChange={onTitleChanged}
				/>
				<label htmlFor="postContent">Content:</label>
				<textarea
					id="postContent"
					name="postContent"
					value={content}
					onChange={onContentChanged}
				/>
				<button>Save Post</button>
			</form>
		</section>
	);
};
