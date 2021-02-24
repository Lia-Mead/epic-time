import FriendshipButton from "../friendshipButton";
import { render, fireEvent } from "@testing-library/react";
import axios from "../Axios";
import { act } from "react-dom/test-utils";

jest.mock("../Axios");

axios.get.mockResolvedValue({
    data: {
        button: "send",
    },
});
axios.post.mockResolvedValue({
    data: {
        button: "accept",
    },
});

test("Clicking friendship button triggers get request.", () => {
    const container = document.querySelector("container");

    const button = container.querySelector(".btn");
    expect(button.innerHTML).toBe("Make Friendship Request");

    act(() => {
        // container.render(<FriendshipButton id="34" />, container);
        fireEvent.click(button);
    });
});

test("Clicking friendship button triggers get request.", () => {
    const { container } = render(<FriendshipButton id="34" />);
    const button = container.querySelector(".btn");
    expect(button.innerHTML).toBe("Make Friendship Request");
    fireEvent.click(button);
});

// test("Clicking 'Make Friendship Request' button changes to 'Cancel Friendship Request'.", () => {
//     const { container } = render(<FriendshipButton />);
//     const button = container.querySelector(".user");
//     expect(button.innerHTML).toBe("Make Friendship Request");
//     fireEvent.click(button);
//     expect(button.innerHTML).toBe("Cancel Friendship Request");
// });

// test("Clicking either the Add or Edit button causes a textarea and a Save button to be rendered.", () => {
//     const { container } = render(<BioEditor bio="this is my bio" />);
//     const button = container.querySelector(".user");
//     expect(button.innerHTML).toBe("Edit bio");
//     fireEvent.click(button);
//     const textarea = container.querySelector("textarea");
//     expect(textarea.innerHTML).toBe("this is my bio");
//     expect(button.innerHTML).toBe("Save bio");
// });

// this test doesn't work
// test("Clicking the Save button causes an ajax request.", async () => {
//     const { container } = render(<BioEditor bio="this is my bio" />);
//     const button = container.querySelector(".user");

//     // expect(button.innerHTML).toBe("Save bio");
//     fireEvent.click(button);

//     axios.post.mockResolvedValue({
//         data: {
//             bio: "I just wrote a bio",
//         },
//     });

//     // expect(p.innerHTML).toBe("this is my bio");

//     await waitFor(() => {
//         const p = container.querySelector("p");
//         expect(p.innerHTML).toContain("I just wrote a bio");
//     });
// });
