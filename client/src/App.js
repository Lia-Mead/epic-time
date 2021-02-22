import { Component } from "react";
import Header from "./Header";
import Uploader from "./Uploader";
import Profile from "./Profile";
import OtherProfile from "./OtherProfile";
import FindPeople from "./FindPeople";
import Friends from "./Friends";
import Chat from "./Chat";
import axios from "./Axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import NotFound from "./NotFound";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = { uploaderVisible: false };
        this.state = { deletePic: false };
    }

    componentDidMount() {
        // console.log("APP MOUNTED");
        axios
            .get("/user.json")
            .then((resp) => {
                // console.log("response success user.data", resp.data.rows);
                this.setState({
                    id: resp.data.rows.id,
                    first: resp.data.rows.first,
                    last: resp.data.rows.last,
                    bio: resp.data.rows.bio,
                    profilePicUrl: resp.data.rows.image,
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

    deletePic(profilePicUrl) {
        this.setState({
            profilePicUrl: profilePicUrl,
        });
    }

    // sayHello() {
    //     console.log("i am saying hello from app");
    // }

    render() {
        // console.log("this.state in app: ", this.state);
        if (!this.state.id) {
            return null;
            // return (
            //     <div className="spinner-container">
            //         <div className="spinner"></div>
            //     </div>
            // );
        }
        return (
            <BrowserRouter>
                <div className="app">
                    <Header
                        first={this.state.first}
                        last={this.state.last}
                        profilePicUrl={this.state.profilePicUrl}
                        toggleUploader={() => this.toggleUploader()}
                        size="small"
                    />
                    {this.state.uploaderVisible && (
                        <Uploader
                            setProfilePicUrl={(profilePicUrl) =>
                                this.setProfilePicUrl(profilePicUrl)
                            }
                        />
                    )}

                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    id={this.state.id}
                                    first={this.state.first}
                                    last={this.state.last}
                                    profilePicUrl={this.state.profilePicUrl}
                                    bio={this.state.bio}
                                    toggleUploader={() => this.toggleUploader()}
                                    deletePic={(profilePicUrl) =>
                                        this.deletePic(profilePicUrl)
                                    }
                                />
                            )}
                        />

                        <Route
                            path="/user/:id"
                            render={(props) => (
                                <OtherProfile
                                    key={props.match.url}
                                    match={props.match} // must be passed down when we work with match
                                    history={props.history}
                                />
                            )}
                        />
                        <Route
                            path="/find-users"
                            render={() => (
                                <FindPeople
                                    id={this.state.id}
                                    first={this.state.first}
                                    last={this.state.last}
                                    profilePicUrl={this.state.profilePicUrl}
                                />
                            )}
                        />
                        <Route
                            path="/show-my-friends"
                            render={() => <Friends />}
                        />

                        <Route path="/chat" render={() => <Chat />} />

                        <Route component={NotFound} />
                    </Switch>

                    <footer>
                        <div className="foot-note">
                            © Made with 🖤 by Liat Meadows 2021
                        </div>
                    </footer>
                </div>
            </BrowserRouter>
        );
    }
}
