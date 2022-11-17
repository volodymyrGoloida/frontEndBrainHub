export const validateEmptyFields = <T extends Record<string, string>>(
  obj: T
): T => {
  const objectErrors: Record<string, string> = {};
  for (let key in obj) {
    if (!obj[key]) {
      objectErrors[key] = "This field is empty";
    }
  }

  return objectErrors as T;
};
