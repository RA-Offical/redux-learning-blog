import {
	createAsyncThunk,
	createSelector,
	createSlice,
	createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
	const response = await axios.get(POST_URL);
	return response.data;
});

export const addNewPost = createAsyncThunk(
	"posts/addNewPost",
	// The payload creator receives the partial `{title, content, user}` object
	async (initialPost) => {
		// We send the initial data to the fake API server
		const response = await axios.post(POST_URL, initialPost);
		// The response includes the complete post object, including unique ID
		return response.data;
	}
);

// entity adapter initialization
const postsAdapter = createEntityAdapter({
	sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
	status: "idle", //"idle" | "loading" | "succeeded" | "failed",
	error: null, //string | null,
});

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		// addNewPost: {
		// 	reducer: (state, action) => {
		// 		state.posts.push(action.payload);
		// 	},
		// 	prepare: (title, content, userId) => {
		// 		return {
		// 			payload: {
		// 				id: nanoid(),
		// 				title,
		// 				content,
		// 				userId,
		// 				date: new Date().toISOString(),
		// 				reactions: {
		// 					thumbsUp: 0,
		// 					hooray: 0,
		// 					heart: 0,
		// 					rocket: 0,
		// 					eyes: 0,
		// 				},
		// 			},
		// 		};
		// 	},
		// },
		editPost: (state, action) => {
			const { id, title, content } = action.payload;

			const existingPost = state.entities[id];

			if (existingPost) {
				existingPost.title = title;
				existingPost.content = content;
			}
		},
		addReaction: (state, action) => {
			const { postId, reaction } = action.payload;

			// const post = state.posts.find((post) => post.id === postId);
			// if (post) post.reactions[reaction] += 1;

			const existingPost = state.entities[postId];
			if (existingPost) existingPost.reactions[reaction]++;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPosts.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = "succeeded";
				let min = 1;
				const loadedPosts = action.payload.map((post) => {
					post.date = sub(new Date(), {
						minutes: min++,
					}).toISOString();

					post.reactions = {
						thumbsUp: 0,
						hooray: 0,
						heart: 0,
						rocket: 0,
						eyes: 0,
					};

					return post;
				});

				postsAdapter.upsertMany(state, loadedPosts);
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(addNewPost.fulfilled, (state, action) => {
				// We can directly add the new post object to our posts array
				const post = action.payload;

				post.date = new Date().toISOString();
				post.reactions = {
					thumbsUp: 0,
					hooray: 0,
					heart: 0,
					rocket: 0,
					eyes: 0,
				};

				postsAdapter.addOne(state, post);
			});
	},
});

// export const getPosts = (store) => store.posts.posts;
// export const findPostById = (store, postId) => {
// 	postId = (postId, 10);
// 	return store.posts.posts.find((post) => post.id === postId);
// };

export const {
	selectAll: getPosts,
	selectById: findPostById,
	selectIds: getPostsIds,
} = postsAdapter.getSelectors((store) => store.posts);

export const getPostsByUser = createSelector(
	[getPosts, (store, userId) => parseInt(userId, 10)],
	(posts, userId) => {
		return posts.filter((post) => post.userId === userId);
	}
);

export const { editPost, addReaction, increaseCount } = postSlice.actions;

export default postSlice.reducer;
