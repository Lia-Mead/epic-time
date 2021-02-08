import Greetee from "./greetee";
import Counter from "./counter";

export default function HelloWorld() {
    const userName = "Liat";
    return (
        <div className="newClass">
            <div>
                Hello, <Greetee firstName={userName} />
            </div>
            <div>
                Hello, <Greetee firstName="Adobo" />
            </div>
            <div>
                Hello, <Greetee />
            </div>
            <Counter />
        </div>
    );
}
