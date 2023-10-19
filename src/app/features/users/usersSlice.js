import { createSlice } from "@reduxjs/toolkit";

const initialState = [
	{ id: "0", name: "Tianna Jenkins" },
	{ id: "1", name: "Kevin Grant" },
	{ id: "2", name: "Madison Price" },
];

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
});

export const getUserById = (store, userId) =>
	store.users.find((user) => user.id === userId);
export const getUsers = (store) => store.users;

export default usersSlice.reducer;
