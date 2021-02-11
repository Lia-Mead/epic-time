export default function ProfilePic({
    first,
    last,
    profilePicUrl,
    toggleUploader,
    size = "",
}) {
    // const imgUrl = profilePicUrl || "/images/avatar.svg";

    return (
        <img
            src={profilePicUrl || "/images/avatar.svg"}
            alt={`${first} ${last}`}
            className={`${size} profile-pic`}
            onClick={toggleUploader}
        />
    );
}
