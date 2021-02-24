import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { receiveFriendsWannabes, acceptFriend, unfriend } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();

    const friends = useSelector(
        (state) => state.users && state.users.filter((user) => user.accepted)
    );

    const pending = useSelector(
        (state) =>
            state.users &&
            state.users.filter(
                (user) =>
                    user.accepted == false && user.recipient_id === user.id
            )
    );

    const wannabes = useSelector(
        (state) =>
            state.users &&
            state.users.filter(
                (user) => user.accepted == false && user.sender_id === user.id
            )
    );

    useEffect(() => {
        dispatch(receiveFriendsWannabes());
    }, []);

    if (!friends || !wannabes || !pending) {
        return null;
    }

    return (
        <div className="friends-con" style={{ marginTop: "40px" }}>
            <h2>Wannabes</h2>
            <div className="friends">
                {wannabes.length === 0 && <h3>It's Oh So Quiet</h3>}
                {wannabes &&
                    wannabes.map((user) => (
                        <div key={user.id}>
                            <div className="profile">
                                <img
                                    className="profile-pic"
                                    src={user.image || "/images/avatar.jpg"}
                                />
                                <p>
                                    {user.first} {user.last}
                                </p>
                                <div className="profile">
                                    <button
                                        className="btn user"
                                        onClick={() =>
                                            dispatch(acceptFriend(user.id))
                                        }
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="btn ghost"
                                        onClick={() =>
                                            dispatch(unfriend(user.id))
                                        }
                                    >
                                        Ghost
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            <div style={{ marginTop: "40px" }}>
                <h2>Friends</h2>
                <div className="friends">
                    {friends.length === 0 && <h3>You are not alone</h3>}
                    {friends &&
                        friends.map((user) => (
                            <div key={user.id}>
                                <div className="profile">
                                    <img
                                        className="profile-pic"
                                        src={user.image || "/images/avatar.jpg"}
                                    />
                                    <p>
                                        {user.first} {user.last}
                                    </p>
                                    <div>
                                        <button
                                            className="btn ghost"
                                            onClick={() =>
                                                dispatch(unfriend(user.id))
                                            }
                                        >
                                            Unfriend
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <div style={{ marginTop: "40px" }}>
                <h2>My Pending Requests</h2>
                <div className="friends">
                    {pending.length === 0 && <h3>Common People</h3>}
                    {pending &&
                        pending.map((user) => (
                            <div key={user.id}>
                                <div className="profile">
                                    <img
                                        className="profile-pic"
                                        src={user.image || "/images/avatar.jpg"}
                                    />
                                    <p>
                                        {user.first} {user.last}
                                    </p>
                                    <div>
                                        <button
                                            className="btn ghost"
                                            onClick={() =>
                                                dispatch(unfriend(user.id))
                                            }
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            {friends.length === 0 &&
                wannabes.length === 0 &&
                pending.length === 0 && (
                    <Link to="/find-users">
                        <button
                            style={{ margin: "60px auto", display: "block" }}
                            className="btn user"
                        >
                            Start Making Friends
                        </button>
                    </Link>
                )}
        </div>
    );
}
