export const validateField = (value, regex = /.+/g) => {
  const cleanValue = value.trim();

  if (cleanValue === "") {
    return false;
  }

  if (!regex.test(value)) {
    return false;
  }

  return true;
};
