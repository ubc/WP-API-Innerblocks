(()=>{"use strict";var e,t={688:(e,t,r)=>{const n=window.wp.blocks,o=window.wp.primitives;var a=r(848);const l=(0,a.jsx)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,a.jsx)(o.Path,{d:"m4 5.5h2v6.5h1.5v-6.5h2v-1.5h-5.5zm16 10.5h-16v-1.5h16zm-7 4h-9v-1.5h9z"})});var i=r(609);const s=window.wp.i18n,c=window.wp.components,p=window.wp.coreData,m=window.wp.date,u=window.wp.blockEditor,d=e=>(0,i.createElement)("div",{...(0,u.useBlockProps)(),style:{padding:"20px",background:"#c6c6c6",margin:"0.83em 0"}},e.children),f=(e,t)=>{const{timezone:r}=(0,m.getSettings)();return moment.utc(e).utcOffset(parseInt(r.offset)).format(v(t))},v=e=>{var t={d:"DD",D:"ddd",j:"D",l:"dddd",N:"E",S:"o",w:"e",z:"DDD",W:"W",F:"MMMM",m:"MM",M:"MMM",n:"M",t:"",L:"",o:"YYYY",Y:"YYYY",y:"YY",a:"a",A:"A",B:"",g:"h",G:"H",h:"hh",H:"HH",i:"mm",s:"ss",u:"SSS",e:"zz",I:"",O:"",P:"",T:"",Z:"",c:"",r:"",U:"X"};return e.replace(/[A-Za-z]+/g,(function(e){return t[e]||e}))};function h(e){var t,r,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(r=h(e[t]))&&(n&&(n+=" "),n+=r)}else for(r in e)e[r]&&(n&&(n+=" "),n+=r);return n}const g=function(){for(var e,t,r=0,n="",o=arguments.length;r<o;r++)(e=arguments[r])&&(t=h(e))&&(n&&(n+=" "),n+=t);return n},w=JSON.parse('{"UU":"ubc/api-datetime"}');(0,n.registerBlockType)(w.UU,{icon:l,edit:function({attributes:{dateType:e,textAlign:t,format:r,isLink:n},setAttributes:o,context:a}){if(!a.datetimes||0===a.datetimes.length)return(0,i.createElement)(d,null,'Block not supported, missing context "datetimes".');const{datetimes:l}=a;e&&""!==e||o({dateType:l[0].label});let v=l.filter((t=>t.label===e));if(0===v.length)return(0,i.createElement)(d,null,"Block error, please recreated the block.");v=v[0].value;const h=(0,u.useBlockProps)({className:g({[`has-text-align-${t}`]:t})}),w=(0,m.getSettings)(),[_=w.formats.date]=(0,p.useEntityProp)("root","site","date_format");let b=(0,i.createElement)("time",{dateTime:f(v,r||_)},f(v,r||_));return n&&v&&(b=(0,i.createElement)("a",{href:"#post-date-pseudo-link",onClick:e=>e.preventDefault()},b)),(0,i.createElement)(i.Fragment,null,(0,i.createElement)(u.BlockControls,{group:"block"},(0,i.createElement)(u.AlignmentControl,{value:t,onChange:e=>{o({textAlign:e})}})),(0,i.createElement)(u.InspectorControls,null,(0,i.createElement)(c.PanelBody,{title:(0,s.__)("Settings")},(0,i.createElement)(c.SelectControl,{label:"Date Type",value:e,options:a.datetimes.map((e=>({label:e.label,value:e.label}))),onChange:e=>{o({dateType:e})},__nextHasNoMarginBottom:!0}),(0,i.createElement)(u.__experimentalDateFormatPicker,{format:r,defaultFormat:_,onChange:e=>o({format:e})}),(0,i.createElement)(c.ToggleControl,{__nextHasNoMarginBottom:!0,label:(0,s.__)("Link to resource"),onChange:()=>o({isLink:!n}),checked:n}))),(0,i.createElement)("div",{...h},b))}})},20:(e,t,r)=>{var n=r(609),o=Symbol.for("react.element"),a=(Symbol.for("react.fragment"),Object.prototype.hasOwnProperty),l=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i={key:!0,ref:!0,__self:!0,__source:!0};t.jsx=function(e,t,r){var n,s={},c=null,p=null;for(n in void 0!==r&&(c=""+r),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(p=t.ref),t)a.call(t,n)&&!i.hasOwnProperty(n)&&(s[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===s[n]&&(s[n]=t[n]);return{$$typeof:o,type:e,key:c,ref:p,props:s,_owner:l.current}}},848:(e,t,r)=>{e.exports=r(20)},609:e=>{e.exports=window.React}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var a=r[e]={exports:{}};return t[e](a,a.exports,n),a.exports}n.m=t,e=[],n.O=(t,r,o,a)=>{if(!r){var l=1/0;for(p=0;p<e.length;p++){for(var[r,o,a]=e[p],i=!0,s=0;s<r.length;s++)(!1&a||l>=a)&&Object.keys(n.O).every((e=>n.O[e](r[s])))?r.splice(s--,1):(i=!1,a<l&&(l=a));if(i){e.splice(p--,1);var c=o();void 0!==c&&(t=c)}}return t}a=a||0;for(var p=e.length;p>0&&e[p-1][2]>a;p--)e[p]=e[p-1];e[p]=[r,o,a]},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={214:0,434:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var o,a,[l,i,s]=r,c=0;if(l.some((t=>0!==e[t]))){for(o in i)n.o(i,o)&&(n.m[o]=i[o]);if(s)var p=s(n)}for(t&&t(r);c<l.length;c++)a=l[c],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(p)},r=globalThis.webpackChunkubc_wp_api_inner_blocks=globalThis.webpackChunkubc_wp_api_inner_blocks||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var o=n.O(void 0,[434],(()=>n(688)));o=n.O(o)})();