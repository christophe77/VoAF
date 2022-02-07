require("dotenv").config();
const utils = require("./utils");
const commands = require("./commands");
const useSpeaker = require("./lib/useSpeaker");
const useTts = require("./lib/useTts");
const useStt = require("./lib/useStt");
const useError = require("./lib/useError");

const { handleError } = useError();

let config = {
  masterKeyword: "slave",
  masterAnswer: "yes master!",
  dontUnderstand: ["I don't understand."],
  sampleRateHertz: 16000,
  languageCode: "en-US",
  ssmlGender: "NEUTRAL",
  encoding: "LINEAR16",
};

function setConfig(newConfig) {
  config = { ...config, newConfig };
}

const { playAudioBuffer } = useSpeaker(config);
const { getAudioBuffer } = useTts(config);
const { parseCommandText, addCommand, addCommands } = commands;

const status = {
  canParse: false,
};

async function commandCallback(command) {
  const { masterKeyword, masterAnswer, dontUnderstand } = config;
  if (command.toLowerCase().includes(masterKeyword)) {
    try {
      const audioBuffer = await getAudioBuffer(masterAnswer);
      playAudioBuffer(audioBuffer);
      setTimeout(() => {
        status.canParse = true;
      }, 4000);
    } catch (error) {
      handleError(error);
    }
  } else if (status.canParse) {
    const answer = parseCommandText(command);
    const randomDontUnderstand = utils.randomString(dontUnderstand);
    const answerText = answer !== "" ? answer : randomDontUnderstand;
    status.canParse = false;
    try {
      const audioBuffer = await getAudioBuffer(answerText);
      playAudioBuffer(audioBuffer);
    } catch (error) {
      handleError(error);
    }
  }
}

const { startRecording } = useStt(config, commandCallback);

const vaf = {
  setConfig,
  startRecording,
  addCommand,
  addCommands,
};
module.exports = vaf;
