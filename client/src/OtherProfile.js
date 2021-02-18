import { Component } from "react";
import axios from "./Axios";
import { Link } from "react-router-dom";
import FriendShipButton from "./FriendshipButton";

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            first: this.props.first,
            last: this.props.last,
            profilePicUrl: this.props.profilePicUrl,
            bio: this.props.bio,
            error: false,
        };
    }

    updateFriendshipStatus(status) {
        this.setState(
            {
                friendship: status,
            },
            () => console.log("this.state.friendship", this.state.friendship)
        );
    }

    componentDidMount() {
        // console.log("props in mount other profile", props);
        // console.log("this.props.match: ", this.props.match);
        console.log("this.props.match.params id: ", this.props.match.params.id);

        axios
            .get(`/show-users/${this.props.match.params.id}`)
            .then((resp) => {
                if (this.props.match.params.id == resp.data.cookie) {
                    return this.props.history.push("/");
                }
                this.setState({
                    id: resp.data.rows.id,
                    first: resp.data.rows.first,
                    last: resp.data.rows.last,
                    profilePicUrl: resp.data.rows.image,
                    bio: resp.data.rows.bio,
                    error: false,
                });
            })
            .catch((err) => {
                console.log("error in GET other profile", err);
                this.setState({
                    error: true,
                });
            });
    }

    render() {
        if (!this.state.id) {
            return (
                <div className="profile error">
                    {this.state.error && (
                        <>
                            <p>This user has not made it to the 90's yet.</p>

                            <iframe
                                src="https://giphy.com/embed/21KWT2zGb26DrxpHYw"
                                width="480"
                                height="480"
                                frameBorder="0"
                                className="giphy-embed"
                                allowFullScreen
                            ></iframe>

                            <Link to="/">
                                <button className="btn user">
                                    Back to my profile
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            );
        }
        return (
            <div className="profile">
                <h1>I am the other profile</h1>
                <h2>
                    {this.state.first} {this.state.last}
                </h2>
                <img
                    className="profile-pic"
                    src={this.state.profilePicUrl || "/images/avatar.svg"}
                    alt={`${this.state.first} ${this.state.last}`}
                />
                <p className="bio">{this.state.bio}</p>
                <FriendShipButton
                    id={this.state.id}
                    updateFriendshipStatus={(e) => {
                        this.friendshipUpdateStatus(e);
                    }}
                />
            </div>
        );
    }
}
