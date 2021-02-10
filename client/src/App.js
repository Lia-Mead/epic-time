import { Component } from "react";
import { Logo } from "./Logo";
import { ProfilePic } from "./ProfilePic";
import { Uploader } from "./Uploader";

export class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uploaderVisible: false,
        };
        // this.toggleUploader = this.toggleUploader.bind(this);
    }

    componentDidMount() {
        this.setState({
            firstName: "",
            lastName: "",
            profilePicUrl: "",
        });
    }

    toggleUploader() {
        this.setState({
            uploaderVisible: !this.state.uploaderVisile,
        });
    }

    // updateProfilePic(profilePicUrl) {
    //     // update the state with the new prof pic
    // }

    render() {
        return (
            <div className="app">
                <button onClick={() => this.toggleUploader()}></button>
                <Logo />
                <ProfilePic profilePicUrl={this.state.profilePicUrl} />
                <Uploader />
            </div>
        );
    }
}
