// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function BurgerMenu({ toggleBurgerMenu }) {
    return (
        <nav className="burger">
            <NavLink
                className="nav-icon"
                activeClassName="active-b"
                onClick={toggleBurgerMenu}
                to="/chat"
            >
                <img src="images/chat.svg" className="icon" alt="chat-icon" />
                Chat
            </NavLink>
            <NavLink
                className="nav-icon"
                activeClassName="active-b"
                onClick={toggleBurgerMenu}
                to="/find-users"
            >
                <img
                    src="images/online.svg"
                    className="icon"
                    alt="online-icon"
                />
                Online
            </NavLink>
            <NavLink
                className="nav-icon"
                activeClassName="active-b"
                onClick={toggleBurgerMenu}
                to="/show-my-friends"
            >
                <img
                    src="images/friends.svg"
                    className="icon"
                    alt="friends-icon"
                />
                Friends
            </NavLink>
            <NavLink
                className="nav-icon"
                activeClassName="active-b"
                onClick={toggleBurgerMenu}
                to="/find-users"
            >
                <img src="images/search.svg" className="icon" alt="find-icon" />
                Find People
            </NavLink>

            <a className="nav-icon" href="/logout">
                <img
                    src="images/logout.svg"
                    className="icon"
                    alt="logout-icon"
                />
                Logout
            </a>
        </nav>
    );
}
