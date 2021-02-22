import { NavLink } from "react-router-dom";

export default function Menu() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/chat" activeClassName="active">
                        Chat
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/find-users" activeClassName="active">
                        Online
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/show-my-friends" activeClassName="active">
                        Friends
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/find-users" activeClassName="active">
                        Find People
                    </NavLink>
                </li>

                <li>
                    <a href="/logout">Logout</a>
                </li>
            </ul>
        </nav>
    );
}
