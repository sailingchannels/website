!function(e){function t(t){for(var r,a,u=t[0],c=t[1],i=t[2],d=0,p=[];d<u.length;d++)a=u[d],o[a]&&p.push(o[a][0]),o[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);for(s&&s(t);p.length;)p.shift()();return l.push.apply(l,i||[]),n()}function n(){for(var e,t=0;t<l.length;t++){for(var n=l[t],r=!0,u=1;u<n.length;u++){var c=n[u];0!==o[c]&&(r=!1)}r&&(l.splice(t--,1),e=a(a.s=n[0]))}return e}var r={},o={0:0},l=[];function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="./";var u=window.webpackJsonp=window.webpackJsonp||[],c=u.push.bind(u);u.push=t,u=u.slice();for(var i=0;i<u.length;i++)t(u[i]);var s=c;l.push([0,1]),n()}({"./src/index.tsx":function(e,t,n){"use strict";n.r(t);var r=n("./node_modules/react/index.js"),o=n.n(r),l=n("./node_modules/react-dom/index.js"),a=n.n(l),u=n("./node_modules/react-hot-loader/index.js"),c=n("./node_modules/react-router-dom/index.js");function i(){return r.createElement("div",null)}var s,d=function(){return(d=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};!function(e){e[e.SET_PAGE_TITLE=0]="SET_PAGE_TITLE",e[e.INIT=1]="INIT"}(s||(s={}));var p,f,h,b=(p={pageTitle:""},f=function(e,t){switch(t.type){case s.INIT:case s.SET_PAGE_TITLE:return d(d({},e),{pageTitle:t.pageTitle})}},{Context:h=Object(r.createContext)({state:p}),ContextProvider:function(e){var t=Object(r.useReducer)(f,p),n=t[0],l=t[1];return o.a.createElement(h.Provider,{value:{state:n,dispatch:l}},e.children)},ContextConsumer:h.Consumer});function v(){return r.createElement(c.BrowserRouter,null,r.createElement(b.ContextProvider,null,r.createElement(i,null)))}var m=n("./node_modules/apollo-client/bundle.umd.js"),y=n.n(m),w=n("./node_modules/@apollo/react-hooks/lib/react-hooks.cjs.js"),x=n("./node_modules/apollo-link-batch-http/lib/index.js"),g=n("./node_modules/apollo-cache-inmemory/lib/bundle.cjs.js"),j=n("./node_modules/apollo-cache-persist/bundle.umd.js"),_=function(e,t){var n,r,o,l,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return l={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(l[Symbol.iterator]=function(){return this}),l;function u(l){return function(u){return function(l){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&l[0]?r.return:l[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,l[1])).done)return o;switch(r=0,o&&(l=[2&l[0],o.value]),l[0]){case 0:case 1:o=l;break;case 4:return a.label++,{value:l[1],done:!1};case 5:a.label++,r=l[1],l=[0];continue;case 7:l=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===l[0]||2===l[0])){a=0;continue}if(3===l[0]&&(!o||l[1]>o[0]&&l[1]<o[3])){a.label=l[1];break}if(6===l[0]&&a.label<o[1]){a.label=o[1],o=l;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(l);break}o[2]&&a.ops.pop(),a.trys.pop();continue}l=t.call(e,a)}catch(e){l=[6,e],r=0}finally{n=o=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}([l,u])}}};(function(e,t,n,r){new(n||(n=Promise))((function(o,l){function a(e){try{c(r.next(e))}catch(e){l(e)}}function u(e){try{c(r.throw(e))}catch(e){l(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,u)}c((r=r.apply(e,t||[])).next())}))})(void 0,void 0,void 0,(function(){var e,t,n,o;return _(this,(function(l){switch(l.label){case 0:return e=new x.BatchHttpLink({uri:"http://localhost:5004/api/v2/graphql",batchInterval:50}),t=new g.InMemoryCache,[4,Object(j.persistCache)({cache:t,storage:window.localStorage,debug:!0})];case 1:return l.sent(),n=new y.a({link:e,cache:t}),o=document.getElementById("root"),c=v,a.a.render(r.createElement(u.AppContainer,null,r.createElement(w.ApolloProvider,{client:n},r.createElement(c,null))),o),[2]}var c}))}))},0:function(e,t,n){e.exports=n("./src/index.tsx")}});