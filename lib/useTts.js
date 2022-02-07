const textToSpeech = require("@google-cloud/text-to-speech");

const useTts = (config) => {
  const {
    languageCode, ssmlGender, naturalSampleRateHertz, name, encoding,
  } = config;

  const client = new textToSpeech.TextToSpeechClient();

  async function getAudioBuffer(text) {
    const request = {
      input: { text },
      voice: {
        languageCode,
        ssmlGender,
        naturalSampleRateHertz,
        name,
      },
      audioConfig: { audioEncoding: encoding },
    };

    const [response] = await client.synthesizeSpeech(request);
    return response.audioContent;
  }
  return { getAudioBuffer };
};

module.exports = useTts;
