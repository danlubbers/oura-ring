import { prettyDOM, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./login";

let renderScreen;

const mockSubmit = jest.fn();

beforeEach(() => {
  renderScreen = render(
    <Router>
      <Login />
    </Router>
  );
});

test("Enter Username & Password are displayed correctly", () => {
  const enterUsernameElement = renderScreen.getByText(/enter username/i);
  expect(enterUsernameElement.textContent).toBe("Enter Username");

  const enterPasswordElement = renderScreen.getByText(/Enter Password/i);
  expect(enterPasswordElement.textContent).toBe("Enter Password");
});

// test("Inputs should be blank on initial render", () => {
//   const usernameInputElement = renderScreen.getByRole("textbox", {
//     name: /enter username/i,
//   });
//   expect(usernameInputElement.value).toBe("");
//   const passwordInputElement = renderScreen.getByLabelText(/password/i);
//   expect(passwordInputElement.value).toBe("");
// });

// test("Username and Password are entered correctly", () => {
//   const username = "dlubbers";
//   const password = "passtest";

//   const usernameInputElement = renderScreen.getByRole("textbox", {
//     name: /enter username/i,
//   });
//   const passwordInputElement = renderScreen.getByLabelText(/password/i);

//   userEvent.type(usernameInputElement, "dlubbers");
//   userEvent.type(passwordInputElement, "passtest");

//   expect(usernameInputElement.value).toBe(username);
//   expect(passwordInputElement.value).toBe(password);
// });

// test("Error messages", () => {
//   mockSubmit.mockImplementation((e) => e.preventDefault());
//   console.log(prettyDOM(renderScreen.container));

//   const usernameInputElement = renderScreen.getByRole(
//     "textbox",
//     /enter username/i
//   );
//   const passwordInputElement = renderScreen.getByLabelText(/password/i);

//   const submitBtn = renderScreen.getByRole("button", {
//     type: "submit",
//   });

//   console.log(submitBtn);

//   userEvent.type(usernameInputElement, "dlubbers");
//   userEvent.type(passwordInputElement, "test");
//   userEvent.click(submitBtn);
//   expect(mockSubmit).toBeCalledTimes(1);
//   // expect(enterUsernameElement.value).not.toBe("dlubbers");
// });
