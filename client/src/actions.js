// this will contain all of our action creators

import axios from "./Axios";

// an action creator is a function that returns an onjject

export async function receiveFriendsWannabes() {
    const { data } = await axios.get("/friends-wannabes");
    if (data.success) {
        // console.log(("recieveFriends data: ", data));
        // console.log("recieveFriends data.rows", data.rows);
        // console.log("recieveFriends data.rows[0]", data.rows[0].sender_id);
        return {
            type: "SHOW_WANNABES",
            friendsList: data.rows,
        };
    }
}

export async function acceptFriend(id) {
    try {
        const { data } = await axios.post("/check-friendship/accept", { id });
        console.log(("acceptFriend data: ", data));
        // console.log("acceptFriend data.rows.id", data.rows);
        return {
            type: "ACCEPT_FRIEND",
            id: id,
        };
    } catch (err) {
        console.log("err accepting friend: ", err);
    }
}

export async function unfriend(id) {
    try {
        const { data } = await axios.post("/check-friendship/end", { id });
        console.log(("unfriend data: ", data));
        // console.log("unfriend data.id", data.id);
        // console.log("unfriend data.rows.id", data.rows.id);
        return {
            type: "END_FRIENDSHIP",
            id: id,
        };
    } catch (err) {
        console.log("err accepting friend: ", err);
    }
}
