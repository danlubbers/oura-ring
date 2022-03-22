import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./login";

let renderScreen;

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

test("Inputs should be blank on initial render", () => {
  const usernameInputElement = renderScreen.getByRole("textbox");
  expect(usernameInputElement.value).toBe("");
  const passwordInputElement = renderScreen.getByLabelText(/password/i);
  expect(passwordInputElement.value).toBe("");
});

test("Username and Password are entered correctly", () => {
  const username = "dlubbers";
  const password = "passtest";

  const usernameInputElement = renderScreen.getByRole("textbox", {
    name: /username/i,
  });
  const passwordInputElement = renderScreen.getByLabelText("Enter Password");

  userEvent.type(usernameInputElement, "dlubbers");
  userEvent.type(passwordInputElement, "passtest");

  expect(usernameInputElement.value).toBe(username);
  expect(passwordInputElement.value).toBe(password);
});
