const days = [
  {
    day: "sunday",
    num: 0,
  },
  {
    day: "monday",
    num: 1,
  },
  {
    day: "tuesday",
    num: 2,
  },
  {
    day: "wednesday",
    num: 3,
  },
  {
    day: "thursday",
    num: 4,
  },
  {
    day: "friday",
    num: 5,
  },
  {
    day: "saturday",
    num: 6,
  },
];

const alphabets = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  " ",
];

export const isObjEmpty = (request) => {
  for (let key in request) {
    if (request[key] === "" || request[key] === null || request[key] === 0)
      return false;
  }
  return true;
};

export const addDays = (date, days) => {
  return new Date(date?.getTime() + days * 86400000);
};

export const capitalize = (s) => {
  if (s) return s[0].toUpperCase() + s.slice(1);
  return s;
};

export const getDayStringWithNum = (day_num) => {
  for (let i = 0; i < days.length; i++) {
    if (days[i].num === day_num) return days[i].day;
  }
};

export const shipmentModeName = (name) => {
  if (name?.toUpperCase() === "AIR") {
    return "PLANE";
  } else if (name?.toUpperCase() === "SEA") {
    return "SHIP";
  } else {
    return name;
  }
};

export const shipmentModeNameInverse = (name) => {
  if (name?.toUpperCase() === "PLANE") {
    return "AIR";
  } else if (name?.toUpperCase() === "SHIP") {
    return "SEA";
  } else {
    return name;
  }
};

export const notNegative = (value) => {
  if (value > 0) return value;
  else return "";
};

export const onlyAlphabet = (value) => {
  let alphaString = "";
  for (let i = 0; i < value.length; i++) {
    for (let j = 0; j < alphabets.length; j++) {
      if (value[i] === alphabets[j]) alphaString += value[i];
    }
  }
  return alphaString;
};

export const getProfilePictureUrl = (name) => {
  return `${process.env.REACT_APP_BASE_URL}user/get_profile_picture/${name}`;
};

export const replaceSpaces = (value) => {
  return value.replace(/ /g, "_");
};

export const setDecimalPoints = (value, num) => {
  return parseFloat(value)?.toFixed(num)
}

export const notDecimalPoints = (value) => {
  if (value > 0) return  parseFloat(value)?.toFixed();
  else return "";
}