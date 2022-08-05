
import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import manifest from '../../manifest.json';
import { ApplicationCommandInputType, ApplicationCommandOptionType, ApplicationCommandType, Command, registerCommands } from "enmity/api/commands";
import { sendReply} from "enmity/api/clyde";





const githubCommand: Command = {
    id: 'github-command',

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
    }],


    execute: async function(args, message)  {
       const username = args[0].value;
       const url = `https://api.github.com/users/${username}`;
       const response = await fetch(url);
       const json = await response.json();
       const { name, html_url, bio, avatar_url, public_repos, public_gists, followers, following, id} = json;

const embed = {
    type: "rich",
    color: 0x0099ff,
    title: name,
    url: html_url,
    description: bio,
    thumbnail: {
        proxy_url: avatar_url,
        url: avatar_url,
        width: 512,
        height: 512
    },
    fields: [
        {
            name: 'Public Repos',
            value: `${public_repos}`,
            inline: true,
        },
        {
            name: 'Public gists',
            value: `${public_gists}`,
            inline: true,
        },
        {
            name: 'Followers',
            value: `${followers}`,
            inline: true,
        },
        {
            name: 'Following',
            value: `${following}`,
            inline: true,
        }
    ],
    timestamp: new Date(),
    footer: {
        text: id
    }
}

sendReply(
    message?.channel.id ?? "0",
    {
      embeds: [embed],
    },
    "Github",
    "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
  );


    }


 }

 export { githubCommand }