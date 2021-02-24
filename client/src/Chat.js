import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { socket } from "./socket";

export default function Chat(props) {
    const inputRef = useRef("");
    let scrollRef = useRef();

    const allMessages = useSelector((state) => state.messages);
    // console.log("allMessages", allMessages);
    // const cookie = useSelector((state) => state.cookie);
    // console.log("cookie", cookie);

    const messageHandleChange = (e) => {
        // console.log("e.target.value", e.target.value);
        // console.log("e.target.name", e.target.name);
        // e.target.name = e.target.value;
        inputRef.current.value = e.target.value;
    };

    const scrollToBottom = () => {
        scrollRef.current.scrollTop =
            scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
    };

    useEffect(() => {
        scrollToBottom();
        // console.log("elemRef.current.scrollTop", scrollRef.current.scrollTop);
    });

    const enterSend = (e) => {
        if (e.keyCode === 13) {
            newMessage();
            e.preventDefault();
        }
    };

    function newMessage() {
        // console.log("e.target.value", e.target.value);
        if (inputRef.current.value != 0) {
            socket.emit("chatMessage", inputRef.current.value);
        }
        inputRef.current.value = "";
    }

    return (
        <div className="chats bg-img">
            <h1>90's Chat</h1>
            <h2>Recieved Messages</h2>

            <div className="messages-display" ref={scrollRef}>
                {allMessages &&
                    allMessages.map((msg) => (
                        <div
                            className={
                                msg.sender_id == props.id
                                    ? "message my"
                                    : "message"
                            }
                            key={msg.id}
                        >
                            <div className="chat-user">
                                <img
                                    className="profile-pic small"
                                    src={msg.image || "/images/avatar.jpg"}
                                />
                                <p>
                                    {msg.first} {msg.last} on{" "}
                                    {msg.created_at
                                        .slice(0, 16)
                                        .replace("T", " at ")}
                                </p>
                            </div>
                            <p>{msg.message}</p>
                        </div>
                    ))}
            </div>
            <textarea
                name="message"
                placeholder="Type a message"
                className="chat-area"
                onChange={(e) => messageHandleChange(e)}
                onKeyDown={(e) => enterSend(e)}
                ref={inputRef}
            />
            <button onClick={() => newMessage()} className="btn user">
                Send
            </button>
        </div>
    );
}
