"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("axios"),t=require("../../event/Event.js");function n(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}require("../../_rollupPluginBabelHelpers-aae655da.js");var r=n(e);exports.WebJSONRequest=function(e){var n=e.id;e.schema;var a=function(e,r,a){t.getInstance().addEvent(n,e,r,a)};t.getInstance().register(n,{get:function(e){var u="";if(e.query)for(var i in u="?",e.query)u=u+i+"="+e.query[i]+"&";r.default.get(e.url+u).then((function(e){var r=e.data;200===e.status?function(e,r,a){t.getInstance().addEvent(n,e,r,a)}("got",r,e):a(""+e.status,r,e)})).catch((function(t){console.log(t),a("failure",e,t)}))}})};