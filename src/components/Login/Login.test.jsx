import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import LoginComponent from "./Login";

let renderScreen;

beforeEach(() => {
  const mockOnChange = jest.fn();
  const mockSubmit = jest.fn();

  renderScreen = render(
    <Router>
      <LoginComponent
        handleUsername={mockOnChange}
        handlePassword={mockOnChange}
        handleSubmit={mockSubmit}
        error={{
          usernameError: "The username you have submited is incorrect!",
          passwordError: "The password you have submitted is incorrect!",
        }}
      />
    </Router>
  );
});

test("Enter Username & Password are displayed correctly", () => {
  const enterUsernameEl = renderScreen.getByText(/Enter Username/i);
  expect(enterUsernameEl.textContent).toBe("Enter Username");

  const enterPasswordEl = renderScreen.getByText(/Enter Password/i);
  expect(enterPasswordEl.textContent).toBe("Enter Password");
});

test("Inputs should be blank on initial render", () => {
  const usernameEl = renderScreen.getByRole("textbox");
  expect(usernameEl.value).toBe("");
  const passwordEl = renderScreen.getByLabelText(/password/i);
  expect(passwordEl.value).toBe("");
});
