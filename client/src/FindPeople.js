import { useState, useEffect } from "react";
import axios from "./Axios";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [user, setUser] = useState("");
    const [users, setUsers] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        axios
            .get("/users")
            .then(({ data }) => {
                // console.log("data: ", data);
                setUser(data.rows);
            })
            .catch((err) => {
                console.log("error in axios GET users", err);
            });
    }, []);

    useEffect(() => {
        let abort = false;
        if (userInput) {
            axios
                .get(`/find/${userInput}`)
                .then(({ data }) => {
                    // console.log("data in find users: ", data);
                    if (!abort) {
                        setUsers(data.rows);
                        userInput && setError(!data.success);
                    } else {
                        abort = true;
                    }
                })
                .catch((err) => {
                    console.log("error in axios find users: ", err);
                });
        }
    }, [userInput]);

    return (
        <div className="find-people">
            <h1>Groove is in the Heart</h1>
            <h3>Check out the new time travelers</h3>

            {user &&
                user.map((user) => {
                    return (
                        <Link
                            to={`/user/${user.id}`}
                            key={user.id}
                            className="user-search"
                        >
                            <img
                                src={user.image || "/images/avatar.jpg"}
                                alt={`${user.first} ${user.last}`}
                            />
                            <p>{`${user.first} ${user.last} `}</p>
                        </Link>
                    );
                })}

            <div className="search-con">
                <input
                    name="userInput"
                    type="text"
                    placeholder="Find me baby one more time"
                    autoComplete="off"
                    onChange={(e) => setUserInput(e.target.value)}
                />
            </div>

            {error && (
                <p className="error">
                    Hello, there's no one here you're looking for
                </p>
            )}

            {userInput &&
                users.map((val, index) => {
                    // console.log("val: ", val);
                    return (
                        <Link
                            to={`/user/${val.id}`}
                            key={index}
                            className="user-search"
                        >
                            <img
                                src={val.image || "/images/avatar.jpg"}
                                alt={`${val.first} ${val.last}`}
                            />
                            <p>{`${val.first} ${val.last} `}</p>
                        </Link>
                    );
                })}

            {userInput && <h3>All That She Wants is another friend</h3>}
        </div>
    );
}
