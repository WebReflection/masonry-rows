!function(){"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function n(t){return(n=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function r(t,e){return(r=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function i(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function o(t,e,n){return(o=i()?Reflect.construct:function(t,e,n){var i=[null];i.push.apply(i,e);var o=new(Function.bind.apply(t,i));return n&&r(o,n.prototype),o}).apply(null,arguments)}function a(t){var e="function"==typeof Map?new Map:void 0;return(a=function(t){if(null===t||(i=t,-1===Function.toString.call(i).indexOf("[native code]")))return t;var i;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,a)}function a(){return o(t,arguments,n(this).constructor)}return a.prototype=Object.create(t.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),r(a,t)})(t)}function u(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}var s=!0,c=[].filter,l=new WeakMap,f=function(t){return t.ownerDocument.defaultView.getComputedStyle(t)},p=function(t,e){e.ownerDocument.defaultView[t+"EventListener"]("resize",l.get(e))},h=function(t){return-1!=f(t).gridColumnEnd},y=function(t,e,n){if(null!=n){var r="number"==typeof n?n+"px":n;t.style.setProperty(e,r)}else t.style.removeProperty(e);l.has(t)&&l.get(t)()};customElements.define("masonry-rows",function(o){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&r(t,e)}(b,o);var a,d,g,m,v,w=(a=b,d=i(),function(){var t,e=n(a);if(d){var r=n(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return u(this,t)});function b(){return t(this,b),w.apply(this,arguments)}return g=b,v=[{key:"observedAttributes",get:function(){return["gap","min-width"]}}],(m=[{key:"attributeChangedCallback",value:function(t,e,n){this["gap"===t?t:"minWidth"]=n}},{key:"connectedCallback",value:function(){var t=this,e=this.ownerDocument;s&&(s=!1,e.head.appendChild(e.createElement("style")).textContent="@supports (display: grid) {\n        masonry-rows, .masonry-rows {\n          --gap: .5em;\n          --min-width: 20em;\n          --width: minmax(min(var(--min-width), 100%), 1fr);\n          box-sizing: inherit;\n          margin: 0;\n          display: grid;\n          grid-template-columns: repeat(auto-fit, var(--width));\n          grid-template-rows: masonry;\n          justify-content: center;\n          grid-gap: var(--gap);\n          padding: var(--gap);\n        }\n        masonry-rows > *, .masonry-rows > * { align-self: start }\n      }");var n=l.has(this),r=f(this),i=r.display,o=r.gridTemplateRows;n||"grid"!==i||"masonry"===o||(n=!n,l.set(this,(function(){for(var e=!1,n=f(t),r=n.gridRowGap,i=n.gridTemplateColumns.split(/\s+/).length,o=t.items,a=o.length,u=0;u<a;u++){var s=o[u],c=s.getBoundingClientRect().height;c!=s.dataset.height&&(s.dataset.height=c,e=!0)}if(e||t.dataset.columns!=i){t.dataset.columns=i;for(var l=0;l<a;l++)o[l].style.removeProperty("margin-top");if(1<i)for(var p=parseFloat(r),h=i;h<a;h++){var y=o[h-i].getBoundingClientRect().bottom,d=o[h].getBoundingClientRect().top;o[h].style.marginTop=y+p-d+"px"}}})),new MutationObserver(l.get(this)).observe(this,{subtree:!0,childList:!0})),n&&(p("add",this),l.get(this)())}},{key:"disconnectedCallback",value:function(){l.has(this)&&p("remove",this)}},{key:"gap",get:function(){return this.style.getPropertyValue("--gap")||".5em"},set:function(t){y(this,"--gap",t)}},{key:"items",get:function(){return c.call(this.children,h)}},{key:"minWidth",get:function(){return this.style.getPropertyValue("--min-width")||"20em"},set:function(t){y(this,"--min-width",t)}}])&&e(g.prototype,m),v&&e(g,v),b}(a(HTMLElement)))}();