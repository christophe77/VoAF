const voaf = require("..");

const config = {
  masterKeyword: "slave",
  masterAnswer: "yes master!",
  dontUnderstand: ["I don't understand.", "Can you repeat?"],
  languageCode: "en-US",
  ssmlGender: "NEUTRAL",
};

const singleCommand = {
  keywords: ["deezer"],
  action: () => {
    const deezerPath = "./deezer.exe";
    console.log(`Deezer path is ${deezerPath}`);
  },
  answers: ["All right.", "Ok wait.", "Yes!"],
};
voaf.addCommand(singleCommand);

const arrayCommands = [
  {
    keywords: ["spotify"],
    answers: ["I can do that.", "Ok wait.", "Of course."],
  },
  {
    keywords: ["netflix", "netfleex"],
    action: () => {
      const four = 2 * 2;
      console.log(`hi from netflix. 2 x 2 = ${four}`);
    },
    answers: ["I can do that.", "Ok wait.", "Of course."],
  },
];
voaf.addCommands(arrayCommands);

voaf.setConfig(config);
voaf.addCommands(arrayCommands);
voaf.startRecording();
