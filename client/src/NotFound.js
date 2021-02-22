import { Link } from "react-router-dom";

const NotFound = () => (
    <div className="profile high">
        <h1>404 - Not Found!</h1>
        <iframe
            src="https://giphy.com/embed/9J7tdYltWyXIY"
            width="480"
            height="404"
            frameBorder="0"
            className="giphy-embed"
            allowFullScreen
        ></iframe>
        <Link style={{ marginTop: "50px" }} to="/">
            <h3>Go West Life is Peaceful There</h3>
        </Link>
    </div>
);

export default NotFound;
