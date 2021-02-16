import App from "../App";

import { render, waitFor, fireEvent } from "@testing-library/react";
import axios from "../Axios";

jest.mock("./Axios");

axios.get.mockResolvedValue({
    data: {
        first: "Lia",
        last: "Mead",
        image: "https://www.fillmurray.com/500/500",
        id: 1,
    },
});



test("app stuff", async () => {
    const {container} = render(<App />);
    console.log('container.innerHTML: ', container.innerHTML);

    // expect(container.innerHTML).toContain("spinner");

    await waitFor(()=> container.querySelector(".border-pink"));

    expect(container.innerHTML).toContain("h1");

    console.log('container.innerHTML:', container.innerHTML);

    const smallProfilePic = container.querySelector("img");
    fireEvent.click(container.querySelector("img"));
    console.log('container.innerHTML:', container.innerHTML);
    expect(container.innerHTML).toContain("Upload");

}
// const testUtils = require("react-dom/test-utils");

// console.log("testing...");

// const myMockFn = jest.fn((n) => n >= 18);

// test("filter calls function properly", () => {
//     const a = [22, 15, 37];
//     a.filter(myMockFn);

//     console.log("myMockFn.mock:", myMockFn.mock);
//     // check that filter calls the cb for each element in the array
//     expect(myMockFn.mock.calls.length).toBe(3);

//     // check that the first elem passes the filter check
//     expect(myMockFn.mock.results[0].value).toBeTruthy();

//     // check that the second element "fails" the filter check
//     expect(myMockFn.mock.results[1].value).toBe(false);
// });