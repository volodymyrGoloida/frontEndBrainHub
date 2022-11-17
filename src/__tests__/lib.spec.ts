import { validateEmptyFields } from "../utils/checkEmptiesFields";
import { isValidEmailLength, isValidEmail } from "../utils/validateEmail";

describe("validators", () => {
  it("should return true and false in isValidEmailLength", () => {
    expect(isValidEmailLength("q@e")).toBeTruthy();
    expect(isValidEmailLength("qe")).toBeFalsy();
  });

  it("should return return true and false in isValidEmail", () => {
    expect(isValidEmail("qwe@qwe.qwe")).toBeTruthy();
    expect(isValidEmail("qwe@.qwe")).toBeFalsy();
    expect(isValidEmail("...1,;@qwe.qwe")).toBeFalsy();
  });

  it("should return object without errors", () => {
    const foo = {
      foo: "",
      bar: "qwe",
    };
    const result = validateEmptyFields(foo);
    expect(result).toBeDefined();
    expect(result.foo).toBe("This field is empty");
  });

  it("shouldn't return  object with errors", () => {
    const foo = {
      foo: "qwe",
      bar: "qwe",
    };
    const result = validateEmptyFields(foo);

    expect(result).toStrictEqual({});
  });
});
