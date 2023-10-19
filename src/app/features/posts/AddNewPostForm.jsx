import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./postSlice";
import { getUsers } from "../users/usersSlice";

const AddNewPostForm = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [userId, setUserId] = useState("");

	const users = useSelector(getUsers);

	const dispatch = useDispatch();

	const onTitleChanged = (e) => {
		const value = e.target.value;
		setTitle(value);
	};
	const onContentChanged = (e) => {
		const value = e.target.value;
		setContent(value);
	};
	const onAuthorChanged = (e) => setUserId(e.target.value);

	const onSavePost = (e) => {
		e.preventDefault();

		if (!canSave) {
			return;
		}

		dispatch(addNewPost(title, content, userId));
		setTitle("");
		setContent("");
		setUserId("");
	};

	const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

	const userSelect = users.map((user) => {
		return (
			<option key={user.id} value={user.id}>
				{user.name}
			</option>
		);
	});

	return (
		<section>
			<h2>Add a New Post</h2>
			<form onSubmit={onSavePost}>
				<label htmlFor="postTitle">Post Title:</label>
				<input
					type="text"
					id="postTitle"
					name="postTitle"
					value={title}
					onChange={onTitleChanged}
				/>

				<label htmlFor="author">Author</label>
				<select
					name="author"
					id="author"
					value={userId}
					onChange={onAuthorChanged}
				>
					<option value=""></option>
					{userSelect}
				</select>

				<label htmlFor="postContent">Content:</label>
				<textarea
					id="postContent"
					name="postContent"
					value={content}
					onChange={onContentChanged}
				/>
				<button disabled={!canSave}>Save Post</button>
			</form>
		</section>
	);
};

export default AddNewPostForm;
