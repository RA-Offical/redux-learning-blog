import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
	const response = await axios.get(
		"https://jsonplaceholder.typicode.com/users"
	);
	return response.data;
});

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			return action.payload;
		});
	},
});

export const getUserById = (store, userId) => {
	userId = parseInt(userId, 10);
	return store.users.find((user) => user.id === userId);
};
export const getUsers = (store) => store.users;

export default usersSlice.reducer;
