"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../_rollupPluginBabelHelpers-aae655da.js");function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var r=t(require("react")),o={name:"StoryUtil",type:"storyutil",author:"Kjartan Jónsson",description:"StoryUtil component",version:.1,relation:{contains:[]},contains:{},options:{}},n=function(e,t,r){if(!r)throw Error("registerStorWatchList is missing action handler");e.register(t,{print:{schema:{},handler:function(e){console.info(e),r(e.event)(e)}}},{},o)},i=function(e,t,r,o,i){var a=[],c=r+"_handler_id";if(!i)throw Error("createWatchList is missing action handler");o.forEach((function(e){a.push({component:{id:r,event:e},trigger:{id:c,action:"print"},transform:function(t){return{event:e,data:t}}})})),e.watch(a),n(e,c,i)},a=function(e,t,o,n){var i=o;return n=n||{},r.default.createElement("div",null,r.default.createElement("hr",null),Object.keys(i).map((function(o,a){var c={title:o+"_value",id:o+"_value"};return n[o]&&(c=n[o]),r.default.createElement("button",{key:o+"_key_"+i[o].name,title:i[o].info.description,onClick:function(){"function"==typeof c?e.addAction(t,o,c()):e.addAction(t,o,c)}},i[o].info.name)})),r.default.createElement("hr",null))},c=function(e,t,r,o,n,c,l){l=l||{};var s=e,p=e.getStateManager();if(o.manager=s,"function"!=typeof t)throw Error("prepStoryComponent is missing action handler");if("function"!=typeof r)throw Error("prepStoryComponent is missing registerComponents");return r(s),p.clearAll(),p.createLayoutState([o]),i(e.getEventManager(),o.id,o.id,Object.keys(c),t),a(e.getEventManager(),o.id,n,l.triggers)},l=function(e){var t={};return Object.keys(e.properties).forEach((function(r,o){var n=e.properties[r];t[r]={name:n.title||r,defaultValue:n.default,table:{type:{summary:n.description}}},"boolean"===n.type&&(t[r].control={type:"boolean"}),"number"!==n.type&&"integer"!==n.type&&"float"!==n.type||(t[r].control={type:"number"},void 0!==n.minimum&&(t[r].control={type:"range",min:n.minimum,max:n.maximum})),"string"===n.type&&(t[r].control={type:"string"}),n.enum&&(t[r].control={type:"select",options:n.enum},n.enum.length<3&&(t[r].control.type="inline-radio")),"color"===n.format&&(t[r].control={type:"color"}),"object"===n.type&&(t[r].control={type:"object"}),"array"===n.type&&(t[r].control={type:"array"})})),t},s=function(e){var t={};return Object.keys(e.properties).forEach((function(r,o){var n=e.properties[r];n.default&&(t[r]=n.default)})),t},p=function(t){var r={},o=e._objectSpread2(e._objectSpread2({},{label:{control:"text"},labelPlacement:{control:{type:"select",options:["bottom","end","start","top"]}},color:{control:{type:"select",options:["initial","inherit","primary","secondary","textPrimary","textSecondary","error"]}},indicatorColor:{control:{type:"select",options:["initial","inherit","primary","secondary","textPrimary","textSecondary","error"]}},textColor:{control:{type:"select",options:["initial","inherit","primary","secondary","textPrimary","textSecondary","error"]}},buttonVariant:{control:{type:"select",options:["contained","outlined","text","fab"]}},tabVariant:{control:{type:"select",options:["inherit","fullWidth","scrollable"]}},contentMargin:{control:{type:"number"}},variant:{control:{type:"select",options:["filled","outlined","standard"]}},size:{control:{type:"select",options:["small","large","medium"]}},shape:{control:{type:"select",options:["circular","rounded","square"]}},max_count:{control:{type:"number"}},spacing:{control:{type:"number"}},direction:{control:{type:"select",options:["row","row-reverse","column","column-reverse"]}},justify:{control:{type:"select",options:["flex-start","center","flex-end","space-between","space-around","space-evenly"]}},alignItems:{control:{type:"select",options:["flex-start","center","flex-end","stretch","baseline"]}},gridXS:{control:{type:"select",options:[1,2,3,4,5,6,7,8,9,10,11,12]}},gridSM:{control:{type:"select",options:[1,2,3,4,5,6,7,8,9,10,11,12]}},modalType:{control:{type:"select",options:["alert","dialog","modal"]}}}),t.options);return Object.keys(t.options).forEach((function(e,t){var n=o[e];r[e]=n})),r},u={createLayoutViewArgumentTypes:p,createStoryArgumentDefaultsFromSchema:s,createStoryArgumentTypesFromSchema:l,prepStoryComponent:c,createEventTriggers:a,createWatchList:i,registerStoryWatchList:n};exports.createEventTriggers=a,exports.createLayoutViewArgumentTypes=p,exports.createStoryArgumentDefaultsFromSchema=s,exports.createStoryArgumentTypesFromSchema=l,exports.createWatchList=i,exports.default=u,exports.prepStoryComponent=c,exports.registerStoryWatchList=n;
//# sourceMappingURL=StoryUtil.js.map