import history from "history.js";

export const isObject = (obj) =>
  typeof obj === "object" && !Array.isArray(obj) && obj !== null;

export const routeUser = (route) => {
  if (typeof route !== "string") {
    // Event object or bad data, send user back to slash route
    route = "/";
  }
  history.push("/");
};
