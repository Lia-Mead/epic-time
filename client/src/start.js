import ReactDOM from "react-dom";
import Welcome from "./Welcome.js";
import Header from "./Header";

let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = <Header />;
    // elem = <p>I am not the welcome route!</p>;
}
ReactDOM.render(elem, document.querySelector("main"));
