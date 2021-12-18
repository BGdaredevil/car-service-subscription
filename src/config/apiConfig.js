const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3030";

export const endpoints = {
  userApi: `${baseUrl}/user`,
  carApi: `${baseUrl}/car`,
  shopApi: `${baseUrl}/shop`,
  serviceApi: `${baseUrl}/service`,
  bookingApi: `${baseUrl}/booking`,
};
