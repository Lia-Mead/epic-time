import Logo from "./Logo";
import ProfilePic from "./ProfilePic";
import BurgerMenu from "./BurgerMenu";
import Menu from "./Menu";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header(props) {
    // console.log("mql media: ", mql.media);
    // console.log("mql matches: ", mql.matches);
    const [mQuery, setMQuery] = useState();

    useEffect(() => {
        // componentDidMount - registers eventlistener, event fired by the browser
        window.addEventListener("resize", updateSize);
    });

    const updateSize = () => {
        // console.log("size updated");
        let mql = window.matchMedia("(max-width: 1074px)");
        setMQuery(mql.matches);
        // console.log(mql.matches); // true or false
    };

    const [burgerOpen, setBurgerOpen] = useState(false);

    const toggleBurgerMenu = () => {
        console.log("toggle open");
        setBurgerOpen(!burgerOpen);
    };

    let src;
    burgerOpen ? (src = "/images/close.svg") : (src = "/images/burger.svg");

    return (
        <>
            <header>
                <Link className="logo-link" to="/">
                    <Logo onClick={toggleBurgerMenu} className="logo" />
                </Link>
                <div className="menu-right">
                    {mQuery ? (
                        <img
                            onClick={toggleBurgerMenu}
                            className="icon"
                            src={src}
                        />
                    ) : (
                        <Menu />
                    )}
                    <ProfilePic {...props} />
                </div>
            </header>

            {burgerOpen ? (
                <BurgerMenu
                    className="burger"
                    toggleBurgerMenu={toggleBurgerMenu}
                />
            ) : null}
        </>
    );
}
