import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./login";

beforeEach(() => {
  render(
    <Router>
      <Login />
    </Router>
  );
});

describe("login", () => {
  test("Enter Username & Password are displayed correctly", () => {
    const enterUsernameElement = screen.getByText(/enter username/i);
    const enterPasswordElement = screen.getByText(/Enter Password/i);

    expect(enterUsernameElement.textContent).toBe("Enter Username");
    expect(enterPasswordElement.textContent).toBe("Enter Password");
  });

  test("Inputs should be blank on initial render", () => {
    const usernameInputElement = screen.getByRole("textbox");
    const passwordInputElement = screen.getByLabelText(/password/i);

    expect(usernameInputElement.value).toBe("");
    expect(passwordInputElement.value).toBe("");
  });

  test("Username and Password are entered correctly", () => {
    const username = "dlubbers";
    const password = "passtest";

    const usernameInputElement = screen.getByRole("textbox", {
      name: /username/i,
    });
    const passwordInputElement = screen.getByLabelText("Enter Password");

    userEvent.type(usernameInputElement, "dlubbers");
    userEvent.type(passwordInputElement, "passtest");

    expect(usernameInputElement.value).toBe(username);
    expect(passwordInputElement.value).toBe(password);
  });
});
