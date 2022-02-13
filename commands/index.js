const utils = require("../utils");

const commandList = [];

function addCommand(command) {
  commandList.push(command);
}

function addCommands(commandArray) {
  commandArray.map((command) => commandList.push(command));
}

function parseCommandText(commandText) {
  const text = commandText.toLowerCase();
  const answerArray = commandList.filter((command) =>
    command.keywords.some((keyword) => text.includes(keyword))
  );
  if (answerArray?.length > 0) {
    if (answerArray[0].action) {
      answerArray[0].action();
      return utils.randomString(answerArray[0].answers);
    }
    return utils.randomString(answerArray[0].answers);
  }
  return "";
}

const commands = { parseCommandText, addCommand, addCommands };

module.exports = commands;
