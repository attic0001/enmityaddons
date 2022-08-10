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
   Members,
   Channels,
   getLastSelectedGuildId,
   getLastSelectedChannelId,
   Clipboard,
   Profile
] = bulk(
   filters.byProps('openLazy', 'hideActionSheet'),
   filters.byProps('getMember'),
   filters.byProps('getChannel'),
   filters.byProps('getLastSelectedGuildId'),
   filters.byProps('getLastSelectedChannelId'),
   filters.byProps('setString'),
   filters.byProps('showPlatformUserProfile')
)

const Patcher = create('copy-role-colors');


const CopyRoleColors: Plugin = {
   ...manifest,

   onStart() {
      const unpatcher = Patcher.before(LazyActionSheet, 'openLazy', ({ hideActionSheet }, [component, sheet]) => {
         if (sheet !== 'UserProfileOverflow') return;

         component.then(instance => {
            Patcher.after(instance, 'default', (_, args, res) => {
               const children = res.props.children[1].props.children;
               const userID = res.props.children[0].props.leading.props.source.uri.split('/')[4];

               const guildID = getLastSelectedGuildId.getLastSelectedGuildId();
               const channelID = getLastSelectedChannelId.getChannelId();
               const isGuild = Channels.getChannel(channelID)?.guild_id;

               if (!isGuild) return;

               const member = Members.getMember(guildID, userID);
               const hexColor = member.colorString === undefined ? "#ffffff" : member.colorString;

               children.push(
                  <FormRow label="Copy Role Color" onPress={() => {
                     Clipboard.setString(hexColor);
                     Toasts.open({ content: 'Copied to clipboard', source: getIDByName('ic_message_copy') });
                     hideActionSheet();
                     Profile.showPlatformUserProfile({ userId: userID, channelID: channelID });
                  }} />
               );

               res.props.children[1].props.children = children;
            });

            unpatcher();
         });
      });
   },

   onStop() {
      Patcher.unpatchAll();
   },
};

registerPlugin(CopyRoleColors);