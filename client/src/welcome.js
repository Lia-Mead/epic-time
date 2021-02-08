// "dumb" /presentational are alternative for function component
import Registration from "./registration.js";

export default function Welcome() {
    return (
        <div className="con">
            <header>
                <img className="logo-reg" src="logo-green.svg" alt="logo" />
            </header>
            <h1>Welcome to Epic Time</h1>
            <p>
                Life was so much sweeter before we got hit by various
                presidential failures, covid, Gangnam Style and the Kardashians.
                <br />
                <br />
                Let's pretend we are still in the 80s-90s and play PAC-MAN and
                dance the disco.
            </p>
            <Registration />
        </div>
    );
}
