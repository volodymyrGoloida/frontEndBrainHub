import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import {
  EventCreateRequest,
  ErrorMessages,
  EventCreateResponse,
} from "./types";

const cmsApiInstance = axios.create({
  baseURL: API_BASE_URL,
});

const postCmsData = cmsApiInstance.post;

export const createEventDate = async (data: EventCreateRequest) => {
  try {
    const { status } = await postCmsData<
      EventCreateRequest,
      EventCreateResponse
    >("events/create", data);

    return status;
  } catch (error) {
    //also we can manage our validation from backend too.
    if (axios.isAxiosError<ErrorMessages<keyof EventCreateRequest>>(error)) {
      const { status } = error;
      return status;
    }
  }
};
