import Logo from "./Logo";
import ProfilePic from "./ProfilePic";
import Menu from "./Menu";

export default function Header(props) {
    return (
        <header>
            <Logo />
            <div className="menu-right">
                <Menu />
                <ProfilePic {...props} />
            </div>
        </header>
    );
}
