import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import manifest from '../manifest.json';
import { registerCommands } from "enmity/api/commands";
import { React, Toasts } from 'enmity/metro/common';
import { create } from 'enmity/patcher';
import { bulk, filters } from 'enmity/metro';
import { FormRow } from 'enmity/components';
import { getIDByName } from 'enmity/api/assets';

const [
   LazyActionSheet,
   Clipboard,
   Router
] = bulk(
   filters.byProps('openLazy', 'hideActionSheet'),
   filters.byProps('setString'),
   filters.byProps('transitionToGuild'),
)

const Patcher = create('copy-server-icon');


const CopyServerIcon: Plugin = {
   ...manifest,

   onStart() {
      const unpatcher = Patcher.before(LazyActionSheet, 'openLazy', ({ hideActionSheet }, [component, sheet]) => {
         if (!sheet.startsWith('GuildProfile')) return;

         component.then(instance => {
            Patcher.after(instance, 'default', (_, args, res) => {
               const id = args['0']?.guild?.id;
               const icon = args['0']?.guild?.icon;
               const url = `https://cdn.discordapp.com/icons/${id}/${icon}.png`;
               Clipboard.setString(url);
               Toasts.open({ content: "Copied image to clipboard", source: getIDByName('ic_message_copy') });
            });

            unpatcher();
         });
      });
   },

   onStop() {
      Patcher.unpatchAll();
   },
};

registerPlugin(CopyServerIcon);