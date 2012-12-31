define("test/moduleA/0.9.17/daparser",["$"],function(a,b){function f(a){for(var b=[],c=0,d=a.length;d>c;c++){var e=a[c];1===e.nodeType&&b.push(e)}return b}function g(a){var b=a.outerHTML;if(b)return-1!==b.indexOf(" data-");var c=a.innerHTML;if(c&&-1!==c.indexOf(" data-"))return!0;var d=e.parseElement(a);for(var f in d)return!0;return!1}function i(a){return a.toLowerCase().replace(h,function(a,b){return(b+"").toUpperCase()})}function k(){return"daparser-"+j++}var c=a("$"),d="data-daparser-cid",e=b;e.parseBlock=function(a){a=c(a)[0];var b={};if(!g(a))return b;var h=f(a.getElementsByTagName("*"));h.unshift(a);for(var i=0,j=h.length;j>i;i++){var k=h[i],l=e.parseElement(k),m=k.getAttribute(d);for(var n in l){m||(m=e.stamp(k));var o=l[n],p=b[n]||(b[n]={});p[o]||(p[o]=""),p[o]+=(p[o]?",":"")+"."+m}}return b},e.parseElement=function(a){if(a=c(a)[0],a.dataset)return c.extend({},a.dataset);for(var b={},d=a.attributes,e=0,f=d.length;f>e;e++){var g=d[e],h=g.name;0===h.indexOf("data-")&&(h=i(h.substring(5)),b[h]=g.value)}return b},e.stamp=function(a){a=c(a)[0];var b=a.getAttribute(d);return b||(b=k(),a.setAttribute(d,b),a.className+=" "+b),b};var h=/-([a-z])/g,j=0}),define("test/moduleA/0.9.17/auto-render",["$"],function(a,b){var c=a("$");b.autoRender=function(a){new this(a).render()},b.autoRenderAll=function(d){d=c(d||document.body);var e=[],f=[];d.find("[data-widget]").each(function(a,c){b.isDataApiOff(c)||(e.push(c.getAttribute("data-widget").toLowerCase()),f.push(c))}),e.length&&a.async(e,function(){for(var a=0;arguments.length>a;a++){var b=arguments[a],c=f[a];b.autoRender&&b.autoRender({element:c,renderType:"auto"})}})};var d="off"===c(document.body).attr("data-api");b.isDataApiOff=function(a){var b=c(a).attr("data-api");return"off"===b||"on"!==b&&d}}),define("test/moduleA/0.9.17/widget",["./daparser","./auto-render","arale/base/1.0.1/base","arale/class/1.0.0/class","arale/events/1.0.0/events","$"],function(a,b,c){function m(){return"widget-"+l++}function n(a){return"[object String]"===k.call(a)}function o(a){return"[object Function]"===k.call(a)}function p(a){for(var b in a)if(a.hasOwnProperty(b))return!1;return!0}function q(a){return a.replace(/^\s*/,"").replace(/\s*$/,"")}function s(a){return r(document.documentElement,a)}function t(a){return a.charAt(0).toUpperCase()+a.substring(1)}function w(a){for(var b in a)if(a.hasOwnProperty(b)){var c=a[b];if(!n(c))continue;u.test(c)?(c=c.replace(/'/g,'"'),a[b]=w(v(c))):a[b]=x(c)}return a}function x(a){if("false"===a.toLowerCase())a=!1;else if("true"===a.toLowerCase())a=!0;else if(/\d/.test(a)&&/[^a-z]/i.test(a)){var b=parseFloat(a);b+""===a&&(a=b)}return a}function y(a,b){for(var c in a)if(a.hasOwnProperty(c))for(var d=q(c).split(/\s*,\s*/),e=a[c];c=d.shift();){var f=c.split(/\s+/),g=f[0],h=f[1];h||(h=g,g="click"),b[g+" "+e]=h}}function z(a){return null==a||(n(a)||e.isArray(a))&&0===a.length||e.isPlainObject(a)&&p(a)}function D(a){return o(a.events)&&(a.events=a.events()),a.events}function E(a,b){var c=a.match(A),d=c[1]+h+b.cid,e=c[2]||void 0;return e&&e.indexOf("{{")>-1&&(e=F(e,b)),{type:d,selector:e}}function F(a,b){return a.replace(B,function(a,c){for(var h,d=c.split("."),g=b;h=d.shift();)g=g===b.attrs?b.get(h):g[h];if(n(g))return g;var i=e(g)[0];return i&&1===i.nodeType?"."+f.stamp(i):C})}var d=a("arale/base/1.0.1/base"),e=a("$"),f=a("./daparser"),g=a("./auto-render"),h=".delegate-events-",i="_onRender",j=d.extend({propsInAttrs:["element","template","model","events"],element:null,template:"<div></div>",model:null,events:null,attrs:{id:"",className:"",style:{},parentNode:document.body},initialize:function(a){this.cid=m();var b=this._parseDataAttrsConfig(a);this.initAttrs(a,b),this.parseElement(),this._parseDataset(),this.initProps(),this.delegateEvents(),this.setup()},_parseDataAttrsConfig:function(a){var b;if(a)var c=e(a.element);return c&&c[0]&&!g.isDataApiOff(c)&&(b=f.parseElement(c),w(b)),b},parseElement:function(){var a=this.element;if(a?this.element=e(a):this.get("template")&&this.parseElementFromTemplate(),!this.element||!this.element[0])throw new Error("element is invalid")},parseElementFromTemplate:function(){this.element=e(this.get("template"))},_parseDataset:function(){if(!g.isDataApiOff(this.element)){this.dataset=f.parseBlock(this.element);var a=this.dataset.action;if(a){var b=D(this)||(this.events={});y(a,b)}}},initProps:function(){},delegateEvents:function(a,b){if(a||(a=D(this)),a){if(n(a)&&o(b)){var c={};c[a]=b,a=c}for(var d in a)if(a.hasOwnProperty(d)){var e=E(d,this),f=e.type,g=e.selector;(function(a,b){var c=function(c){o(a)?a.call(b,c):b[a](c)};g?b.element.on(f,g,c):b.element.on(f,c)})(a[d],this)}return this}},undelegateEvents:function(a){var b={};return 0===arguments.length?b.type=h+this.cid:b=E(a,this),this.element.off(b.type,b.selector),this},setup:function(){},render:function(){this.rendered||(this._renderAndBindAttrs(),this.rendered=!0);var a=this.get("parentNode");return a&&!s(this.element[0])&&this.element.appendTo(a),this},_renderAndBindAttrs:function(){var a=this,b=a.attrs;for(var c in b)if(b.hasOwnProperty(c)){var d=i+t(c);if(this[d]){var e=this.get(c);z(e)||this[d](this.get(c),void 0,c),function(b){a.on("change:"+c,function(c,d,e){a[b](c,d,e)})}(d)}}},_onRenderId:function(a){this.element.attr("id",a)},_onRenderClassName:function(a){this.element.addClass(a)},_onRenderStyle:function(a){this.element.css(a)},$:function(a){return this.element.find(a)},destroy:function(){this.undelegateEvents(),j.superclass.destroy.call(this)}});j.autoRender=g.autoRender,j.autoRenderAll=g.autoRenderAll,j.StaticsWhiteList=["autoRender"],c.exports=j;var k=Object.prototype.toString,l=0,r=e.contains||function(a,b){return!!(16&a.compareDocumentPosition(b))},u=/^\s*[\[{].*[\]}]\s*$/,v=this.JSON?JSON.parse:e.parseJSON,A=/^(\S+)\s*(.*)$/,B=/{{([^}]+)}}/g,C="INVALID_SELECTOR"});