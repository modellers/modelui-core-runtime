import{h as e,i as n}from"../_rollupPluginBabelHelpers-55d249d8.js";function r(e){var t=e.targetIndex,d=e.node,o=e.currentIndex,i=e.getNodeKey,a=e.path,l=void 0===a?[]:a,c=e.lowerSiblingCounts,u=void 0===c?[]:c,h=e.ignoreCollapsed,p=void 0===h||h,f=e.isPseudoRoot,s=void 0!==f&&f?[]:[].concat(n(l),[i({node:d,treeIndex:o})]);if(o===t)return{node:d,lowerSiblingCounts:u,path:s};if(!d.children||p&&!0!==d.expanded)return{nextIndex:o+1};for(var x=o+1,g=d.children.length,v=0;v<g;v+=1){var I=r({ignoreCollapsed:p,getNodeKey:i,targetIndex:t,node:d.children[v],currentIndex:x,lowerSiblingCounts:[].concat(n(u),[g-v-1]),path:s});if(I.node)return I;x=I.nextIndex}return{nextIndex:x}}function t(e){var n=e.node,t=e.ignoreCollapsed;return r({getNodeKey:function(){},ignoreCollapsed:void 0===t||t,node:n,currentIndex:0,targetIndex:-1}).nextIndex-1}function d(e){var r=e.callback,t=e.getNodeKey,o=e.ignoreCollapsed,i=e.isPseudoRoot,a=void 0!==i&&i,l=e.node,c=e.parentNode,u=void 0===c?null:c,h=e.currentIndex,p=e.path,f=void 0===p?[]:p,s=e.lowerSiblingCounts,x=void 0===s?[]:s,g=a?[]:[].concat(n(f),[t({node:l,treeIndex:h})]);if(!a&&!1===r(a?null:{node:l,parentNode:u,path:g,lowerSiblingCounts:x,treeIndex:h}))return!1;if(!l.children||!0!==l.expanded&&o&&!a)return h;var v=h,I=l.children.length;if("function"!=typeof l.children)for(var N=0;N<I;N+=1)if(!1===(v=d({callback:r,getNodeKey:t,ignoreCollapsed:o,node:l.children[N],parentNode:a?null:l,currentIndex:v+1,lowerSiblingCounts:[].concat(n(x),[I-N-1]),path:g})))return!1;return v}function o(r){var t=r.callback,d=r.getNodeKey,i=r.ignoreCollapsed,a=r.isPseudoRoot,l=void 0!==a&&a,c=r.node,u=r.parentNode,h=void 0===u?null:u,p=r.currentIndex,f=r.path,s=void 0===f?[]:f,x=r.lowerSiblingCounts,g=void 0===x?[]:x,v=e({},c),I=l?[]:[].concat(n(s),[d({node:v,treeIndex:p})]),N={node:v,parentNode:h,path:I,lowerSiblingCounts:g,treeIndex:p};if(!v.children||!0!==v.expanded&&i&&!l)return{treeIndex:p,node:t(N)};var y=p,C=v.children.length;return"function"!=typeof v.children&&(v.children=v.children.map((function(e,r){var a=o({callback:t,getNodeKey:d,ignoreCollapsed:i,node:e,parentNode:l?null:v,currentIndex:y+1,lowerSiblingCounts:[].concat(n(g),[C-r-1]),path:I});return y=a.treeIndex,a.node}))),{node:t(N),treeIndex:y}}function i(e){var n=e.treeData,r=function e(n){return n.children&&!0===n.expanded&&"function"!=typeof n.children?1+n.children.reduce((function(n,r){return n+e(r)}),0):1};return n.reduce((function(e,n){return e+r(n)}),0)}function a(e){var n=e.treeData,t=e.index,d=e.getNodeKey;if(!n||n.length<1)return null;var o=r({targetIndex:t,getNodeKey:d,node:{children:n,expanded:!0},currentIndex:-1,path:[],lowerSiblingCounts:[],isPseudoRoot:!0});return o.node?o:null}function l(e){var n=e.treeData,r=e.getNodeKey,t=e.callback,o=e.ignoreCollapsed,i=void 0===o||o;!n||n.length<1||d({callback:t,getNodeKey:r,ignoreCollapsed:i,isPseudoRoot:!0,node:{children:n},currentIndex:-1,path:[],lowerSiblingCounts:[]})}function c(e){var n=e.treeData,r=e.getNodeKey,t=e.callback,d=e.ignoreCollapsed,i=void 0===d||d;return!n||n.length<1?[]:o({callback:t,getNodeKey:r,ignoreCollapsed:i,isPseudoRoot:!0,node:{children:n},currentIndex:-1,path:[],lowerSiblingCounts:[]}).node.children}function u(n){var r=n.treeData,t=n.expanded,d=void 0===t||t;return c({treeData:r,callback:function(n){var r=n.node;return e(e({},r),{},{expanded:d})},getNodeKey:function(e){return e.treeIndex},ignoreCollapsed:!1})}function h(r){var d=r.treeData,o=r.path,i=r.newNode,a=r.getNodeKey,l=r.ignoreCollapsed,c=void 0===l||l,u="RESULT_MISS",h=function r(d){var l=d.isPseudoRoot,h=void 0!==l&&l,p=d.node,f=d.currentTreeIndex,s=d.pathIndex;if(!h&&a({node:p,treeIndex:f})!==o[s])return u;if(s>=o.length-1)return"function"==typeof i?i({node:p,treeIndex:f}):i;if(!p.children)throw new Error("Path referenced children of node with no children.");for(var x=f+1,g=0;g<p.children.length;g+=1){var v=r({node:p.children[g],currentTreeIndex:x,pathIndex:s+1});if(v!==u)return e(e({},p),{},v?{children:[].concat(n(p.children.slice(0,g)),[v],n(p.children.slice(g+1)))}:{children:[].concat(n(p.children.slice(0,g)),n(p.children.slice(g+1)))});x+=1+t({node:p.children[g],ignoreCollapsed:c})}return u}({node:{children:d},currentTreeIndex:-1,pathIndex:-1,isPseudoRoot:!0});if(h===u)throw new Error("No node found at the given path.");return h.children}function p(e){var n=e.treeData,r=e.path,t=e.getNodeKey,d=e.ignoreCollapsed;return h({treeData:n,path:r,getNodeKey:t,ignoreCollapsed:void 0===d||d,newNode:null})}function f(e){var n=e.treeData,r=e.path,t=e.getNodeKey,d=e.ignoreCollapsed,o=null,i=null;return{treeData:h({treeData:n,path:r,getNodeKey:t,ignoreCollapsed:void 0===d||d,newNode:function(e){var n=e.node,r=e.treeIndex;return o=n,i=r,null}}),node:o,treeIndex:i}}function s(e){var n=e.treeData,r=e.path,t=e.getNodeKey,d=e.ignoreCollapsed,o=void 0===d||d,i=null;try{h({treeData:n,path:r,getNodeKey:t,ignoreCollapsed:o,newNode:function(e){var n=e.node,r=e.treeIndex;return i={node:n,treeIndex:r},n}})}catch(e){}return i}function x(r){var d=r.treeData,o=r.newNode,i=r.parentKey,a=void 0===i?null:i,l=r.getNodeKey,u=r.ignoreCollapsed,h=void 0===u||u,p=r.expandParent,f=void 0!==p&&p,s=r.addAsFirstChild,x=void 0!==s&&s;if(null===a)return x?{treeData:[o].concat(n(d||[])),treeIndex:0}:{treeData:[].concat(n(d||[]),[o]),treeIndex:(d||[]).length};var g=null,v=!1,I=c({treeData:d,getNodeKey:l,ignoreCollapsed:h,callback:function(r){var d=r.node,i=r.treeIndex,l=r.path,c=l?l[l.length-1]:null;if(v||c!==a)return d;v=!0;var u=e({},d);if(f&&(u.expanded=!0),!u.children)return g=i+1,e(e({},u),{},{children:[o]});if("function"==typeof u.children)throw new Error("Cannot add to children defined by a function");for(var p=i+1,s=0;s<u.children.length;s+=1)p+=1+t({node:u.children[s],ignoreCollapsed:h});g=p;var I=x?[o].concat(n(u.children)):[].concat(n(u.children),[o]);return e(e({},u),{},{children:I})}});if(!v)throw new Error("No node found with the given key.");return{treeData:I,treeIndex:g}}function g(r){var d=r.targetDepth,o=r.minimumTreeIndex,i=r.newNode,a=r.ignoreCollapsed,l=r.expandParent,c=r.isPseudoRoot,u=void 0!==c&&c,h=r.isLastChild,p=r.node,f=r.currentIndex,s=r.currentDepth,x=r.getNodeKey,v=r.path,I=void 0===v?[]:v,N=function(e){return u?[]:[].concat(n(I),[x({node:e,treeIndex:f})])};if(f>=o-1||h&&(!p.children||!p.children.length)){if("function"==typeof p.children)throw new Error("Cannot add to children defined by a function");var y=l?{expanded:!0}:{},C=e(e(e({},p),y),{},{children:p.children?[i].concat(n(p.children)):[i]});return{node:C,nextIndex:f+2,insertedTreeIndex:f+1,parentPath:N(C),parentNode:u?null:C}}if(s>=d-1){if(!p.children||"function"==typeof p.children||!0!==p.expanded&&a&&!u)return{node:p,nextIndex:f+1};for(var w=f+1,K=null,D=null,b=0;b<p.children.length;b+=1){if(w>=o){K=w,D=b;break}w+=1+t({node:p.children[b],ignoreCollapsed:a})}if(null===D){if(w<o&&!h)return{node:p,nextIndex:w};K=w,D=p.children.length}var m=e(e({},p),{},{children:[].concat(n(p.children.slice(0,D)),[i],n(p.children.slice(D)))});return{node:m,nextIndex:w,insertedTreeIndex:K,parentPath:N(m),parentNode:u?null:m}}if(!p.children||"function"==typeof p.children||!0!==p.expanded&&a&&!u)return{node:p,nextIndex:f+1};var P=null,S=null,T=null,k=f+1,R=p.children;"function"!=typeof R&&(R=R.map((function(e,n){if(null!==P)return e;var r=g({targetDepth:d,minimumTreeIndex:o,newNode:i,ignoreCollapsed:a,expandParent:l,isLastChild:h&&n===R.length-1,node:e,currentIndex:k,currentDepth:s+1,getNodeKey:x,path:[]});return"insertedTreeIndex"in r&&(P=r.insertedTreeIndex,T=r.parentNode,S=r.parentPath),k=r.nextIndex,r.node})));var M=e(e({},p),{},{children:R}),E={node:M,nextIndex:k};return null!==P&&(E.insertedTreeIndex=P,E.parentPath=[].concat(n(N(M)),n(S)),E.parentNode=T),E}function v(e){var r=e.treeData,t=e.depth,d=e.minimumTreeIndex,o=e.newNode,i=e.getNodeKey,a=void 0===i?function(){}:i,l=e.ignoreCollapsed,c=void 0===l||l,u=e.expandParent,h=void 0!==u&&u;if(!r&&0===t)return{treeData:[o],treeIndex:0,path:[a({node:o,treeIndex:0})],parentNode:null};var p=g({targetDepth:t,minimumTreeIndex:d,newNode:o,ignoreCollapsed:c,expandParent:h,getNodeKey:a,isPseudoRoot:!0,isLastChild:!0,node:{children:r},currentIndex:-1,currentDepth:-1});if(!("insertedTreeIndex"in p))throw new Error("No suitable position found to insert.");var f=p.insertedTreeIndex;return{treeData:p.node.children,treeIndex:f,path:[].concat(n(p.parentPath),[a({node:o,treeIndex:f})]),parentNode:p.parentNode}}function I(e){var n=e.treeData,r=e.getNodeKey,t=e.ignoreCollapsed,d=void 0===t||t;if(!n||n.length<1)return[];var o=[];return l({treeData:n,getNodeKey:r,ignoreCollapsed:d,callback:function(e){o.push(e)}}),o}function N(n){var r=n.flatData,t=n.getKey,d=void 0===t?function(e){return e.id}:t,o=n.getParentKey,i=void 0===o?function(e){return e.parentId}:o,a=n.rootKey,l=void 0===a?"0":a;if(!r)return[];var c={};if(r.forEach((function(e){var n=i(e);n in c?c[n].push(e):c[n]=[e]})),!(l in c))return[];var u=function n(r){var t=d(r);return t in c?e(e({},r),{},{children:c[t].map((function(e){return n(e)}))}):e({},r)};return c[l].map((function(e){return u(e)}))}function y(e,n){return!!e.children&&"function"!=typeof e.children&&e.children.some((function(e){return e===n||y(e,n)}))}function C(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e.children?"function"==typeof e.children?n+1:e.children.reduce((function(e,r){return Math.max(e,C(r,n+1))}),n):n}function w(r){var t=r.getNodeKey,d=r.treeData,o=r.searchQuery,i=r.searchMethod,a=r.searchFocusOffset,l=r.expandAllMatchPaths,c=void 0!==l&&l,u=r.expandFocusMatchPaths,h=void 0===u||u,p=0,f=function r(d){var l=d.isPseudoRoot,u=void 0!==l&&l,f=d.node,s=d.currentIndex,x=d.path,g=[],v=!1,I=!1,N=u?[]:[].concat(n(void 0===x?[]:x),[t({node:f,treeIndex:s})]),y=u?null:{path:N,treeIndex:s},C=f.children&&"function"!=typeof f.children&&f.children.length>0;!u&&i(e(e({},y),{},{node:f,searchQuery:o}))&&(p===a&&(I=!0),p+=1,v=!0);var w=s,K=e({},f);return C&&(K.children=K.children.map((function(e){var t=r({node:e,currentIndex:w+1,path:N});return t.node.expanded?w=t.treeIndex:w+=1,(t.matches.length>0||t.hasFocusMatch)&&(g=[].concat(n(g),n(t.matches)),t.hasFocusMatch&&(I=!0),(c&&t.matches.length>0||(c||h)&&t.hasFocusMatch)&&(K.expanded=!0)),t.node}))),u||K.expanded||(g=g.map((function(n){return e(e({},n),{},{treeIndex:null})}))),v&&(g=[e(e({},y),{},{node:K})].concat(n(g))),{node:g.length>0?K:f,matches:g,hasFocusMatch:I,treeIndex:w}}({node:{children:d},isPseudoRoot:!0,currentIndex:-1});return{matches:f.matches,treeData:f.node.children}}export{x as addNodeUnderParent,h as changeNodeAtPath,w as find,C as getDepth,t as getDescendantCount,I as getFlatDataFromTree,s as getNodeAtPath,N as getTreeFromFlatData,i as getVisibleNodeCount,a as getVisibleNodeInfoAtIndex,v as insertNode,y as isDescendant,c as map,f as removeNode,p as removeNodeAtPath,u as toggleExpandedForAll,l as walk};
//# sourceMappingURL=TreeUtil.js.map
