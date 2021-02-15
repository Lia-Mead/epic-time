import { useState, useEffect } from "react";
import axios from "./Axios";

function SearchCountries() {
    // 1. get input from the user
    // 2. talk to apievery time user types. store the countries from api in state
    const [country, setCountry] = useState("");
    const [countries, setCountries] = useState([]);

    // useEffect(() => {
    //     // technically useEffect is every life cycle method
    //     // useEffect is the equivalent of componentDidMount
    //     // console.log("useEffect is running");
    //     // useeffect runs when the component mounts
    //     // useeffect also runs every time state is updated in the component
    //     // withht empty array as a second arg the seteffect is only like component did mount
    // }, []);

    // useEffect(() => {
    //     axios
    //         .get(`https://spicedworld.herokuapp.com/?q=${country}`)
    //         .then(({ data }) => {
    //             console.log("data: ", data);
    //         });
    // });

    useEffect(() => {
        // then this runs
        let abort = false;
        (async () => {
            try {
                const { data } = await axios.get(
                    `https://spicedworld.herokuapp.com/?q=${country}`
                );
                // console.log("data: ", data);
                if (!abort) {
                    setCountries(data);
                }
                // console.log("countries: ", countries);
            } catch (err) {
                console.log("err: ", err);
            }
        })();

        // this funtion runs BEFORE every re-render - cleanup function (equivalent componentWillUnmount)
        return () => {
            console.log("country in returned function: ", country);
            abort = true;
        };
    }, [country]);

    console.log("countries: ", countries);

    return (
        <div>
            <h1>Countries</h1>
            <h1>country: {country}</h1>
            <input
                name="country"
                type="text"
                placeholder="country to search"
                autoComplete="off"
                onChange={(e) => setCountry(e.target.value)}
            />
            {countries.map((elem, index) => {
                // console.log("elem: ", elem);
                return <p key={index}>{elem}</p>;
            })}
        </div>
    );
}

// HOOKS

// function Hello() {
//     // first is our state property
//     // setState is the function we'll use to update "first"
//     const [first, setFirst] = useState("Ivana");

//     const handleChange = (e) => {
//         console.log("e target value: ", e.target.value);
//         setFirst(e.target.value);
//     };

//     return (
//         <div>
//             <h1>Hello {first}</h1>
//             <input name="first" type="text" onChange={handleChange} />
//         </div>
//     );
// }

// import Greetee from "./greetee";
// import Counter from "./counter";

// export default function HelloWorld() {
//     const userName = "Liat";
//     return (
//         <div className="newClass">
//             <div>
//                 Hello, <Greetee firstName={userName} />
//             </div>
//             <div>
//                 Hello, <Greetee firstName="Adobo" />
//             </div>
//             <div>
//                 Hello, <Greetee />
//             </div>
//             <Counter />
//         </div>
//     );
// }
