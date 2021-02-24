import { useState, useEffect } from "react";
import axios from "./Axios";

export default function FriendshipButton(props) {
    const [friendshipStatus, setFriendshipStatus] = useState("");
    const [error, setError] = useState(false);
    // const [buttonText, setButtonText] = "send";

    const buttonText = {
        send: "Make Friendship Request",
        accept: "Accept Friendship",
        cancel: "Cancel Friendship Request",
        end: "End Friendship",
    };

    useEffect(() => {
        // console.log("props: ", props);
        // console.log("friendshipbutton did mount");
        axios
            .get(`/check-friendship/${props.id}`)
            .then(({ data }) => {
                // console.log("data.accepted", data.accepted);
                setFriendshipStatus(data.button);

                if (data.button == "cancel") {
                    props.updateFriendshipStatus(true);
                }

                // if (data.button == "accept") {
                //     props.updateFriendshipStatus(false);
                // }
            })
            .catch((err) => {
                console.log("error in axios GET users", err);
            });
    }, []);

    const setSubmit = () => {
        // console.log("setSubmit");
        axios
            .post(`/check-friendship/${friendshipStatus}`, { id: props.id })
            .then(({ data }) => {
                // console.log("data: ", data);
                setFriendshipStatus(data.button);

                if (data.button == "cancel") {
                    props.updateFriendshipStatus(true);
                }

                // else if (data.button == "accept") {
                //     props.updateFriendshipStatus(false);
                // }
            })
            .catch((err) => {
                console.log("error in axios GET users", err);
            });
    };

    return (
        <>
            {friendshipStatus && (
                <button className="btn user" onClick={() => setSubmit()}>
                    {buttonText[friendshipStatus]}
                </button>
            )}
        </>
    );
}
