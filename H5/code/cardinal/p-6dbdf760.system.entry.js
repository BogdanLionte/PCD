var __extends=this&&this.__extends||function(){var t=function(e,n){t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)if(e.hasOwnProperty(n))t[n]=e[n]};return t(e,n)};return function(e,n){t(e,n);function s(){this.constructor=e}e.prototype=n===null?Object.create(n):(s.prototype=n.prototype,new s)}}();System.register(["./p-649cab6e.system.js","./p-a64d3dd8.system.js","./p-c7fd196f.system.js","./p-2d5d376b.system.js","./p-c08672ec.system.js"],(function(t){"use strict";var e,n,s,r,i;return{setters:[function(t){e=t.r;n=t.h;s=t.g},function(){},function(t){r=t.i},function(){},function(t){i=t.E}],execute:function(){var o=i.PSK_SUB_MENU_EVT;var a=function(t){__extends(e,t);function e(e,n,s){var r=t.call(this,e,s)||this;r.getEventType=function(){return o};r.data=n;return r}return e}(CustomEvent);var c=t("event_expandable_renderer",function(){function t(t){e(this,t);this.isOpened=false;this.dropDownHasChildActive=false;this.somethingChanged=false;this.isClosed=true;this.lazyItems=[]}t.prototype.loadSubMenuItems=function(){var t=this;if(this.event){var e=new a(this.event,(function(e,s){if(e){throw new Error(e)}var r=[];s.forEach((function(t){r.push(n("stencil-route-link",{url:t.path,activeClass:"active",exact:false},n("div",{class:"wrapper_container"},n("div",{class:"item_container"},n("span",{class:"icon fa "+t.icon}),n("span",{class:"item_name"},t.name)))))}));t.lazyItems=r}),{cancelable:true,composed:true,bubbles:true});this._host.dispatchEvent(e)}};t.prototype.componentDidLoad=function(){var t=this;this._host.addEventListener("click",(function(){t.isClosed=false;t.loadSubMenuItems()}))};t.prototype.render=function(){return this.isClosed?null:this.lazyItems.length?this.lazyItems:n("div",{class:"menu-loader"},"Loading...")};Object.defineProperty(t.prototype,"_host",{get:function(){return s(this)},enumerable:true,configurable:true});return t}());r(c)}}}));