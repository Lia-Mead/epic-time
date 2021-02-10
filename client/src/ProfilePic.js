export function ProfilePic(props) {
    return (
        <div onClick={props.toggleUploader} className="profile-pic">
            <img
                src={props.profilePicUrl || "default.png"}
                alt={`$props.firstName`}
            />
        </div>
    );
}
