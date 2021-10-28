import history from "history.js";

export const isObject = (obj) => typeof obj === "object" && !Array.isArray(obj) && obj !== null;

export const routeUser = (route) => {
  if (!route || typeof route !== "string") {
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

export function combineTwoClasses(classes, newClass) {
  const space = classes.length ? " " : "";
  return `${classes}${space}${newClass}`;
}

export const combineClasses = (...classes) => {
  return classes.reduce((acc, c) => (c ? combineTwoClasses(acc, c) : acc), "");
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

export function hexToRGB(h) {
  let r = 0,
    g = 0,
    b = 0;

  if (h.length === 4) {
    // 3 digits
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];
  } else if (h.length === 7) {
    // 6 digits
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }

  return +r + ", " + +g + ", " + +b;
}

export function getRandomItemFromArray(array, multiplicand = 10000) {
  const itemCount = array.length;
  const max = itemCount * multiplicand;
  const random = getRandomNumberBetween(0, max);
  return array[random % itemCount];
}

function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getElementWithDataAttribute(element, attribute) {
  let target = element;
  while (target && !target.dataset.hasOwnProperty(attribute)) {
    target = target.parentNode;
  }

  return target || null;
}
