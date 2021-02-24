import axios from "./Axios";
import { useState } from "react";

export default function DeleteAccount() {
    const [toggleDel, setToggleDel] = useState(false);
    // const [notMember, setNotMember] = useState(false);

    const toggleDelete = () => {
        setToggleDel(!toggleDel);
    };

    const delProf = () => {
        axios
            .post(`/delete-account`)
            .then(() => {
                // setNotMember(true);
                window.location.reload();
            })
            .catch((err) => {
                console.log("err in axios delete account: ", err);
            });
    };
    return (
        <>
            <a onClick={() => toggleDelete()} className="del-link">
                Delete Account
            </a>

            {toggleDel && (
                <div className="del-box">
                    <p>Are you sure?</p>
                    <div className="connencted">
                        <button onClick={() => delProf()} className="btn user">
                            Yes, Delete
                        </button>
                        <button
                            onClick={() => toggleDelete()}
                            className="btn ghost"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

// {
//     notMember && <p>Sad to see you Go</p>;
// }
