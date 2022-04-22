import { prettyDOM, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import RenderUserData from "../RenderUserData/RenderUserData";
import mockUserData from "../../data/mockData/mockUserData.json";
import userEvent from "@testing-library/user-event";

const { age, height, weight, gender, email } = mockUserData;

const userDataProps = {
  age: age,
  height: height,
  weight: weight,
  gender: gender,
  email: email,
  isImperial: false,
  setUnits: jest.fn(),
  isMobileDisplay: true,
  handleClickMobileDisplay: jest.fn(),
};

const renderComponent = (props) => {
  render(
    <Router>
      <RenderUserData {...props} />
    </Router>
  );
};

describe("UserData", () => {
  test("should display the correct user text content", () => {
    renderComponent(userDataProps);
    expect(screen.getByTestId("age").textContent).toBe("AGE: ");

    expect(screen.getByTestId("height").textContent).toBe("HEIGHT: ");
    expect(screen.getByTestId("weight").textContent).toBe("WEIGHT: ");
    expect(screen.getByTestId("gender").textContent).toBe("GENDER: ");
  });
  test("should display the correct user values", () => {
    renderComponent(userDataProps);
    expect(screen.getByTestId(/age-value/i).textContent).toBe("41");
    expect(screen.getByTestId(/height-value/i).textContent).toBe("178");
    expect(screen.getByTestId(/weight-value/i).textContent).toBe("63.5");
    expect(screen.getByTestId(/gender-value/i).textContent).toBe("male");
    expect(screen.getByTestId(/email-value/i).textContent).toBe(
      "email@test.com"
    );
  });
  test("should change to imperial when isImperial is set to true", () => {
    renderComponent({ ...userDataProps, isImperial: true });

    expect(screen.getByTestId(/height-value/i).textContent).toBe("5ft 8in");
    expect(screen.getByTestId(/weight-value/i).textContent).toBe("140");
  });
});
