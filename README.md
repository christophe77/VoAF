# VoAF, Voice Assistant Framework

VoAF is a package dedicated to text to speech and speech to text.<br />
It uses google cloud plateform services and can be ran on all OS platforms including raspberry pi.<br />
If the readme is not comprehensive enough or if you have any configuration problems feel free to open an issue.<br />

## Installation

Before adding VoAF to you project you need to check if you have the right audio configuration.

### sox

The first thing to install is "sox" in version 14.4.1 or lower.<br />
Sox is used for recording audio.<br />

#### For Mac OS

    brew install sox

#### For linux

    sudo apt-get install sox libsox-fmt-all

#### For windows

[sox 14.4.1 for windows](https://sourceforge.net/projects/sox/files/sox/14.4.1/)<br />
It also needs to be added to your PATH environment.<br />

### ALSA

For linux OS, the ALSA backend is needed for playing audio, so be sure to have the alsa.h header file in place :<br />

    sudo apt-get install libasound2-dev

### Google Cloud Platform

VoAF uses google text to speech and speech to text. You need to have an account in google cloud platform, to enable both API and to generate a service licence key.<br/>
Once you have the key, put the json file at the root of your folder and add a .env file with the following entry :<br />

    GOOGLE_APPLICATION_CREDENTIALS="./google-service-key.json"

Of course you replace google-service-key.json with your own key name or you can rename your json key to google-service-key.json.<br />

### Package

Then you can add VoAF as a dependency.

    yarn add voaf
    npm install voaf

## Usage

The first thing to do is to create a config object.<br />
If you don't then the default config will be : <br />

    const config = {
        masterKeyword: "slave",
        masterAnswer: "yes master!",
        dontUnderstand: ["I don't understand.", "Can you repeat?"],
        languageCode: "en-US",
        ssmlGender: "NEUTRAL",
    };
    voaf.setConfig(config);

masterKeyword : string : word for the assistant to start listening for a command.<br />
masterAnswer : string : answer of the assistant when he hears the masterKeyword.<br />
dontUnderstand : string array : answer of the assistant when he doesn't understand (random when more than 1 string).<br />
languageCode and ssmlGender are the voice language and gender. You can find a list here :<br />
[https://cloud.google.com/text-to-speech/docs/voices](https://cloud.google.com/text-to-speech/docs/voices)<br />

Then you have to feed the assistant with some commands and actions.<br />
The command object is like this :

        {
            keywords: required string array,
            action: optional function,
            answers: required string array,
        }

Single command :

    const singleCommand = {
        keywords: ["deezer"],
        action: () => {
                const deezerPath = "./deezer.exe";
                console.log(`Deezer path is ${deezerPath}`);
        },
        answers: ["I can do that.", "Ok wait.", "Of course."],
    }
    voaf.addCommand(singleCommand);

Array of commands :

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

Finally you start !

    voaf.startRecording();
