import React from "react";
import axios from "./Axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
        // strategy 1
        // this.handleChange = this.handleChange.bind(this);

        // this.setState({
        //     error: true,
        // });
    }

    handleChange(e) {
        // console.log("e target value", e.target.value);
        // see where the user types in
        console.log("e target name", e.target.name);
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state", this.state)
        );
        // if (e.target.name === "first") {
        //     this.setState(
        //         {
        //             first: e.target.value,
        //         }
        //         // () => console.log("this.state: ", this.state)
        //     );
        // } else if (e.target.name === "last") {
        //     this.setState({
        //         last: e.target.value,
        //     });
        // }
    }

    handleClick() {
        // console.log("click!");
        // 1.. send the user's input off to the server (in a POST)
        // remaining tasks: make the red underlines go away
        axios
            .post("/registration", this.state)
            .then((resp) => {
                console.log("response from server", resp);
                // need to look at the "resp" and make sure there are no error message from the server
                if (!resp.data.success) {
                    this.setState({
                        error: true,
                    });
                    // e.g. user forgot to fill a field
                    // then render an error message
                    // handle error - message render
                } else {
                    // if successful redirextc user to the '/' route
                    location.replace("/");
                }
            })
            .catch((err) => {
                console.log("err in registration: ", err);
            });
        // how to conditionally render an error message
    }

    render() {
        return (
            <div className="center-box">
                <div className="reg-form">
                    <h2>Registration</h2>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="first"
                        type="text"
                        placeholder="First Name"
                    ></input>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="last"
                        type="text"
                        placeholder="Last Name"
                    ></input>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="email"
                        type="text"
                        placeholder="Email"
                    ></input>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="password"
                        type="text"
                        placeholder="Password"
                    ></input>
                    <button className="btn" onClick={() => this.handleClick()}>
                        Submit
                    </button>
                    <p>
                        Already have an account?
                        <Link to="/login"> Click here </Link> to Log in
                    </p>

                    {/* <Link to="/login">
                        Already have an account? <br />
                        Click here to Log in!
                    </Link> */}
                    {this.state.error && <p>Something broke :(</p>}
                </div>
            </div>
        );
    }
}
