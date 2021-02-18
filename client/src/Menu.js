import { Link } from "react-router-dom";

export default function Menu() {
    return (
        <nav>
            <Link to="/find-users">Find Friends</Link>

            <Link to="/show-my-friends">Friends</Link>

            <a href="/logout">Logout</a>
        </nav>
    );
}
