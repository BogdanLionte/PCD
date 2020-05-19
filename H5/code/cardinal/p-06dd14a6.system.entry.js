System.register(["./p-649cab6e.system.js","./p-c08672ec.system.js","./p-747922cd.system.js","./p-ebf68af7.system.js","./p-7e5936d9.system.js"],(function(t){"use strict";var e,o,r,i,n,a,s,u;return{setters:[function(t){e=t.r;o=t.h;r=t.g},function(t){i=t.c;n=t.b},function(){},function(t){a=t.T},function(t){s=t._;u=t.B}],execute:function(){var l=undefined&&undefined.__decorate||function(t,e,o,r){var i=arguments.length,n=i<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,a;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")n=Reflect.decorate(t,e,o,r);else for(var s=t.length-1;s>=0;s--)if(a=t[s])n=(i<3?a(n):i>3?a(e,o,n):a(e,o))||n;return i>3&&n&&Object.defineProperty(e,o,n),n};var d=t("psk_for_each",function(){function t(t){e(this,t);this.modelChanged=false;this.ignoredNodeNames=["link","style","slot","#text","#comment","text","comment"];this.templateNodes=[];this.dataViewModel=null}t.prototype.componentWillLoad=function(){var t=this;var e=Array.from(this.__host.childNodes);var o=e.filter((function(e){return t.ignoredNodeNames.indexOf(e.nodeName.toLowerCase())===-1}));var r=o.filter((function(t){return!t.hasAttribute("slot")}));var i=o.find((function(t){return t.hasAttribute("slot")&&t.getAttribute("slot")==="no-data"}));if(i){i.removeAttribute("slot");this.emptyNode=i.cloneNode(true)}this.__host.innerHTML="";if(r){r.forEach((function(e){t.templateNodes.push(e.cloneNode(true))}))}else{console.error("No template found!")}};t.prototype.componentDidLoad=function(){var t=this;if(this["rootModel"]){this["rootModel"].onChange(this["parentChain"],(function(){t.modelChanged=!t.modelChanged}))}};t.prototype.render=function(){var t=this;if(!this["rootModel"]||!this["parentChain"]){return null}if(!this.templateNodes){return null}var e=this["rootModel"].getChainValue(this["parentChain"]);if(!e){e=[]}var r=[];var i=function(e){var i=n["parentChain"]?n["parentChain"]+"."+e+".":e+".";var a=[];n.templateNodes.forEach((function(e){var r=e.cloneNode(true);var n=t.prepareItem(i,r);var s=n.tagName.toLowerCase();var u={};n.getAttributeNames().forEach((function(t){u[t]=n.getAttribute(t)}));var l=o(s,Object.assign({innerHTML:n.innerHTML},u));a.push(l)}));r.push(a)};var n=this;for(var a=0;a<e.length;a++){i(a)}if(r.length===0&&this.emptyNode){return o("div",{innerHTML:this.emptyNode.outerHTML})}return r};t.prototype.__updateDisplayConditionals=function(t,e){var o=t.getAttribute(i),r=t.getAttribute(n);if(o){t.setAttribute(i,""+e+o.trim())}if(r){t.setAttribute(n,""+e+r.trim())}};t.prototype.__processNode=function(t,e){var o=this;this.__updateDisplayConditionals(t,e);if(!s(this["rootModel"],t)){t.setAttribute("data-hide","hide");return}var r=Array.from(t.attributes).filter((function(t){return t.name.startsWith("view-model-")}));r.forEach((function(r){var i=r.name.split("view-model-")[1];var n=e?""+e+r.value:r.value;t.setAttribute(i,o["rootModel"].getChainValue(n))}));r=Array.from(t.attributes).filter((function(t){return t.value.startsWith("@")}));r.forEach((function(r){var i=r.value.split("@")[1];var n=e?""+e+i:i;t.setAttribute(r.name,o["rootModel"].getChainValue(n))}));Array.from(t.children).forEach((function(t){o.__processNode.call(o,t,e)}))};t.prototype.prepareItem=function(t,e){var o=e.querySelectorAll("[view-model]");this.__processNode.call(this,e,t);o.forEach((function(e){var o=""+t+e.getAttribute("view-model");e.setAttribute("view-model",o)}));return e};Object.defineProperty(t.prototype,"__host",{get:function(){return r(this)},enumerable:true,configurable:true});return t}());l([u()],d.prototype,"__host",void 0);l([a({description:["This property is the name of the model which will be used to generate the form. The model should be a JavaScript array.",'All the information about how to write a model, hot to use the two-way binding and how to use the model with this component cand be found in the documentation found at: <psk-link page="forms/using-forms">Using forms</psk-link>'],isMandatory:true,propertyType:"string",specialNote:["If this property is not provided, nothing written inside the component's template will be displayed."]})],d.prototype,"dataViewModel",void 0)}}}));