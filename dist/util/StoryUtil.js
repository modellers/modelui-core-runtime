"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("../_rollupPluginBabelHelpers-aae655da.js");function e(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var r=e(require("react")),o={name:"StoryUtil",type:"storyutil",author:"Kjartan Jónsson",description:"StoryUtil component",version:.1,relation:{contains:[]},contains:{},options:{}},n=function(t,e,r){if(!r)throw Error("registerStorWatchList is missing action handler");t.register(e,{print:{schema:{},handler:function(t){console.info(t),r(t.event)(t)}}},{},o)},i=function(t,e,r,o,i){var a=[],c=r+"_handler_id";if(!i)throw Error("createWatchList is missing action handler");o.forEach((function(t){a.push({component:{id:r,event:t},trigger:{id:c,action:"print"},transform:function(e){return{event:t,data:e}}})})),t.watch(a),n(t,c,i)},a=function(t,e,o,n){var i=o;return n=n||{},r.default.createElement("div",null,Object.keys(i).map((function(o,a){var c={title:o+"_value",id:o+"_value"};return n[o]&&(c=n[o]),r.default.createElement("button",{key:o+"_key_"+i[o].name,title:i[o].info.description,onClick:function(){"function"==typeof c?t.addAction(e,o,c()):t.addAction(e,o,c)}},i[o].info.name)})))},c=function(t,e,r,o,n,c,l){l=l||{};var s=t,p=t.getStateManager();if(o.manager=s,"function"!=typeof e)throw Error("prepStoryComponent is missing action handler");if("function"!=typeof r)throw Error("prepStoryComponent is missing registerComponents");return r(s),p.clearAll(),p.createLayoutState([o]),i(t.getEventManager(),o.id,o.id,Object.keys(c),e),a(t.getEventManager(),o.id,n,l.triggers)},l=function(t){var e={};return Object.keys(t.properties).forEach((function(r,o){var n=t.properties[r];e[r]={name:n.title||r,defaultValue:n.default,table:{type:{summary:n.description}}},"boolean"===n.type&&(e[r].control={type:"boolean"}),"number"!==n.type&&"integer"!==n.type&&"float"!==n.type||(e[r].control={type:"number"},void 0!==n.minimum&&(e[r].control={type:"range",min:n.minimum,max:n.maximum})),"string"===n.type&&(e[r].control={type:"string"}),n.enum&&(e[r].control={type:"select",options:n.enum},n.enum.length<3&&(e[r].control.type="inline-radio")),"color"===n.format&&(e[r].control={type:"color"}),"object"===n.type&&(e[r].control={type:"object"}),"array"===n.type&&(e[r].control={type:"array"})})),e},s=function(t){var e={};return Object.keys(t.properties).forEach((function(r,o){var n=t.properties[r];n.default&&(e[r]=n.default)})),e},p=function(e){var r={},o=t._objectSpread2(t._objectSpread2({},{label:{control:"text"},labelPlacement:{control:{type:"select",options:["bottom","end","start","top"]}},color:{control:{type:"select",options:["initial","inherit","primary","secondary","textPrimary","textSecondary","error"]}},indicatorColor:{control:{type:"select",options:["initial","inherit","primary","secondary","textPrimary","textSecondary","error"]}},textColor:{control:{type:"select",options:["initial","inherit","primary","secondary","textPrimary","textSecondary","error"]}},buttonVariant:{control:{type:"select",options:["contained","outlined","text","fab"]}},tabVariant:{control:{type:"select",options:["inherit","fullWidth","scrollable"]}},contentMargin:{control:{type:"number"}},variant:{control:{type:"select",options:["filled","outlined","standard"]}},size:{control:{type:"select",options:["small","large","medium"]}},shape:{control:{type:"select",options:["circular","rounded","square"]}},max_count:{control:{type:"number"}},spacing:{control:{type:"number"}},direction:{control:{type:"select",options:["row","row-reverse","column","column-reverse"]}},justify:{control:{type:"select",options:["flex-start","center","flex-end","space-between","space-around","space-evenly"]}},alignItems:{control:{type:"select",options:["flex-start","center","flex-end","stretch","baseline"]}},gridXS:{control:{type:"select",options:[1,2,3,4,5,6,7,8,9,10,11,12]}},gridSM:{control:{type:"select",options:[1,2,3,4,5,6,7,8,9,10,11,12]}},modalType:{control:{type:"select",options:["alert","dialog","modal"]}}}),e.options);return Object.keys(e.options).forEach((function(t,e){var n=o[t];r[t]=n})),r},u={createLayoutViewArgumentTypes:p,createStoryArgumentDefaultsFromSchema:s,createStoryArgumentTypesFromSchema:l,prepStoryComponent:c,createEventTriggers:a,createWatchList:i,registerStoryWatchList:n};exports.createEventTriggers=a,exports.createLayoutViewArgumentTypes=p,exports.createStoryArgumentDefaultsFromSchema=s,exports.createStoryArgumentTypesFromSchema=l,exports.createWatchList=i,exports.default=u,exports.prepStoryComponent=c,exports.registerStoryWatchList=n;
