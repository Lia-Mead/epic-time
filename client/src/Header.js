import Logo from "./Logo";
import ProfilePic from "./ProfilePic";
import BurgerMenu from "./BurgerMenu";
import Menu from "./Menu";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header(props) {
    // console.log("mql media: ", mql.media);
    // console.log("mql matches: ", mql.matches);
    // console.log("mql onChange: ", mql.onChange);
    const [mQuery, setMQuery] = useState();

    useEffect(() => {
        // componentDidMount - registers eventlistener, event fired by the browser
        window.addEventListener("resize", updateSize);
    });

    const updateSize = () => {
        // console.log("size updated");
        let mql = window.matchMedia("(max-width: 800px)");
        setMQuery(mql.matches);
        console.log(mql.matches); // true or false
    };

    const [burgerOpen, setBurgerOpen] = useState(false);

    const toggleBurgerMenu = () => {
        console.log("toggle open");
        setBurgerOpen(!burgerOpen);
    };

    return (
        <>
            <header>
                <Link className="menu-right" to="/">
                    <Logo />
                </Link>
                <div className="menu-right">
                    {mQuery ? (
                        <img
                            onClick={toggleBurgerMenu}
                            className="icon"
                            src="/images/burger.svg"
                        />
                    ) : (
                        <Menu />
                    )}
                    <ProfilePic {...props} />
                </div>
            </header>

            {burgerOpen ? <BurgerMenu className="burger" /> : null}
        </>
    );
}
