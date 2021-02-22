import axios from "./Axios";
export default function DeleteProfilePic(props) {
    // console.log("props in delete: ", props);

    const submit = () => {
        axios
            .post(`/delete-profile-pic`)
            .then(({ data }) => {
                // console.log("data: ", data.rows[0].image);
                props.deletePic(data.rows[0].image);
            })
            .catch((err) => {
                console.log("err in axios get users: ", err);
            });
    };
    return (
        <div>
            <img
                onClick={() => submit()}
                src="/images/delete.svg"
                className="icon"
            />
        </div>
    );
}
