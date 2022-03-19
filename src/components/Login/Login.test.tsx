import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import LoginComponent from "./Login";

const mockSubmit = jest.fn();
const renderLogin = render(
  <Router>
    <LoginComponent
      handleUsername={mockSubmit}
      handlePassword={mockSubmit}
      handleSubmit={mockSubmit}
      error={{
        usernameError: "Incorrect Username",
        passwordError: "Incorrect Password",
      }}
    />
  </Router>
);

test("Enter Username & Password are displayed correctly", () => {
  const enterUsernameEl = renderLogin.getByText(/Enter Username/i);
  expect(enterUsernameEl.textContent).toBe("Enter Username");

  const enterPasswordEl = renderLogin.getByText(/Enter Password/i);
  expect(enterPasswordEl.textContent).toBe("Enter Password");
});
