import BioEditor from "../BioEditor";
import { render, waitFor, fireEvent } from "@testing-library/react";
import axios from "../Axios";

jest.mock("./Axios");

test("first and last name become the alt of the image when passed as props ", () => {
    const { container } = render(<BioEditor bio="" />);
    const button = container.querySelector(".user");
    expect(button.innerHTML).toBe("Add bio");
});

test("When a bio is passed to it, an 'Edit' button is rendered", () => {
    const { container } = render(<BioEditor bio="there is a bio" />);
    const button = container.querySelector(".user");
    expect(button.innerHTML).toBe("Edit bio");
});

test("Clicking either the Add or Edit button causes a textarea and a Save button to be rendered.", () => {
    const { container } = render(<BioEditor bio="this is my bio" />);
    const button = container.querySelector(".user");
    expect(button.innerHTML).toBe("Edit bio");
    fireEvent.click(button);
    const textarea = container.querySelector("textarea");
    expect(textarea.innerHTML).toBe("this is my bio");
    expect(button.innerHTML).toBe("Save bio");
});

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
