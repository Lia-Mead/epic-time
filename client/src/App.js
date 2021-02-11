import { Component } from "react";
// import Logo from "./Logo";
import Header from "./Header";
// import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";
import Profile from "./Profile";
import axios from "./Axios";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = { uploaderVisible: false };
    }

    componentDidMount() {
        console.log("APP MOUNTED");
        axios
            .get("/user")
            .then((resp) => {
                console.log("response success user.data", resp.data.rows);
                this.setState({
                    id: resp.data.rows.id,
                    first: resp.data.rows.first,
                    last: resp.data.rows.last,
                    bio: resp.data.rows.bio,
                    profilePicUrl: resp.data.rows.profile_pic_url,
                });
            })
            .catch((err) => {
                console.log("error in POST componentDidMount", err);
            });
    }

    toggleUploader() {
        this.setState({
            uploaderVisible: !this.state.uploaderVisible,
        });
    }

    setProfilePicUrl(profilePicUrl) {
        this.setState({
            profilePicUrl: profilePicUrl,
            uploaderVisible: false,
        });
    }

    sayHello() {
        console.log("i am saying hello from app");
    }

    render() {
        console.log("this.state in app: ", this.state);
        if (!this.state.id) {
            return null;
            // return (
            //     <div className="spinner-container">
            //         <div className="spinner"></div>
            //     </div>
            // );
        }
        return (
            <div className="app border-pink">
                <Header
                    first={this.state.first}
                    last={this.state.last}
                    profilePicUrl={this.state.profilePicUrl}
                    toggleUploader={() => this.toggleUploader()}
                    uploaderVisible={this.state.uploaderVisible}
                    size="small"
                />

                {this.state.uploaderVisible && (
                    <Uploader
                        setProfilePicUrl={(profilePicUrl) =>
                            this.setProfilePicUrl(profilePicUrl)
                        }
                    />
                )}

                <Profile
                    first={this.state.first}
                    last={this.state.last}
                    sayHello={this.sayHello}
                    profilePicUrl={this.state.profilePicUrl}
                    bio={this.state.bio}
                />
            </div>
        );
    }
}
