import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
	const response = await axios.get(POST_URL);
	return response.data;
});

const initialState = {
	posts: [],
	status: "idle", //"idle" | "loading" | "succeeded" | "failed",
	error: null, //string | null,
};

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		addNewPost: {
			reducer: (state, action) => {
				state.posts.push(action.payload);
			},
			prepare: (title, content, userId) => {
				return {
					payload: {
						id: nanoid(),
						title,
						content,
						userId,
						date: new Date().toISOString(),
						reactions: {
							thumbsUp: 0,
							hooray: 0,
							heart: 0,
							rocket: 0,
							eyes: 0,
						},
					},
				};
			},
		},
		editPost: (state, action) => {
			const { id, title, content } = action.payload;

			const existingPost = state.posts.find((post) => post.id === id);

			if (existingPost) {
				existingPost.title = title;
				existingPost.content = content;
			}
		},
		addReaction: (state, action) => {
			const { postId, reaction } = action.payload;

			const post = state.posts.find((post) => post.id === postId);
			if (post) post.reactions[reaction] += 1;
		},
	},
});

export const getPosts = (store) => store.posts.posts;
export const findPostById = (store, postId) => {
	return store.posts.posts.find((post) => post.id === postId);
};
export const { addNewPost, editPost, addReaction } = postSlice.actions;

export default postSlice.reducer;
