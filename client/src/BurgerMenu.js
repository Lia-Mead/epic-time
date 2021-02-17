import { Link } from "react-router-dom";
// import { useState } from "react";

export default function BurgerMenu() {
    // onClick = { toggleBurgerMenu };

    // const [burgerOpen, setBurgerOpen] = useState(false);

    // const toggleBurgerMenu = () => {
    //     console.log("toggle close");
    //     setBurgerOpen(!burgerOpen);
    // };

    return (
        <nav className="burger">
            <img className="icon" src="/images/close.svg" />
            <ul>
                <li>
                    <a href="/logout">Logout</a>
                </li>
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
            </ul>
        </nav>
    );
}
