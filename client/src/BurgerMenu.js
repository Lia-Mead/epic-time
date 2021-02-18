import { Link } from "react-router-dom";

export default function BurgerMenu({ toggleBurgerMenu }) {
    return (
        <nav className="burger">
            <Link onClick={toggleBurgerMenu} to="/find-users">
                Find Friends
            </Link>

            <Link onClick={toggleBurgerMenu} to="/show-my-friends">
                Friends
            </Link>

            <a href="/logout">Logout</a>
        </nav>
    );
}
