import{triggers as e,events as t,StateObject as o}from"../../event/ObjectBase.js";import"../../_rollupPluginBabelHelpers-55d249d8.js";import"../../event/StateBase.js";import"../../event/Event.js";import"../../util/ObjUtil.js";import"./MemoryManager.js";var r=e,n=t,i={id:"object",$schema:"http://json-schema.org/draft-07/schema#",description:"Object collection options","x-layout":"component",type:"object",version:.1,properties:{name:{title:"Name",type:"string"}},required:["name"]},s={name:"Dictionary",type:"object",author:"Kjartan Jónsson",description:"Object dictionary",version:.1,relation:{contains:[],within:"sources"},options:i,state:o};function a(e){var t=new o(e);return t.registerComponent({},{},s),t}export{a as ObjectCollection,s as config,n as events,i as options,r as triggers};
//# sourceMappingURL=ObjectCollection.js.map
