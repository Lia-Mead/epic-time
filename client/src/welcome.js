import { HashRouter, Route } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import Header from "./Header";

export default function Welcome() {
    return (
        <>
            <Header />
            <div className="con">
                <div className="intro">
                    <h1>Welcome to Epic Time</h1>
                    <h2>The Social nostalgia network</h2>
                    <p>
                        Life was so much sweeter before we got hit by various
                        presidential failures, covid, Gangnam Style and the
                        Kardashians.
                        <br />
                        <br />
                        Let's pretend we are still in the 80s-90s and play
                        PAC-MAN and dance the disco.
                    </p>
                </div>
                <HashRouter>
                    <>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                        <Route
                            path="/password/reset/start"
                            component={ResetPassword}
                        />
                    </>
                </HashRouter>
            </div>
        </>
    );
}
