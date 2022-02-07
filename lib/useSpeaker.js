const stream = require("stream");
const Speaker = require("speaker");

const useSpeaker = (config) => {
  function playAudioBuffer(audioBuffer) {
    const speaker = new Speaker({
      channels: 1,
      sampleRate: config.sampleRateHertz,
    });
    const bufferStream = new stream.PassThrough();
    bufferStream.end(audioBuffer);
    bufferStream.pipe(speaker);
  }

  return { playAudioBuffer };
};

module.exports = useSpeaker;
