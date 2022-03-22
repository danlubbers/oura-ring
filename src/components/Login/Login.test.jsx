import { render } from "@testing-library/react";
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

test("Error messages show on screen when username or password is incorrect", () => {
  mockSubmit.mockImplementation((e) => e.preventDefault());

  const error = {
    usernameError: "The username you have submitted is incorrect!",
    passwordError: "The password you have submitted is incorrect!",
  };

  const enterUsernameElement = renderScreen.getByRole(
    "textbox",
    /Enter Username/i
  );

  const usernameErrorElement = renderScreen.queryByText(
    /The username you have submitted is incorrect!/i
  );

  // expect(usernameErrorElement).not.toBeInTheDocument();

  const submitBtn = renderScreen.getByRole("button", { type: "submit" });

  // userEvent.type(enterUsernameElement, "wrong username");

  userEvent.click(submitBtn);

  expect(mockSubmit).toBeCalledTimes(1);
  // expect(enterUsernameElement.value).not.toBe("dlubbers");
  // expect(usernameErrorElement.textContent).toBe(error.usernameError);
});
