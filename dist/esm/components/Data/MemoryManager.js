import{d as e,b as n,c as t}from"../../_rollupPluginBabelHelpers-55d249d8.js";var i=function(){function i(){t(this,i),e(this,"_memories",{})}return n(i,[{key:"clearAll",value:function(){this._memories={}}},{key:"registerMemory",value:function(e,n){this._memories[e]=n}},{key:"getMemory",value:function(e){return this._memories[e]}}],[{key:"getInstance",value:function(){return null===i._instance&&(i._instance=new i),this._instance}}]),i}();e(i,"_instance",null);try{window.memoryManager=i.getInstance()}catch(e){}export{i as MemoryManager};
//# sourceMappingURL=MemoryManager.js.map