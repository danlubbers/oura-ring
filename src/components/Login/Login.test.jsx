import { render, prettyDOM, getByText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import LoginComponent from "./Login";

let renderScreen;
const mockOnChange = jest.fn();
const mockSubmit = jest.fn();

beforeEach(() => {
  renderScreen = render(
    <Router>
      <LoginComponent
        handleUsername={mockOnChange}
        handlePassword={mockOnChange}
        handleSubmit={mockSubmit}
        error={{
          usernameError: "The username you have submitted is incorrect!",
          passwordError: "The password you have submitted is incorrect!",
        }}
      />
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
  const usernameInputElement = renderScreen.getByRole("textbox", {
    name: /enter username/i,
  });
  const passwordInputElement = renderScreen.getByLabelText(/password/i);

  expect(usernameInputElement.value).toBe("");
  expect(passwordInputElement.value).toBe("");
});

test("Username and Password are entered correctly", () => {
  const usernameInputElement = renderScreen.getByRole("textbox", {
    name: /enter username/i,
  });
  const passwordInputElement = renderScreen.getByLabelText(/password/i);

  userEvent.type(usernameInputElement, "dlubbers");
  userEvent.type(passwordInputElement, "passtest");

  expect(usernameInputElement.value).toBe("dlubbers");
  expect(passwordInputElement.value).toBe("passtest");
});

test("Error messages show on screen when username or password is incorrect", () => {
  // mockSubmit.mockImplementation((e) => e.preventDefault());

  const usernameInputElement = renderScreen.getByRole("textbox", {
    name: /enter username/i,
  });
  const userErrorMessageElement = renderScreen.queryByText(
    /The username you have submitted is incorrect!/i
  );
  const submitBtn = renderScreen.getByRole("button", { type: /submit/i });

  expect(userErrorMessageElement).not.toBeInTheDocument();

  userEvent.type(usernameInputElement, "dlubbers");
  userEvent.click(submitBtn);

  expect(userErrorMessageElement).toBeInTheDocument();
});
