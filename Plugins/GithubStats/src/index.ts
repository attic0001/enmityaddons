import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import manifest from '../manifest.json';
import { getByProps } from "enmity/metro";
import { ApplicationCommandInputType, ApplicationCommandOptionType, ApplicationCommandType, Command, registerCommands } from "enmity/api/commands";
import { sendReply} from "enmity/api/clyde";
import { Constants, Moment, React, StyleSheet, Toasts } from 'enmity/metro/common';
import { create } from 'enmity/patcher';

import { githubCommand } from './commands/githubplugin'


const GithubPlugin : Plugin = {
...manifest,


   onStart()
   
   
   {

      registerCommands("github-plugin", [githubCommand])
   },

   onStop() {
      this.commands = [];
   },



};

registerPlugin(GithubPlugin);


