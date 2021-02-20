import { Link } from "react-router-dom";

export default function BurgerMenu({ toggleBurgerMenu }) {
    return (
        <nav className="burger">
            <Link onClick={toggleBurgerMenu} to="/find-users">
                Chat
            </Link>
            <Link onClick={toggleBurgerMenu} to="/find-users">
                Online
            </Link>
            <Link onClick={toggleBurgerMenu} to="/show-my-friends">
                Friends
            </Link>
            <Link onClick={toggleBurgerMenu} to="/find-users">
                Find People
            </Link>

            <a href="/logout">Logout</a>
        </nav>
    );
}
