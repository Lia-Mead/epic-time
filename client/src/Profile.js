import ProfilePic from "./ProfilePic";
import BioEditor from "./BioEditor";

export default function Profile(props) {
    console.log("props in profile", props);
    const { first, last, profilePicUrl, bio, sayHello, toggleUploader } = props;
    return (
        <div className="profile border-green">
            <h1>
                ✭ Welcome to the 90's {first} {last} ✭
            </h1>
            <div className="profile-pic">
                <ProfilePic
                    first={first}
                    last={last}
                    profilePicUrl={profilePicUrl}
                    toggleUploader={toggleUploader}
                />
            </div>

            <BioEditor bio={bio} sayHello={sayHello} />
        </div>
    );
}
