export default function ProfilePic({
    first,
    last,
    profilePicUrl,
    toggleUploader,
    size = "",
}) {
    // const imgUrl = profilePicUrl || "/images/avatar.jpg";

    return (
        <img
            src={profilePicUrl || "/images/avatar.jpg"}
            alt={`${first} ${last}`}
            className={`${size} profile-pic`}
            onClick={toggleUploader}
        />
    );
}
