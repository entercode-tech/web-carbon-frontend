import{r as f,u as _,o as b,c as g,w as s,a,n as V,b as w,d as n,e as k}from"./index-49d02188.js";import{_ as m,m as $,a as y}from"./FormControl-7a35efc7.js";import{_ as h}from"./SectionFullScreen-a7e372df.js";import{_ as L,a as v,b as i}from"./BaseButtons-8148b218.js";import{_ as u,a as x}from"./FormField-fc7cf079.js";import{L as P}from"./LayoutGuest-0882ec48.js";import"./BaseIcon-c01bd735.js";const E={__name:"LoginView",setup(B){const o=f({login:"",pass:"",remember:!0}),p=_(),d="https://carbon.koersi.id",c=()=>{const t={};t.email=o.login,t.password=o.pass,k.post(`${d}/api/v1/admin/login`,t).then(e=>{const r=e.data.data.access_token;localStorage.setItem("access_token",r),p.push("/dashboard")}).catch(e=>{console.error("Error:",e)})};return(t,e)=>(b(),g(P,null,{default:s(()=>[a(h,{bg:"purplePink"},{default:s(({cardClass:r})=>[a(L,{class:V(r),"is-form":"",onSubmit:w(c,["prevent"])},{footer:s(()=>[a(v,null,{default:s(()=>[a(i,{type:"submit",color:"info",label:"Login"}),a(i,{to:"/dashboard",color:"info",outline:"",label:"Back"})]),_:1})]),default:s(()=>[a(u,{label:"Login",help:"Please enter your login"},{default:s(()=>[a(m,{modelValue:o.login,"onUpdate:modelValue":e[0]||(e[0]=l=>o.login=l),icon:n($),name:"login",autocomplete:"username"},null,8,["modelValue","icon"])]),_:1}),a(u,{label:"Password",help:"Please enter your password"},{default:s(()=>[a(m,{modelValue:o.pass,"onUpdate:modelValue":e[1]||(e[1]=l=>o.pass=l),icon:n(y),type:"password",name:"password",autocomplete:"current-password"},null,8,["modelValue","icon"])]),_:1}),a(x,{modelValue:o.remember,"onUpdate:modelValue":e[2]||(e[2]=l=>o.remember=l),name:"remember",label:"Remember","input-value":!0},null,8,["modelValue"])]),_:2},1032,["class","onSubmit"])]),_:1})]),_:1}))}};export{E as default};
