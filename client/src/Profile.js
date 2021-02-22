import ProfilePic from "./ProfilePic";
import BioEditor from "./BioEditor";
import DeleteProfilePic from "./DeleteProfilePic";

export default function Profile(props) {
    // console.log("props in profile", props);
    const {
        id,
        first,
        last,
        profilePicUrl,
        bio,
        toggleUploader,
        deletePic,
    } = props;

    return (
        <div className="profile high">
            <h1>
                ✭ Welcome to the 90's {first} {last} ✭
            </h1>
            <div className="profile-pic">
                <ProfilePic
                    id={id}
                    first={first}
                    last={last}
                    profilePicUrl={profilePicUrl}
                    // toggleUploader={toggleUploader}
                />
            </div>

            <div className="icons">
                <img
                    onClick={toggleUploader}
                    className="icon"
                    src="/images/camera.svg"
                />

                <DeleteProfilePic
                    profilePicUrl={profilePicUrl}
                    deletePic={deletePic}
                    id={id}
                />
            </div>

            <BioEditor bio={bio} />
        </div>
    );
}
