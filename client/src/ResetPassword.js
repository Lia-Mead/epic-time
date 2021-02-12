import React from "react";
import axios from "./Axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
            renderView: 1,
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
        let route = [
            "none",
            "/password/reset/start",
            "/password/reset/verify",
            "/password/reset/verify",
        ];

        axios
            // .post(url, this.state)
            .post(route[this.state.renderView], this.state)
            .then((resp) => {
                // console.log("response from server", resp);
                if (!resp.data.success) {
                    this.setState({
                        error: true,
                    });
                } else {
                    this.setState({
                        // renderView: 2,
                        error: false,
                        renderView: this.state.renderView === 1 ? 2 : 3,
                        // [e.target.name]: null,
                    });
                }
            })
            .catch((err) => {
                console.log("err in reset password: ", err);
            });
    }

    whichView() {
        if (this.state.renderView === 1) {
            return (
                <>
                    <h2>Reset password</h2>
                    <p>Please insert your email</p>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="email"
                        type="email"
                        placeholder="Email"
                        autoComplete="off"
                    ></input>
                    <button className="btn" onClick={() => this.handleClick()}>
                        Reset Password
                    </button>
                </>
            );
        } else if (this.state.renderView === 2) {
            return (
                <>
                    <h2>Reset password</h2>
                    <p>Please enter the code you received</p>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="code"
                        type="text"
                        placeholder="Code"
                        key={1}
                        autoComplete="off"
                    ></input>
                    <p>Please enter a new password</p>

                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="off"
                    ></input>
                    <button className="btn" onClick={() => this.handleClick()}>
                        Confirm
                    </button>
                </>
            );
        } else if (this.state.renderView === 3) {
            return (
                <>
                    <h2>Your password was changed successfuly</h2>
                    <p>
                        You can now <Link to="/login">Log in</Link> with your
                        new password
                    </p>
                </>
            );
        }
    }

    render() {
        return (
            <div className="center-box">
                <div className="reg-form">
                    {this.whichView()}

                    {this.state.error && (
                        <p className="error">Oops, something went wrong</p>
                    )}
                </div>
            </div>
        );
    }
}
