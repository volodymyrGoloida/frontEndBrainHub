import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import EventCreator from "./EventCreator";

jest.mock("../../cms/cms");

describe("component EventCreator", () => {
  it("should correct went through all user flow", async () => {
    const { baseElement } = render(<EventCreator />);
    expect(baseElement).toBeDefined();

    const buttonEl = screen.getByText("Create");
    expect(buttonEl).toBeInTheDocument();

    fireEvent.click(buttonEl);

    let inputErrors = screen.getAllByText("This field is empty");
    inputErrors.forEach((el) => expect(el).toBeInTheDocument());
    expect(inputErrors.length).toBe(4);

    const firstNameInput = screen.getByPlaceholderText(
      "please enter your first name"
    ) as HTMLInputElement;
    fireEvent.change(firstNameInput, {
      target: {
        value: "q",
      },
    });
    inputErrors = screen.getAllByText("This field is empty");
    expect(inputErrors.length).toBe(3);

    const emailInput = screen.getByPlaceholderText(
      "please enter your email"
    ) as HTMLInputElement;
    const lastNameInput = screen.getByPlaceholderText(
      "please enter your last name"
    ) as HTMLInputElement;

    // eslint-disable-next-line testing-library/no-node-access
    const datetimeLocalInput = baseElement.querySelector(
      "[name='eventDate']"
    ) as HTMLInputElement;

    fireEvent.change(lastNameInput, {
      target: {
        value: "qw",
      },
    });
    fireEvent.change(emailInput, {
      target: {
        value: "qw",
      },
    });
    fireEvent.change(datetimeLocalInput, {
      target: {
        value: "2018-06-12T19:30",
      },
    });

    fireEvent.click(buttonEl);
    let emailInputError = screen.getByText(
      "Length for email can be at least 3 elements."
    );
    expect(emailInputError).toBeInTheDocument();

    fireEvent.change(emailInput, {
      target: {
        value: "qwe3;@com",
      },
    });
    fireEvent.click(buttonEl);
    emailInputError = screen.getByText(
      "Your email isn't correct, please check it."
    );
    expect(emailInputError).toBeInTheDocument();

    fireEvent.change(emailInput, {
      target: {
        value: "qweqwe123@gmail.com",
      },
    });
    fireEvent.click(buttonEl);

    await waitFor(() => {
      expect(emailInput.value).toBe("");
    });
    expect(firstNameInput.value).toBe("");
    expect(lastNameInput.value).toBe("");
    expect(datetimeLocalInput.value).toBe("");
    expect(baseElement).toMatchSnapshot();
  });
});
