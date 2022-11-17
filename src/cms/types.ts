import { AxiosResponse } from "axios";

export type ErrorMessage<T> = {
  key: T;
  errorMessage: string;
};

export type ErrorMessages<T> = Array<ErrorMessage<T>>;

export type EventCreateRequest = {
  firstName: string;
  lastName: string;
  email: string;
  eventDate: string;
};

export interface EventCreateResponse extends AxiosResponse {
  message: string;
}
