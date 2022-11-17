import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomInput from "./CustomInput";

describe("component CustomInput", () => {
  it("should successfully render CustomInput", () => {
    const { rerender, baseElement } = render(
      <CustomInput
        onChange={jest.fn}
        name="text"
        type="text"
        placeholder="please enter your email"
      />
    );
    const input = screen.getByPlaceholderText(
      "please enter your email"
    ) as HTMLInputElement;

    expect(input).toBeInTheDocument();
    fireEvent.change(input, {
      target: {
        value: "qqwe",
      },
    });

    expect(input.value).toBe("qqwe");

    rerender(
      <CustomInput
        onChange={jest.fn()}
        name="text"
        type="text"
        placeholder="please enter your email"
        error="qweqwe"
      />
    );
    const errorMessage = screen.getByText("qweqwe");
    expect(errorMessage).toBeInTheDocument();
    expect(baseElement).toMatchSnapshot();
  });
});
