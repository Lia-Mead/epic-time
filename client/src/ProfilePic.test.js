import ProfilePic from "./ProfilePic";
import { render } from "@testing-library/react";

// 3 tests
test("when no img from is passed, the default img is used as the src", () => {
    const { container } = render(
        <ProfilePic profilePicUrl="https://www.fillmurray.com/500/500" />
    );
    // console.log(
    //     'container.querySelector("img"): ',
    //     container.querySelector("img").src
    // );
    const img = container.querySelector("img");
    expect(img.src.endsWith("/default.png")).toBe(true);
});

test("when an image from is passed, that prop becomes the src of the image ", () => {
    const { container } = render(<ProfilePic />);

    const img = container.querySelector("img");
    expect(img.src).toBe("https://www.fillmurray.com/500/500");
});

//  first,
//     last,
//     profilePicUrl,
//     toggleUploader,
//     size = "",
test("first and last name become the alt of the image when passed as props ", () => {
    const { container } = render(<ProfilePic first="Lia" last="Mead" />);

    const img = container.querySelector("img");
    expect(img.alt).toBe("Lia Mead");
});
