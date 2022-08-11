import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import manifest from '../manifest.json';
import { create } from 'enmity/patcher';
import { getByProps } from 'enmity/metro';
import Settings from './settings';
import { get } from 'enmity/api/settings';
import { React } from 'enmity/metro/common';

const updateGuildNotificationSettings = getByProps('updateGuildNotificationSettings').updateGuildNotificationSettings;
const FluxDispatcher = getByProps(
   "_currentDispatchActionType",
   "_subscriptions",
   "_waitQueue"
);
const Patcher = create('mute-new-guild');

const MuteNewGuilds: Plugin = {
   ...manifest,

   onStart() {
      Patcher.after(FluxDispatcher, 'dispatch', (_, args, res) => {
         if (args[0].type !== "INVITE_ACCEPT_SUCCESS") return res;

         const guildID = args[0]?.invite?.guild?.id;
         updateGuildNotificationSettings(guildID, {
            muted: get('MuteNewGuilds', 'muted', true),
            suppress_everyone: get('MuteNewGuilds', 'suppress_everyone', false),
            suppress_roles: get('MuteNewGuilds', 'suppress_roles', false),
            mobile_push: get('MuteNewGuilds', 'mobile_push', true)
         });

         return res;
      });
   },

   onStop() {
      Patcher.unpatchAll();
   },

   getSettingsPanel({ settings }) {
      return <Settings settings={settings} />;
   }
};

registerPlugin(MuteNewGuilds);