import ProfilePic from "./ProfilePic";
import BioEditor from "./BioEditor";
// import Uploader from "./Uploader";

export default function Profile(props) {
    console.log("props in profile", props);
    const { first, last, profilePicUrl, bio, sayHello, toggleUploader } = props;
    return (
        <div className="border-green">
            <h1>
                I am the profile component! {props.first} {props.last}
            </h1>
            <ProfilePic
                first={first}
                last={last}
                profilePicUrl={profilePicUrl}
                toggleUploader={toggleUploader}
            />

            {/* {this.state.uploaderVisible && (
                <Uploader
                    setProfilePicUrl={() => this.state.setProfilePicUrl()}
                />
            )} */}
            <BioEditor bio={bio} sayHello={sayHello} />
        </div>
    );
}
