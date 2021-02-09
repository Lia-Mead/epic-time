import React from "react";
import axios from "./Axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }

    handleChange(e) {
        // console.log("e target name", e.target.name);
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state", this.state)
        );
    }

    handleClick() {
        axios
            .post("/login", this.state)
            .then((resp) => {
                console.log("response from server", resp);
                if (!resp.data.success) {
                    this.setState({
                        error: true,
                    });
                } else {
                    location.replace("/");
                }
            })
            .catch((err) => {
                console.log("err in login: ", err);
            });
    }

    render() {
        return (
            <div className="center-box">
                <div className="reg-form">
                    <h2>Login</h2>
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
                        Log in
                    </button>
                    <Link to="/">
                        Don't have an account yet? Click here to register!
                    </Link>
                    <Link to="/password/reset/start">
                        Forgot your password? Click here to reset!
                    </Link>
                    {this.state.error && (
                        <p>The email and password are not matching</p>
                    )}
                </div>
            </div>
        );
    }
}
