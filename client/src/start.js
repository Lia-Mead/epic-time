import ReactDOM from "react-dom";
import Welcome from "./welcome.js";
let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = <img className="logo" src="logo.svg" alt="logo" />;
    // elem = <p>I am not the welcome route!</p>;
}
ReactDOM.render(elem, document.querySelector("main"));
