"use strict";function t(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var r=t(require("crypto")),n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},e={exports:{}};!function(t,n){var e=r.default;function o(t,r){return function(t,r){var n;n="passthrough"!==r.algorithm?e.createHash(r.algorithm):new f;void 0===n.write&&(n.write=n.update,n.end=n.update);s(r,n).dispatch(t),n.update||n.end("");if(n.digest)return n.digest("buffer"===r.encoding?void 0:r.encoding);var o=n.read();if("buffer"===r.encoding)return o;return o.toString(r.encoding)}(t,r=a(t,r))}(n=t.exports=o).sha1=function(t){return o(t)},n.keys=function(t){return o(t,{excludeValues:!0,algorithm:"sha1",encoding:"hex"})},n.MD5=function(t){return o(t,{algorithm:"md5",encoding:"hex"})},n.keysMD5=function(t){return o(t,{algorithm:"md5",encoding:"hex",excludeValues:!0})};var i=e.getHashes?e.getHashes().slice():["sha1","md5"];i.push("passthrough");var u=["buffer","hex","binary","base64"];function a(t,r){r=r||{};var n={};if(n.algorithm=r.algorithm||"sha1",n.encoding=r.encoding||"hex",n.excludeValues=!!r.excludeValues,n.algorithm=n.algorithm.toLowerCase(),n.encoding=n.encoding.toLowerCase(),n.ignoreUnknown=!0===r.ignoreUnknown,n.respectType=!1!==r.respectType,n.respectFunctionNames=!1!==r.respectFunctionNames,n.respectFunctionProperties=!1!==r.respectFunctionProperties,n.unorderedArrays=!0===r.unorderedArrays,n.unorderedSets=!1!==r.unorderedSets,n.unorderedObjects=!1!==r.unorderedObjects,n.replacer=r.replacer||void 0,n.excludeKeys=r.excludeKeys||void 0,void 0===t)throw new Error("Object argument required.");for(var e=0;e<i.length;++e)i[e].toLowerCase()===n.algorithm.toLowerCase()&&(n.algorithm=i[e]);if(-1===i.indexOf(n.algorithm))throw new Error('Algorithm "'+n.algorithm+'"  not supported. supported values: '+i.join(", "));if(-1===u.indexOf(n.encoding)&&"passthrough"!==n.algorithm)throw new Error('Encoding "'+n.encoding+'"  not supported. supported values: '+u.join(", "));return n}function c(t){if("function"!=typeof t)return!1;return null!=/^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i.exec(Function.prototype.toString.call(t))}function s(t,r,n){n=n||[];var e=function(t){return r.update?r.update(t,"utf8"):r.write(t,"utf8")};return{dispatch:function(r){t.replacer&&(r=t.replacer(r));var n=typeof r;return null===r&&(n="null"),this["_"+n](r)},_object:function(r){var o=Object.prototype.toString.call(r),i=/\[object (.*)\]/i.exec(o);i=(i=i?i[1]:"unknown:["+o+"]").toLowerCase();var u;if((u=n.indexOf(r))>=0)return this.dispatch("[CIRCULAR:"+u+"]");if(n.push(r),"undefined"!=typeof Buffer&&Buffer.isBuffer&&Buffer.isBuffer(r))return e("buffer:"),e(r);if("object"===i||"function"===i||"asyncfunction"===i){var a=Object.keys(r);t.unorderedObjects&&(a=a.sort()),!1===t.respectType||c(r)||a.splice(0,0,"prototype","__proto__","constructor"),t.excludeKeys&&(a=a.filter((function(r){return!t.excludeKeys(r)}))),e("object:"+a.length+":");var s=this;return a.forEach((function(n){s.dispatch(n),e(":"),t.excludeValues||s.dispatch(r[n]),e(",")}))}if(!this["_"+i]){if(t.ignoreUnknown)return e("["+i+"]");throw new Error('Unknown object type "'+i+'"')}this["_"+i](r)},_array:function(r,o){o=void 0!==o?o:!1!==t.unorderedArrays;var i=this;if(e("array:"+r.length+":"),!o||r.length<=1)return r.forEach((function(t){return i.dispatch(t)}));var u=[],a=r.map((function(r){var e=new f,o=n.slice();return s(t,e,o).dispatch(r),u=u.concat(o.slice(n.length)),e.read().toString()}));return n=n.concat(u),a.sort(),this._array(a,!1)},_date:function(t){return e("date:"+t.toJSON())},_symbol:function(t){return e("symbol:"+t.toString())},_error:function(t){return e("error:"+t.toString())},_boolean:function(t){return e("bool:"+t.toString())},_string:function(t){e("string:"+t.length+":"),e(t.toString())},_function:function(r){e("fn:"),c(r)?this.dispatch("[native]"):this.dispatch(r.toString()),!1!==t.respectFunctionNames&&this.dispatch("function-name:"+String(r.name)),t.respectFunctionProperties&&this._object(r)},_number:function(t){return e("number:"+t.toString())},_xml:function(t){return e("xml:"+t.toString())},_null:function(){return e("Null")},_undefined:function(){return e("Undefined")},_regexp:function(t){return e("regex:"+t.toString())},_uint8array:function(t){return e("uint8array:"),this.dispatch(Array.prototype.slice.call(t))},_uint8clampedarray:function(t){return e("uint8clampedarray:"),this.dispatch(Array.prototype.slice.call(t))},_int8array:function(t){return e("uint8array:"),this.dispatch(Array.prototype.slice.call(t))},_uint16array:function(t){return e("uint16array:"),this.dispatch(Array.prototype.slice.call(t))},_int16array:function(t){return e("uint16array:"),this.dispatch(Array.prototype.slice.call(t))},_uint32array:function(t){return e("uint32array:"),this.dispatch(Array.prototype.slice.call(t))},_int32array:function(t){return e("uint32array:"),this.dispatch(Array.prototype.slice.call(t))},_float32array:function(t){return e("float32array:"),this.dispatch(Array.prototype.slice.call(t))},_float64array:function(t){return e("float64array:"),this.dispatch(Array.prototype.slice.call(t))},_arraybuffer:function(t){return e("arraybuffer:"),this.dispatch(new Uint8Array(t))},_url:function(t){return e("url:"+t.toString())},_map:function(r){e("map:");var n=Array.from(r);return this._array(n,!1!==t.unorderedSets)},_set:function(r){e("set:");var n=Array.from(r);return this._array(n,!1!==t.unorderedSets)},_file:function(t){return e("file:"),this.dispatch([t.name,t.size,t.type,t.lastModfied])},_blob:function(){if(t.ignoreUnknown)return e("[blob]");throw Error('Hashing Blob objects is currently not supported\n(see https://github.com/puleos/object-hash/issues/26)\nUse "options.replacer" or "options.ignoreUnknown"\n')},_domwindow:function(){return e("domwindow")},_bigint:function(t){return e("bigint:"+t.toString())},_process:function(){return e("process")},_timer:function(){return e("timer")},_pipe:function(){return e("pipe")},_tcp:function(){return e("tcp")},_udp:function(){return e("udp")},_tty:function(){return e("tty")},_statwatcher:function(){return e("statwatcher")},_securecontext:function(){return e("securecontext")},_connection:function(){return e("connection")},_zlib:function(){return e("zlib")},_context:function(){return e("context")},_nodescript:function(){return e("nodescript")},_httpparser:function(){return e("httpparser")},_dataview:function(){return e("dataview")},_signal:function(){return e("signal")},_fsevent:function(){return e("fsevent")},_tlswrap:function(){return e("tlswrap")}}}function f(){return{buf:"",write:function(t){this.buf+=t},end:function(t){this.buf+=t},read:function(){return this.buf}}}n.writeToStream=function(t,r,n){return void 0===n&&(n=r,r={}),s(r=a(t,r),n).dispatch(t)}}(e,e.exports);var o=e.exports;exports.MD5=o,exports.commonjsGlobal=n;
