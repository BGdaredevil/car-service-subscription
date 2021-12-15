//! export the base url to the .env

const baseUrl = "http://localhost:3030";

export const endpoints = {
  userApi: `${baseUrl}/user`,
  carApi: `${baseUrl}/car`,
  shopApi: `${baseUrl}/shop`,
  serviceApi: `${baseUrl}/service`,
  bookingApi: `${baseUrl}/booking`,
};
