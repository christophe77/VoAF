# VAF, Voice Assistant Framework

VAF is a package dedicated to text to speech and speech to text.<br />
It uses google cloud plateform services and can be ran on all OS platforms including raspberry pi.<br />
If the readme is not comprehensive enough or if you have any configuration problems feel free to open an issue.<br />

## Installation

Before adding vaf to you project you need to check if you have the right audio configuration.

For windows users, you have to install the software "sox" in version 14.4.1 or lower.<br />
It also needs to be added to windows PATH environment so it can work in command line.<br />
[sox 14.4.1](https://sourceforge.net/projects/sox/files/sox/14.4.1/)<br />

On Debian/Ubuntu, the ALSA backend is needed, so be sure to have the alsa.h header file in place :<br />

    sudo apt-get install libasound2-dev

Then you can add vaf as a dependency.

    yarn add vaf
    npm install vaf

Vaf uses google text to speech and speech to text. You need to have an account in google cloud platform, to enable both API and to generate a service licence key.<br/>
Once you have the key, put the json file at the root of your folder and add a .env file with the following entry :<br />

    GOOGLE_APPLICATION_CREDENTIALS="./google-service-key.json"

Of course you replace google-service-key.json with your own key name or you can rename your json key to google-service-key.json.<br />

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
    vaf.setConfig(config);

masterKeyword : string : word for the assistant to start listening for a command.<br />
masterAnswer : string : answer of the assistant when he hears the masterKeyword.<br />
dontUnderstand : string array : answer of the assistant when he doesn't understand (random when more than 1 string).<br />
languageCode and ssmlGender are the voice language and gender. You can find a list here :<br />
[https://cloud.google.com/text-to-speech/docs/voices](https://cloud.google.com/text-to-speech/docs/voices)<br />

Then you have to feed the assistant with some commands and actions.<br />

Single command :

    function testFunctionCommand(text) {
        console.log(text);
    }
    const singleCommand = {
        keyword: "deezer",
        action: () => {
                const deezerPath = "./deezer.exe";
                testFunctionCommand(`Deezer path is ${deezerPath}`);
        },
        answers: ["I can do that.", "Ok wait.", "Of course."],
    }
    vaf.addCommand(singleCommand);

Array of commands :

    const arrayCommands = [
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
    vaf.addCommands(arrayCommands);

Finally you start !

    vaf.startRecording();
