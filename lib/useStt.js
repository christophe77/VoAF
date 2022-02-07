const recorder = require("node-record-lpcm16");
const speech = require("@google-cloud/speech");
const useError = require("./useError");

const { handleError } = useError();

const useStt = (config, commandCallback) => {
  const { sampleRateHertz } = config;
  const client = new speech.SpeechClient();
  const request = {
    config,
    interimResults: false,
  };
  const recognizeStream = client
    .streamingRecognize(request)
    .on("error", (error) => handleError(error))
    .on("data", (data) => {
      if (data.results[0]?.alternatives[0]) {
        commandCallback(data.results[0].alternatives[0].transcript);
      }
    });

  function startRecording() {
    recorder
      .record({
        sampleRateHertz,
        threshold: 0, // silence threshold
        recordProgram: "rec", // Try also "arecord" or "sox"
        silence: "3.0", // seconds of silence before ending
      })
      .stream()
      .on("error", (error) => handleError(error))
      .pipe(recognizeStream);
  }

  return { startRecording };
};

module.exports = useStt;
