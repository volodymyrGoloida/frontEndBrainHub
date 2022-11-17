import React, { useState } from "react";
import { createEventDate } from "../../cms/cms";
import { EventCreateRequest } from "../../cms/types";
import { validateEmptyFields } from "../../utils/checkEmptiesFields";
import { isValidEmail, isValidEmailLength } from "../../utils/validateEmail";
import { CustomInput, Button } from "../UIComponents";
import scss from "./EventCreator.module.scss";

const EventCreator: React.FC = () => {
  const [eventCreate, setEventCreate] = useState<EventCreateRequest>({
    firstName: "",
    lastName: "",
    email: "",
    eventDate: "",
  });
  const [eventCreateErrors, setEventCreateErrors] =
    useState<EventCreateRequest>({
      firstName: "",
      lastName: "",
      email: "",
      eventDate: "",
    });

  const handleEventCreate = (name: string, value: string) => {
    setEventCreateErrors((prevValue) => ({
      ...prevValue,
      [name]: "",
    }));
    setEventCreate((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleCreateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const eventDataEmptyFields =
      validateEmptyFields<EventCreateRequest>(eventCreate);
    if (Object.keys(eventDataEmptyFields).length > 0) {
      setEventCreateErrors(eventDataEmptyFields);
      return;
    }

    if (!isValidEmailLength(eventCreate.email)) {
      setEventCreateErrors((prevValue) => ({
        ...prevValue,
        email: "Length for email can be at least 3 elements.",
      }));
      return;
    }

    if (!isValidEmail(eventCreate.email)) {
      setEventCreateErrors((prevValue) => ({
        ...prevValue,
        email: "Your email isn't correct, please check it.",
      }));
      return;
    }

    const statusCode = await createEventDate({
      ...eventCreate,
      eventDate: new Date(eventCreate.eventDate).getTime().toString(),
    });

    if (statusCode && statusCode === 200) {
      alert("Your event was created");
    }
    setEventCreate({
      firstName: "",
      lastName: "",
      email: "",
      eventDate: "",
    });
  };

  return (
    <div className={scss.formWrapper}>
      <form onSubmit={handleCreateEvent}>
        <h1>Create your own event!</h1>
        <div className={scss.inputWrapper}>
          <CustomInput
            onChange={handleEventCreate}
            error={eventCreateErrors.firstName}
            name="firstName"
            value={eventCreate.firstName}
            type="text"
            placeholder="please enter your first name"
          />
        </div>
        <div className={scss.inputWrapper}>
          <CustomInput
            onChange={handleEventCreate}
            error={eventCreateErrors.lastName}
            name="lastName"
            value={eventCreate.lastName}
            type="text"
            placeholder="please enter your last name"
          />
        </div>
        <div className={scss.inputWrapper}>
          <CustomInput
            onChange={handleEventCreate}
            name="email"
            value={eventCreate.email}
            error={eventCreateErrors.email}
            type="text"
            placeholder="please enter your email"
          />
        </div>
        <div className={scss.inputWrapper}>
          <CustomInput
            value={eventCreate.eventDate}
            onChange={handleEventCreate}
            error={eventCreateErrors.eventDate}
            name="eventDate"
            type="datetime-local"
          />
        </div>
        <div className={scss.buttonWrapper}>
          <Button>Create</Button>
        </div>
      </form>
    </div>
  );
};
export default EventCreator;
