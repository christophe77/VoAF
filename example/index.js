const vaf = require("..");

const config = {
  masterKeyword: "slave",
  masterAnswer: "yes master!",
  dontUnderstand: ["I don't understand.", "Can you repeat?"],
  languageCode: "en-US",
  ssmlGender: "NEUTRAL",
};

function testFunctionCommand(text) {
  console.log(text);
}

const commandList = [
  {
    keyword: "spotify",
    answers: ["I can do that.", "Ok wait.", "Of course."],
  },
  {
    keyword: "netflix",
    action: () => {
      const four = 2 * 2;
      testFunctionCommand(`hi from netflix. 2 x 2 = ${four}`);
    },
    answers: ["I can do that.", "Ok wait.", "Of course."],
  },
];

vaf.setConfig(config);
vaf.addCommands(commandList);
vaf.startRecording();
