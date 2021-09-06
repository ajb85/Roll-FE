import history from "history.js";

export const isObject = (obj) => typeof obj === "object" && !Array.isArray(obj) && obj !== null;

export const routeUser = (route) => {
  if (typeof route !== "string") {
    // Event object or bad data, send user back to slash route
    route = "/";
  }
  history.push("/");
};

export const goHome = () => {
  history.push("/");
};

export const noFunc = () => {};

export const noProp = (e) => e.stopPropagation();

export const combineClasses = (...classes) => {
  return classes.reduce((acc, c) => (c ? `${acc}${acc.length ? " " : ""}${c}` : acc), "");
};

export function mergeObjects(obj1, obj2) {
  if (isObject(obj1) && isObject(obj2)) {
    const merged = {};
    const accessedKeys = {};
    for (let key in obj1) {
      accessedKeys[key] = true;
      const d1 = obj1[key];
      const d2 = obj2[key];

      if (!d2) {
        merged[key] = d1;
      } else {
        merged[key] = mergeObjects(d1, d2);
      }
    }

    for (let key in obj2) {
      if (!accessedKeys[key]) {
        merged[key] = obj2[key];
      }
    }

    return merged;
  }

  return obj2;
}

export function valueExists(v) {
  return !!v;
}

export function hexToRGBA(h, a) {
  let r = 0,
    g = 0,
    b = 0;

  // 3 digits
  if (h.length === 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];

    // 6 digits
  } else if (h.length === 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }

  return "rgb(" + +r + "," + +g + "," + +b + ", " + a + ")";
}
