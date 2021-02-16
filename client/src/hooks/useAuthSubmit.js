import axios from "./Axios";
import { useState } from "react";

export function useAuthSubmit(url, values) {
    const [error, setError] = useState();

    const handleSubmit = (e) => {
        e.preventDefault(); // prevent button from triggering refresh
        axios
            .post(url, values)
            .then(({ data }) => {
                data.success ? location.replace("/") : setError(true);
            })
            .catch((err) => {
                console.log(`error in axios.post ${url}`, err);
                setError(true);
            });
    };
    return [error, handleSubmit];
}
