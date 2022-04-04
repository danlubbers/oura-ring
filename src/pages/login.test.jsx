import { prettyDOM, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./login";

const username = "dlubbers";
const password = "passtest";

const typeIntoForm = ({ username, password }) => {
  const usernameInputElement = screen.getByRole("textbox", {
    name: /username/i,
  });
  const passwordInputElement = screen.getByLabelText("Enter Password");

  if (username) {
    // console.log("username", username);
    userEvent.type(usernameInputElement, username);
  }
  if (password) {
    // console.log("password", password);
    userEvent.type(passwordInputElement, password);
  }

  return {
    usernameInputElement,
    passwordInputElement,
  };
};

const submitBtnClick = () => {
  const submitBtn = screen.getByRole("button", { type: "submit" });
  userEvent.click(submitBtn);
};

beforeEach(() => {
  render(
    <Router>
      <Login />
    </Router>
  );
});

describe("login", () => {
  test("Enter Username & Password are displayed correctly", () => {
    expect(screen.getByText(/enter username/i).textContent).toBe(
      "Enter Username"
    );
    expect(screen.getByText(/Enter Password/i).textContent).toBe(
      "Enter Password"
    );
  });

  test("Inputs should be blank on initial render", () => {
    expect(screen.getByRole("textbox").value).toBe("");
    expect(screen.getByLabelText(/password/i).value).toBe("");
  });

  test("Username and Password are entered correctly", () => {
    const { usernameInputElement } = typeIntoForm({ username: "dlubbers" });
    const { passwordInputElement } = typeIntoForm({ password: "passtest" });

    expect(usernameInputElement.value).toBe(username);
    expect(passwordInputElement.value).toBe(password);
  });

  describe("Error handling", () => {
    test("Display username error if username is incorrect", () => {
      expect(
        screen.queryByText(/The username you have submitted is incorrect!/i)
      ).not.toBeInTheDocument();

      const { usernameInputElement } = typeIntoForm({ username: "wrong name" });
      submitBtnClick();

      expect(usernameInputElement.value).not.toBe(username);
      expect(
        screen.getByText(/The username you have submitted is incorrect!/i)
      ).toBeInTheDocument();
    });

    test("Display password error if password is incorrect", () => {
      expect(
        screen.queryByText(/The password you have submitted is incorrect!/i)
      ).not.toBeInTheDocument();

      const { passwordInputElement } = typeIntoForm({ password: "failtest" });
      submitBtnClick();

      expect(passwordInputElement.value).not.toBe(password);
      expect(
        screen.getByText(/The password you have submitted is incorrect!/i)
      ).toBeInTheDocument();
    });
  });
});
