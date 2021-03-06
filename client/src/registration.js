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
        // console.log("e target name", e.target.name);
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
        axios
            .post("/registration", this.state)
            .then((resp) => {
                console.log("response from server", resp);
                // need to look at the "resp" and make sure there are no error message from the server
                if (!resp.data.success) {
                    this.setState({
                        error: true,
                    });
                } else {
                    location.replace("/");
                }
            })
            .catch((err) => {
                console.log("err in registration: ", err);
            });
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
                        autoComplete="off"
                    ></input>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="last"
                        type="text"
                        placeholder="Last Name"
                        autoComplete="off"
                    ></input>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="email"
                        type="email"
                        placeholder="Email"
                        autoComplete="off"
                    ></input>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="off"
                    ></input>
                    <button className="btn" onClick={() => this.handleClick()}>
                        Submit
                    </button>

                    {this.state.error && (
                        <p className="error">
                            Oops, something went wrong ???? Please fill all the
                            fields.
                        </p>
                    )}
                    <p>
                        Already have an account?
                        <Link to="/login"> Click here </Link> to Log in
                    </p>
                </div>
            </div>
        );
    }
}
