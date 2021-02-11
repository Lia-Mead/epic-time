export default function ProfilePic({
    first,
    last,
    profilePicUrl,
    toggleUploader,
    size = "",
}) {
    // let { first, last, profilePicUrl, toggleUploader } = props;

    // const imgUrl = profilePicUrl || "/images/avatar.svg";

    return (
        <div className="profile-pic">
            <img
                src={profilePicUrl || "/images/avatar.svg"}
                alt={`${first} ${last}`}
                className={`${size} profile-pic border-blue`}
                onClick={toggleUploader}
            />
        </div>
    );
}
