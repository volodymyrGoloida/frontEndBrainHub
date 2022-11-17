import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("component Button", () => {
  it("should successfully render Button", () => {
    const { baseElement } = render(<Button>some button</Button>);
    const button = screen.getByText("some button");
    expect(button).toBeInTheDocument();
    expect(baseElement).toMatchSnapshot();
  });
});
