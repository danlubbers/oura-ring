import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./login";

test("Login Component", () => {
  //   const mockSubmit = jest.fn();
  render(
    <Router>
      <Login />
    </Router>
  );
});
