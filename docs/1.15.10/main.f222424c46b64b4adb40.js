!function(e){function t(t){for(var r,o,c=t[0],i=t[1],s=t[2],m=0,h=[];m<c.length;m++)o=c[m],l[o]&&h.push(l[o][0]),l[o]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);for(u&&u(t);h.length;)h.shift()();return a.push.apply(a,s||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,c=1;c<n.length;c++){var i=n[c];0!==l[i]&&(r=!1)}r&&(a.splice(t--,1),e=o(o.s=n[0]))}return e}var r={},l={0:0},a=[];function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="./";var c=window.webpackJsonp=window.webpackJsonp||[],i=c.push.bind(c);c.push=t,c=c.slice();for(var s=0;s<c.length;s++)t(c[s]);var u=i;a.push([0,1]),n()}({"./src/index.tsx":function(e,t,n){"use strict";n.r(t);var r=n("./node_modules/react/index.js"),l=n.n(r),a=n("./node_modules/react-dom/index.js"),o=n.n(a),c=n("./node_modules/react-hot-loader/index.js"),i=n("./node_modules/react-router-dom/index.js");function s(){return r.createElement("div",null)}function u(){return r.createElement("div",null)}var m=[{title:"Channels",items:[{title:"Subscribers",href:"/channels/subscribers"},{title:"Views",href:"/channels/views"},{title:"Last Upload",href:"/channels/upload"},{title:"Founded",href:"/channels/founded"},{title:"Trending",href:"/channels/trending"}]},{title:"Menu",items:[{title:"Explore by topics",href:"/topics"},{title:"Introduction",href:"/how-does-this-work"},{title:"Suggest a channel",href:"/suggest"},{title:"Contributions",href:"/contributions"},{title:"Support us",href:"/support-us"}]}];function h(){return r.createElement("aside",{className:"menu is-hidden-mobile"},r.createElement("a",{href:"/"},r.createElement("img",{className:"nav-menu-margin",width:"200",src:"/img/logo.svg"})),r.createElement("p",{className:"menu-label"},r.createElement("div",{className:"control has-icons-left has-icons-right"},r.createElement("input",{type:"search",className:"input is-rounded nav-menu-margin",placeholder:"Search for channels..."}),r.createElement("span",{className:"icon is-small is-left"},r.createElement("i",{className:"fas fa-search"})))),m.map((function(e){return r.createElement(r.Fragment,null,r.createElement("p",{className:"menu-label"},e.title),r.createElement("ul",{className:"menu-list"},e.items.map((function(e){return r.createElement("li",null,r.createElement("a",{href:e.href},e.title))}))))})),r.createElement("p",{className:"menu-label"},"Channel Language"),r.createElement("ul",{className:"menu-list"},r.createElement("li",null,r.createElement(u,null))))}function d(){return r.createElement("div",null,r.createElement(s,null),r.createElement("section",{className:"section"},r.createElement("div",{className:"container"},r.createElement("div",{className:"columns"},r.createElement("div",{className:"column is-one-quarter"},r.createElement(h,null)),r.createElement("div",{className:"column"},r.createElement(i.HashRouter,null,r.createElement(i.Switch,null,r.createElement(i.Route,{exact:!0,path:"/"}))))))),r.createElement("footer",{className:"footer"},r.createElement("div",{className:"content has-text-centered"},r.createElement("p",null,r.createElement("a",{className:"has-text-grey-light",href:"/imprint"},"Imprint")," ","·"," ",r.createElement("a",{className:"has-text-grey-light",href:"/privacy-policy"},"Privacy Policy")," ","·"," ",r.createElement("a",{className:"has-text-grey-light",href:"https://github.com/sailingchannels"},r.createElement("i",{className:"fas fa-code"})," on GitHub")),r.createElement("p",null,r.createElement("img",{width:"80",className:"greyscale",src:"https://cdn.jsdelivr.net/gh/thomasbrueggemann/sailing-channels/public/img/logo.svg"})))))}var f,p=function(){return(p=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var l in t=arguments[n])Object.prototype.hasOwnProperty.call(t,l)&&(e[l]=t[l]);return e}).apply(this,arguments)};!function(e){e[e.SET_PAGE_TITLE=0]="SET_PAGE_TITLE",e[e.INIT=1]="INIT"}(f||(f={}));var b,v,E,g=(b={pageTitle:""},v=function(e,t){switch(t.type){case f.INIT:case f.SET_PAGE_TITLE:return p(p({},e),{pageTitle:t.pageTitle})}},{Context:E=Object(r.createContext)({state:b}),ContextProvider:function(e){var t=Object(r.useReducer)(v,b),n=t[0],a=t[1];return l.a.createElement(E.Provider,{value:{state:n,dispatch:a}},e.children)},ContextConsumer:E.Consumer});function y(){return r.createElement(i.BrowserRouter,null,r.createElement(g.ContextProvider,null,r.createElement(d,null)))}var w=n("./node_modules/apollo-client/bundle.umd.js"),x=n.n(w),N=n("./node_modules/@apollo/react-hooks/lib/react-hooks.cjs.js"),j=n("./node_modules/apollo-link-batch-http/lib/index.js"),_=n("./node_modules/apollo-cache-inmemory/lib/bundle.cjs.js"),T=n("./node_modules/apollo-cache-persist/bundle.umd.js"),P=function(e,t){var n,r,l,a,o={label:0,sent:function(){if(1&l[0])throw l[1];return l[1]},trys:[],ops:[]};return a={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function c(a){return function(c){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,r&&(l=2&a[0]?r.return:a[0]?r.throw||((l=r.return)&&l.call(r),0):r.next)&&!(l=l.call(r,a[1])).done)return l;switch(r=0,l&&(a=[2&a[0],l.value]),a[0]){case 0:case 1:l=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,r=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(!(l=(l=o.trys).length>0&&l[l.length-1])&&(6===a[0]||2===a[0])){o=0;continue}if(3===a[0]&&(!l||a[1]>l[0]&&a[1]<l[3])){o.label=a[1];break}if(6===a[0]&&o.label<l[1]){o.label=l[1],l=a;break}if(l&&o.label<l[2]){o.label=l[2],o.ops.push(a);break}l[2]&&o.ops.pop(),o.trys.pop();continue}a=t.call(e,o)}catch(e){a=[6,e],r=0}finally{n=l=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,c])}}};(function(e,t,n,r){new(n||(n=Promise))((function(l,a){function o(e){try{i(r.next(e))}catch(e){a(e)}}function c(e){try{i(r.throw(e))}catch(e){a(e)}}function i(e){var t;e.done?l(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,c)}i((r=r.apply(e,t||[])).next())}))})(void 0,void 0,void 0,(function(){var e,t,n,l;return P(this,(function(a){switch(a.label){case 0:return e=new j.BatchHttpLink({uri:"http://localhost:5004/api/v2/graphql",batchInterval:50}),t=new _.InMemoryCache,[4,Object(T.persistCache)({cache:t,storage:window.localStorage,debug:!0})];case 1:return a.sent(),n=new x.a({link:e,cache:t}),l=document.getElementById("root"),i=y,o.a.render(r.createElement(c.AppContainer,null,r.createElement(N.ApolloProvider,{client:n},r.createElement(i,null))),l),[2]}var i}))}))},0:function(e,t,n){e.exports=n("./src/index.tsx")}});