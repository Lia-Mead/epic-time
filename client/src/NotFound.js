import { Link } from "react-router-dom";

const NotFound = () => (
    <div className="profile high">
        <h1>404 - Not Found!</h1>
        <Link style={{ marginTop: "50px" }} to="/">
            <h3>Go West Life is Peaceful There</h3>
        </Link>
    </div>
);

export default NotFound;
