"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./ObjectCollection.js"),r=require("./XMLParser.js");require("../../event/ObjectBase.js"),require("../../_rollupPluginBabelHelpers-aae655da.js"),require("../../event/StateBase.js"),require("../../event/Event.js"),require("../../util/ObjUtil.js"),require("./MemoryManager.js"),exports.registerObjectCollection=function(r){r.registerComponent({component:e.ObjectCollection,type:e.config.type,events:e.events,triggers:e.triggers,config:e.config})},exports.registerXML=function(e){e.registerComponent({component:r.XMLParser,type:r.config.type,events:r.events,triggers:r.triggers,config:r.config})};
