import { Link } from "react-router-dom";

export default function Menu() {
    return (
        <nav>
            <ul>
                <Link to="/find-users">Find Friends</Link>

                <Link to="/show-my-friends">Friends</Link>

                <li>
                    <a href="/logout">Logout</a>
                </li>
            </ul>
        </nav>
    );
}
