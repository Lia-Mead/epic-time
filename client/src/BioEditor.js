import React from "react";
import axios from "./Axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingMode: false,
            error: false,
            renderView: 1,
            bio: this.props.bio,
        };
    }

    toggleEdit() {
        this.setState({
            editingMode: !this.state.editingMode,
            // editingMode: true,
        });
    }

    handleChange(e) {
        // console.log("e target value", e.target.value);
        // console.log("e target name", e.target.name);
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    bioHandleClick(e) {
        e.preventDefault();
        axios
            .post("/bio", this.state)
            .then((resp) => {
                console.log("response from server", resp);
                this.setState({
                    bio: resp.data.bio,
                    editingMode: false,
                });
            })
            .catch((err) => {
                console.log("err in axios post bio: ", err);
                this.setState({
                    error: true,
                });
            });
    }

    render() {
        // console.log("this props in bio editor: ", this.props);
        if (this.state.editingMode) {
            return (
                <div className="bio">
                    <h2>You are da bomb, I wanna hear all about ya</h2>{" "}
                    <textarea
                        name="bio"
                        defaultValue={this.state.bio || "I am a fox"}
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button
                        className="btn user"
                        onClick={(e) => this.bioHandleClick(e)}
                    >
                        Save bio
                    </button>
                </div>
            );
        }
        return (
            <div className="bio border-acqua">
                <h2>Something groovy about myself</h2>
                <p>{this.state.bio}</p>

                <button className="btn user" onClick={() => this.toggleEdit()}>
                    {this.state.bio ? "Edit bio" : "Add bio"}
                </button>

                {this.state.error && <p>Oops, something went wrong</p>}
            </div>
        );
    }
}
