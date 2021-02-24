import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { Provider } from "react-redux";
import { reducer } from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import Welcome from "./welcome.js";
import App from "./App";

import { init as initializeSocket } from "./socket";

// const socket = io.connect();

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;

if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    initializeSocket(store);
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(elem, document.querySelector("main"));
