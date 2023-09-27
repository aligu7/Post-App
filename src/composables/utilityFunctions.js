const randomNum = (min, max) => {
  return Math.random() * (max - min) + min;
};

const randomArrItem = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const onlyContainsSpaces = (string) => {
  let isOnlySpaces = true;

  for (let i = 0; i < string.length; i++) {
    if (string[i] != ' ' || string) {
      isOnlySpaces = false;
      break;
    }
  }

  return isOnlySpaces;
};

const trimAndRemoveExtraLines = (string) => {
  return string.replace(/(\r\n|\r|\n){2,}/g, '$1\n').trim();
};

export {
  randomNum,
  randomArrItem,
  onlyContainsSpaces,
  trimAndRemoveExtraLines,
};
