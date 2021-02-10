import { ProfilePic } from "./ProfilePic";

// export function Uploader() {
//     return (
//         <div className="profile-pic">
//             <ProfilePic />
//         </div>
//     );
// }

export class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        };
        this.submit = this.submit.bind(this);
    }

    submit() {
        // const formData = newFormData();
        // formData.append("profilePic", this.state);
        // Axios request
        // update state of app with new prof pic once available
        // this.props.updateProfilePic(profilePicUrl);
    }

    render() {
        return (
            <div className="uploader">
                <input type="file" />
                <button onClick={this.submit}>Upload</button>
            </div>
        );
    }
}
