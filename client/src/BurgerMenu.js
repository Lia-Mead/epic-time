import { Link } from "react-router-dom";

export default function BurgerMenu() {
    // <img onClick={toggleUploader} className="icon" src="/images/burger.svg" />;

    return (
        <nav className="burger">
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

// import ProfilePic from "./ProfilePic";
// import BioEditor from "./BioEditor";

// export default function Profile(props) {
//     // console.log("props in profile", props);
//     const { id, first, last, profilePicUrl, bio, toggleUploader } = props;
//     return (
//         <div className="profile border-green">
//             <h1>
//                 ✭ Welcome to the 90's {first} {last} ✭
//             </h1>
//             <div className="profile-pic">
//                 <ProfilePic
//                     id={id}
//                     first={first}
//                     last={last}
//                     profilePicUrl={profilePicUrl}
//                     // toggleUploader={toggleUploader}
//                 />
//             </div>

//             <img
//                 onClick={toggleUploader}
//                 className="icon"
//                 src="/images/camera.svg"
//             />

//             <BioEditor bio={bio} />
//         </div>
//     );
// }
