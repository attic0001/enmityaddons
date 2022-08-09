import { ApplicationCommandInputType, ApplicationCommandOptionType, ApplicationCommandType, Command } from "enmity/api/commands";
import { sendReply } from "enmity/api/clyde";
import { getUserInfo, getRepoInfo } from "../utils";

const githubProfileCommand: Command = {
    id: 'github-profile-command',

    name: 'github',
    displayName: 'github',
    description: 'View github statistics',
    displayDescription: 'View github statistics',

    type: ApplicationCommandType.Chat,
    inputType: ApplicationCommandInputType.BuiltInText,

    options: [{
        name: "Username",
        displayName: "Username",

        description: "The username of the github user",
        displayDescription: "The username of the github user",

        type: ApplicationCommandOptionType.String,
        required: true,
    }, {
        name: "Repo",
        displayName: "Repo",
        
        description: "The name of the github repo",
        displayDescription: "The name of the github repo",

        type: ApplicationCommandOptionType.String,
        required: false,
    }],

    execute: async function (args, message) {
        const username = args[0].value;
        var repo = "";
        if(args.length > 1) repo = args[1].value;

        let embed = await getUserInfo(username);
        
        if (repo == "") {
            sendReply(message?.channel.id ?? "0", { embeds: [embed] }, 
                "Github",
                "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
            );
        } else {
            embed = await getRepoInfo(username, repo);
            sendReply(message?.channel.id ?? "0", { embeds: [embed] }, 
                "Github",
                "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
            );
        }
        
    }
}

export { githubProfileCommand };