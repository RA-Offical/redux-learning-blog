import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
	{
		id: "1",
		title: "Hello",
		content: "Hello!",
		date: sub(new Date(), { minutes: 10 }).toISOString(),
		reactions: {
			thumbsUp: 0,
			hooray: 0,
			heart: 0,
			rocket: 0,
			eyes: 0,
		},
	},
	{
		id: "2",
		title: "this keyword in javascript",
		content: "Understanding this keyword is very important in javascript",
		date: sub(new Date(), { minutes: 5 }).toISOString(),
		reactions: {
			thumbsUp: 0,
			hooray: 0,
			heart: 0,
			rocket: 0,
			eyes: 0,
		},
	},
];

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		addNewPost: {
			reducer: (state, action) => {
				state.push(action.payload);
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

			const existingPost = state.find((post) => post.id === id);

			if (existingPost) {
				existingPost.title = title;
				existingPost.content = content;
			}
		},
		addReaction: (state, action) => {
			const { postId, reaction } = action.payload;

			const post = state.find((post) => post.id === postId);
			if (post) post.reactions[reaction] += 1;
		},
	},
});

export const getPosts = (store) => store.posts;
export const findPostById = (store, postId) => {
	return store.posts.find((post) => post.id === postId);
};
export const { addNewPost, editPost, addReaction } = postSlice.actions;

export default postSlice.reducer;
