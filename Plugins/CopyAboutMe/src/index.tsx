import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import manifest from '../manifest.json';
import { create } from 'enmity/patcher';
import { getByProps } from 'enmity/metro';
import { get } from 'enmity/api/settings';
import { React } from 'enmity/metro/common';


const Patcher = create('copy-about-me');

const CopyAboutMe: Plugin = {
   ...manifest,

   onStart() {
      
   },

   onStop() {
      Patcher.unpatchAll();
   },

};

registerPlugin(CopyAboutMe);
