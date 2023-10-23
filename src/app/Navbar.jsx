import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const dispatch = useDispatch();
	const count = useSelector((store) => store.posts.count);
	return (
		<nav>
			<section>
				<h1>Redux Essentials Example</h1>

				<div className="navContent">
					<div className="navLinks">
						<Link to="/">Posts</Link>
						<Link to="/users">Users</Link>
					</div>
				</div>
			</section>
		</nav>
	);
};
