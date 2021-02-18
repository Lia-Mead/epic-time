import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { receiveFriendsWannabes, acceptFriend, unfriend } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();

    const friends = useSelector(
        (state) => state.users && state.users.filter((user) => user.accepted)
    );

    const wannabes = useSelector(
        (state) =>
            state.users && state.users.filter((user) => user.accepted == false)
    );

    useEffect(() => {
        dispatch(receiveFriendsWannabes());
    }, []);

    if (!friends || !wannabes) {
        return null;
    }

    return (
        <div>
            <h2>Wannabes</h2>
            <div className="friends">
                {wannabes &&
                    wannabes.map((user) => (
                        <div key={user.id}>
                            <div className="profile">
                                <img className="profile-pic" src={user.image} />
                                <p>
                                    {user.first} {user.last}
                                </p>
                                <div className="btn-purple">
                                    <button
                                        className="btn user"
                                        onClick={() =>
                                            dispatch(acceptFriend(user.id))
                                        }
                                    >
                                        Accept
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            <h2>Friends</h2>
            <div className="friends">
                {friends &&
                    friends.map((user) => (
                        <div key={user.id}>
                            <div className="profile">
                                <img className="profile-pic" src={user.image} />
                                <p>
                                    {user.first} {user.last}
                                </p>
                                <div className="btn-purple">
                                    <button
                                        className="btn user"
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
    );
}
