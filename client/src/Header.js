import Logo from "./Logo";
import ProfilePic from "./ProfilePic";

export default function Header(props) {
    return (
        <header>
            <Logo />
            <ProfilePic {...props} />
        </header>
    );
}
