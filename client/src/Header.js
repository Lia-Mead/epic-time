import Logo from "./Logo";
import ProfilePic from "./ProfilePic";
import Menu from "./Menu";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header(props) {
    let mql = window.matchMedia("(max-width: 600px)");
    // console.log("mql: ", mql);
    // console.log("mql media: ", mql.media);
    // console.log("mql onChange: ", mql.onChange);

    // mediaQueryListEvent = () => {
    //     isTrusted: true,
    // }

    // const [mQuery, setMQuery] =
    //     React.useState <
    //     any >
    //     {
    //         matches: window.innerWidth > 768 ? true : false,
    //     };

    // useEffect(() => {
    //     let mediaQuery = window.matchMedia("(min-width: 768px)");
    //     mediaQuery.addListener(setMQuery);
    //     // this is the cleanup function to remove the listener
    //     return () => mediaQuery.removeListener(setMQuery);
    // }, []);

    return (
        <header>
            <Link className="menu-right" to="/">
                <Logo />
            </Link>
            <div className="menu-right">
                {mql.media ? (
                    <img className="icon" src="/images/burger.svg" />
                ) : (
                    <Menu />
                )}
                <ProfilePic {...props} />
            </div>
        </header>
    );
}
// export default function Header(props) {
//     let mql = window.matchMedia("(max-width: 600px)");

//     return (
//         <header>
//             <Link className="menu-right" to="/">
//                 <Logo />
//             </Link>
//             <div className="menu-right">
//                 <Menu />
//                 <ProfilePic {...props} />
//             </div>
//         </header>
//     );
// }

// let mql = window.matchMedia("(max-width: 600px)");

// {mql ? <mobile /> : <Menu />}

// <img onClick={toggleUploader} className="icon" src="/images/burger.svg" />;
