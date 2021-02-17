import { Link } from "react-router-dom";

export default function Menu() {
    return (
        <nav>
            <ul>
                <li>
                    <a href="/"></a>
                </li>
                <li>
                    <a href="/"></a>
                </li>
                <li>
                    <a href="/"></a>
                </li>

                <Link to="/find-users">Find Friends</Link>

                <li>
                    <a href="/logout">Logout</a>
                </li>
            </ul>
        </nav>
    );
}
