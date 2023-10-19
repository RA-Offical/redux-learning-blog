import React from "react";
import { useSelector } from "react-redux";
import { getUserById } from "../users/usersSlice";

const PostAuthor = ({ userId }) => {
	const user = useSelector((store) => getUserById(store, userId));
	return <p>{user ? user.name : "Unknown Author"}</p>;
};

export default PostAuthor;
