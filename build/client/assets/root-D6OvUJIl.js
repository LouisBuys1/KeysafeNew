import{o as f,p as d,q as y,t as x,r as i,_ as g,n as t,O as S,M as w,L as j,S as k}from"./components-CZq2W7LF.js";/**
 * @remix-run/react v2.16.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let a="positions";function M({getKey:e,...l}){let{isSpaMode:c}=f(),o=d(),p=y();x({getKey:e,storageKey:a});let u=i.useMemo(()=>{if(!e)return null;let s=e(o,p);return s!==o.key?s:null},[]);if(c)return null;let h=((s,m)=>{if(!window.history.state||!window.history.state.key){let r=Math.random().toString(32).slice(2);window.history.replaceState({key:r},"")}try{let n=JSON.parse(sessionStorage.getItem(s)||"{}")[m||window.history.state.key];typeof n=="number"&&window.scrollTo(0,n)}catch(r){console.error(r),sessionStorage.removeItem(s)}}).toString();return i.createElement("script",g({},l,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${h})(${JSON.stringify(a)}, ${JSON.stringify(u)})`}}))}const b=()=>[{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"}];function L({children:e}){return t.jsxs("html",{lang:"en",className:"h-full",children:[" ",t.jsxs("head",{children:[t.jsx("meta",{charSet:"utf-8"}),t.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),t.jsx(w,{}),t.jsx(j,{})]}),t.jsxs("body",{className:"h-full bg-brand-purple text-brand-text font-sans p-4 md:p-8 flex items-center justify-center",children:[e,t.jsx(M,{}),t.jsx(k,{})]})]})}function N(){return t.jsx(S,{})}export{L as Layout,N as default,b as links};
