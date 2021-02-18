// this will contain all of our action creators

import axios from "../Axios";

// an action creator is a function that returns an onjject
export async function myFirstActionCreator() {
    // we can optionally talk to the server here...

    const { data } = await axios.get("/someroute");
    return {
        type: "UPDATE_STATE_SOMEHOW",
        data: data.userId,
    };
}
