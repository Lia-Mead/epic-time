// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function BurgerMenu({ toggleBurgerMenu }) {
    return (
        <nav className="burger">
            <NavLink
                activeClassName="active-b"
                onClick={toggleBurgerMenu}
                to="/chat"
            >
                Chat
            </NavLink>
            <NavLink
                activeClassName="active-b"
                onClick={toggleBurgerMenu}
                to="/find-users"
            >
                Online
            </NavLink>
            <NavLink
                activeClassName="active-b"
                onClick={toggleBurgerMenu}
                to="/show-my-friends"
            >
                Friends
            </NavLink>
            <NavLink
                activeClassName="active-b"
                onClick={toggleBurgerMenu}
                to="/find-users"
            >
                Find People
            </NavLink>

            <a href="/logout">Logout</a>
        </nav>
    );
}
