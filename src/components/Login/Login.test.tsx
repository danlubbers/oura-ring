import {
  Matcher,
  render,
  SelectorMatcherOptions,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import LoginComponent from "./Login";

let component:
  | ((
      text: Matcher,
      options?: SelectorMatcherOptions | undefined,
      waitForElementOptions?: unknown
    ) => HTMLElement)
  | ((arg0: RegExp) => any);

beforeEach(() => {
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
  component = renderLogin.getByText;
});

test("Enter Username & Password are displayed correctly", () => {
  const enterUsernameEl = component(/Enter Username/i);
  expect(enterUsernameEl.textContent).toBe("Enter Username");

  const enterPasswordEl = component(/Enter Password/i);
  expect(enterPasswordEl.textContent).toBe("Enter Password");
});
