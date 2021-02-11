import ReactDOM from "react-dom";
import Welcome from "./Welcome.js";
import App from "./App";

let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = <App />;
}
ReactDOM.render(elem, document.querySelector("main"));
