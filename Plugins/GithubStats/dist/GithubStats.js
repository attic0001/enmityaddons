function $(e){window.enmity.plugins.registerPlugin(e)}var k="GithubStats",I="1.0.0",P="Fetches github statistics",U=[{name:"Attic",id:"315852258854174720"},{name:"fiore",id:"396496265430695947"}],N={name:k,version:I,description:P,authors:U},F;(function(e){e[e.BuiltIn=0]="BuiltIn",e[e.Guild=1]="Guild",e[e.DM=2]="DM"})(F||(F={}));var v;(function(e){e[e.Chat=1]="Chat",e[e.User=2]="User",e[e.Message=3]="Message"})(v||(v={}));var S;(function(e){e[e.BuiltIn=0]="BuiltIn",e[e.BuiltInText=1]="BuiltInText",e[e.BuiltInIntegration=2]="BuiltInIntegration",e[e.Bot=3]="Bot",e[e.Placeholder=4]="Placeholder"})(S||(S={}));var B;(function(e){e[e.Role=1]="Role",e[e.User=2]="User"})(B||(B={}));var b;(function(e){e[e.SubCommand=1]="SubCommand",e[e.SubCommandGroup=2]="SubCommandGroup",e[e.String=3]="String",e[e.Integer=4]="Integer",e[e.Boolean=5]="Boolean",e[e.User=6]="User",e[e.Channel=7]="Channel",e[e.Role=8]="Role",e[e.Mentionnable=9]="Mentionnable",e[e.Number=10]="Number",e[e.Attachment=11]="Attachment"})(b||(b={}));var R;(function(e){e[e.ApplicationCommand=2]="ApplicationCommand",e[e.MessageComponent=3]="MessageComponent"})(R||(R={}));function V(e,o){window.enmity.commands.registerCommands(e,o)}window.enmity.modules.common.Constants,window.enmity.modules.common.Clipboard,window.enmity.modules.common.Assets,window.enmity.modules.common.Messages,window.enmity.modules.common.Clyde,window.enmity.modules.common.Avatars,window.enmity.modules.common.Native;const x=window.enmity.modules.common.React;window.enmity.modules.common.Dispatcher,window.enmity.modules.common.Storage,window.enmity.modules.common.Toasts,window.enmity.modules.common.Dialog,window.enmity.modules.common.Token,window.enmity.modules.common.REST,window.enmity.modules.common.Settings,window.enmity.modules.common.Users,window.enmity.modules.common.Navigation,window.enmity.modules.common.NavigationNative,window.enmity.modules.common.NavigationStack,window.enmity.modules.common.Theme,window.enmity.modules.common.Linking,window.enmity.modules.common.StyleSheet,window.enmity.modules.common.ColorMap,window.enmity.modules.common.Components,window.enmity.modules.common.Locale,window.enmity.modules.common.Profiles,window.enmity.modules.common.Lodash,window.enmity.modules.common.Logger,window.enmity.modules.common.Flux,window.enmity.modules.common.SVG,window.enmity.modules.common.Scenes,window.enmity.modules.common.Moment;function H(e){return window.enmity.patcher.create(e)}function _(...e){return window.enmity.modules.getByProps(...e)}window.enmity.modules.common;const{components:t}=window.enmity;t.Alert,t.Button,t.FlatList,t.Image,t.ImageBackground,t.KeyboardAvoidingView,t.Modal,t.Pressable,t.RefreshControl,t.ScrollView,t.SectionList,t.StatusBar,t.StyleSheet,t.Switch,t.Text,t.TextInput,t.TouchableHighlight,t.TouchableOpacity,t.TouchableWithoutFeedback,t.Touchable,t.View,t.VirtualizedList,t.Form,t.FormArrow,t.FormCTA,t.FormCTAButton,t.FormCardSection,t.FormCheckbox,t.FormDivider,t.FormHint,t.FormIcon,t.FormInput,t.FormLabel,t.FormRadio;const M=t.FormRow;t.FormSection,t.FormSelect,t.FormSubLabel,t.FormSwitch,t.FormTernaryCheckBox,t.FormText,t.FormTextColors,t.FormTextSizes;function f(e,o,n,i){window.enmity.clyde.sendReply(e,o,n,i)}async function G(e){const o=`https://api.github.com/users/${e}`,n=await(await fetch(o)).json();if(n!=null&&n.message)return{title:"Error :(",description:n.message,color:16711680};const{name:i,html_url:r,bio:m,avatar_url:s,public_repos:u,public_gists:d,followers:h,following:l,id:c,created_at:a}=n;var w=new Date(a).getTime()/1e3;return{type:"rich",color:39423,title:i,url:r,description:m,thumbnail:{proxy_url:s,url:s,width:512,height:512},fields:[{name:"Created At",value:`<t:${w}:f>`,inline:!0},{name:"Public Repos",value:`${u}`,inline:!0},{name:"Public gists",value:`${d}`,inline:!0},{name:"Followers",value:`${h}`,inline:!0},{name:"Following",value:`${l}`,inline:!0}],timestamp:new Date,footer:{text:c}}}async function L(e,o){const n=`https://api.github.com/repos/${e}/${o}`,i=await(await fetch(n)).json();if(i!=null&&i.message)return{title:"Error :(",description:i.message,color:16711680};const{name:r,html_url:m,description:s,owner:u,created_at:d,updated_at:h,language:l,topics:c,subscribers_count:a,id:w}=i;var g=new Date(d).getTime()/1e3,D=new Date(h).getTime()/1e3;return{type:"rich",color:39423,title:r,url:m,description:s,thumbnail:{proxy_url:u.avatar_url,url:u.avatar_url,width:512,height:512},fields:[{name:"Created At",value:`<t:${g}:f>`,inline:!0},{name:"Updated At",value:`<t:${D}:f>`,inline:!0},{name:"Language",value:`${l}`,inline:!0},{name:"Topics",value:`${c.length>0?c.join(", "):"None"}`,inline:!0},{name:"Subscribers",value:`${a}`,inline:!0}],timestamp:new Date,footer:{text:w}}}const z={id:"github-profile-command",name:"github",displayName:"github",description:"View github statistics",displayDescription:"View github statistics",type:v.Chat,inputType:S.BuiltInText,options:[{name:"Username",displayName:"Username",description:"The username of the github user",displayDescription:"The username of the github user",type:b.String,required:!0},{name:"Repo",displayName:"Repo",description:"The name of the github repo",displayDescription:"The name of the github repo",type:b.String,required:!1}],execute:async function(e,o){var n,i;const r=e[0].value;var m="";e.length>1&&(m=e[1].value);let s=await G(r);m==""?f((n=o==null?void 0:o.channel.id)!=null?n:"0",{embeds:[s]},"Github","https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"):(s=await L(r,m),f((i=o==null?void 0:o.channel.id)!=null?i:"0",{embeds:[s]},"Github","https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"))}},E=_("openLazy","hideActionSheet"),j=_("getLastSelectedChannelId"),y=H("github-view-stats"),q={...N,onStart(){V("github-plugin",[z]);const e=y.before(E,"openLazy",({hideActionSheet:o},[n,i])=>{i==="LongPressUrl"&&n.then(r=>{y.after(r,"default",(m,s,u)=>{const d=u.props.children[1].props.children,h=u.props.children[0].props.title,l=j.getChannelId(),c=/^https?:\/\/(www\.)?github.com\/([\w.-]+)\/?(([\w.-]+)?)/.exec(h);if(!c)return;const[,,a,w]=c;w&&a&&d.unshift(x.createElement(M,{label:"View Repo Stats",onPress:()=>{L(a,w).then(g=>{f(l!=null?l:"0",{embeds:[g]},"Github","https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png")}),o()}})),a&&d.unshift(x.createElement(M,{label:"View Profile Stats",onPress:()=>{G(a).then(g=>{f(l!=null?l:"0",{embeds:[g]},"Github","https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png")}),o()}})),u.props.children[1].props.children=d}),e()})})},onStop(){this.commands=[],y.unpatchAll()}};$(q);
