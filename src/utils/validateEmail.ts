import { MIN_EMAIL_LENGTH, REGEXP_EMAIL } from "./constants";

export const isValidEmail = (email: string) => REGEXP_EMAIL.test(email);
export const isValidEmailLength = (email: string) =>
  email.length >= MIN_EMAIL_LENGTH;
