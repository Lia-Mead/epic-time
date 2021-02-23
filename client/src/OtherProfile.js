import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "./Axios";
import { Link } from "react-router-dom";
import FriendShipButton from "./FriendshipButton";

export default function OtherProfile(props) {
    const [id, setId] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [image, setImage] = useState("");
    const [bio, setBio] = useState("");
    const [error, setError] = useState(false);
    const [friendship, setFriendship] = useState("");
    const [userfriends, setUserfriends] = useState([]);

    // first elemet is the current state - first time the component renders is the defaut value
    // state updates - those values update
    // second element - are FUNCTIONS - that i use to update the state

    const updateFriendshipStatus = (status) => {
        setFriendship(status);
    };

    useEffect(() => {
        console.log("this.props.match.params id: ", props.match.params.id);

        axios
            .get(`/show-users/${props.match.params.id}`)
            .then((resp) => {
                if (props.match.params.id == resp.data.cookie) {
                    return props.history.push("/");
                }
                setId(resp.data.rows.id);
                setFirst(resp.data.rows.first);
                setLast(resp.data.rows.last);
                setImage(resp.data.rows.image);
                setBio(resp.data.rows.bio);
                setError(false);
            })
            .catch((err) => {
                console.log("error in GET other profile", err);
                setError(true);
            });

        axios
            .get(`/friends-of-someoneelse/${props.match.params.id}`)
            .then((resp) => {
                console.log("resp.data.rows.id", resp.data.rows[0].id);
                console.log("resp.data.rows.id", resp.data.rows);
                console.log("cookie", resp.data.cookie);
                // if (resp.data.rows[0].id != resp.data.cookie) {
                //     return;
                // }
                setUserfriends(resp.data.rows);
            })
            .catch((err) => {
                console.log("error in GET other friends-of-someoneelse", err);
                setError(true);
            });
    }, []);

    return (
        <>
            {!id && (
                <div className="profile error">
                    {error && (
                        <>
                            <p>This user has not yet made it to the 90's.</p>

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
            )}

            {id && (
                <div className="profile">
                    <h1>
                        {first} {last}
                    </h1>
                    <img
                        className="profile-pic"
                        src={image || "/images/avatar.svg"}
                        alt={`${first} ${last}`}
                    />
                    <p className="bio">{bio}</p>
                    <FriendShipButton
                        id={id}
                        updateFriendshipStatus={(e) => {
                            updateFriendshipStatus(e);
                        }}
                    />
                </div>
            )}

            {!userfriends.length == 0 && (
                <div className="other-con">
                    <h2>{first}'s Friends</h2>
                    <div className="other-friends">
                        {userfriends &&
                            userfriends.map((user) => (
                                <div key={user.id}>
                                    <Link
                                        className="other-friend-box"
                                        to={`/user/${user.id}`}
                                    >
                                        <img
                                            className="profile-pic other"
                                            src={
                                                user.image ||
                                                "/images/avatar.svg"
                                            }
                                        />
                                        <p>
                                            {user.first} {user.last}
                                        </p>
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>
            )}

            <Link to="/find-users">
                <h3>Find More Retro Humans</h3>
            </Link>
        </>
    );
}
