import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import { fetchUsers } from "./app/features/users/usersSlice";

store.dispatch(fetchUsers());

const root = createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
