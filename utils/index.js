const randomString = (stringArray) =>
  stringArray[Math.floor(Math.random() * stringArray.length)];

const utils = {
  randomString
};
module.exports = utils;
