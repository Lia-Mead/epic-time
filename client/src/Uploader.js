import { Component } from "react";
import axios from "./Axios";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            error: false,
        };
    }

    handleChange(e) {
        // console.log("e: ", e);
        // console.log("e.target.files[0]: ", e.target.files[0]);
        this.setState({
            file: e.target.files[0],
        });
    }

    submit(e) {
        e.preventDefault();
        let formData = new FormData();
        // console.log("file in submit", this.state.file);
        formData.append("file", this.state.file);

        axios
            .post("/profile-pic", formData)
            .then((resp) => {
                // console.log("response from profile-pic", resp);
                // console.log("resp.data.data"), resp.data.rows;
                this.props.setProfilePicUrl(resp.data.rows);
            })
            .catch((err) => {
                console.log("error in POST upload pic submit", err);
            });
    }

    render() {
        // console.log("this.props in uploader", this.props);
        return (
            <div className="uploader">
                <input
                    className="input-file"
                    onChange={(e) => {
                        this.handleChange(e);
                    }}
                    name="file"
                    type="file"
                    accept="image/*"
                />
                <button className="btn upload" onClick={(e) => this.submit(e)}>
                    Upload
                </button>
                {this.state.error && <p>Oops something went wrong.</p>}
            </div>
        );
    }
}
