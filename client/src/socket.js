import { io } from "socket.io-client";
import { showMessages, chatMessage, showNewMessage } from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", (msgs) => store.dispatch(showMessages(msgs)));

        socket.on("chatMessage", (msg) => store.dispatch(chatMessage(msg)));

        socket.on("newMessage", (msg) => store.dispatch(showNewMessage(msg)));
    }
};
