import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./app/Navbar";
import PostList from "./app/features/posts/PostList";
import AddNewPostForm from "./app/features/posts/AddNewPostForm";
import SinglePostPage from "./app/features/posts/SinglePostPage";
import { EditPostForm } from "./app/features/posts/EditPostForm";
import UserList from "./app/features/users/Userlist";
import UserPage from "./app/features/users/UserPage";
function App() {
	return (
		<Router>
			<Navbar />
			<div className="App">
				<Routes>
					<Route
						path="/"
						element={
							<>
								<AddNewPostForm />
								<PostList />
							</>
						}
					/>

					<Route path="posts">
						<Route path=":postId" element={<SinglePostPage />} />
						<Route path="edit/:postId" element={<EditPostForm />} />
					</Route>

					<Route path="users">
						<Route index element={<UserList />} />
						<Route path=":userId" element={<UserPage />} />
					</Route>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
