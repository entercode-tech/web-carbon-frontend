import{B as y,C as N,k,o as h,c as v,w as a,a as e,g as t,G as p,t as q,d as i,r as w,b as V}from"./index-49d02188.js";import{j as U,_ as u,m as x,e as j,i as C,a as P,k as $}from"./FormControl-7a35efc7.js";import{d as R,a as B,c as M,_ as A}from"./LayoutAuthenticated-7afe9e55.js";import{_ as f,b as d,a as g}from"./BaseButtons-8148b218.js";import{a as F,_ as n}from"./FormField-fc7cf079.js";import{_ as G}from"./FormFilePicker-417429e8.js";import{_ as Y}from"./BaseLevel-1e99942a.js";import{_ as D}from"./PillTag-1dcacdd1.js";import{_ as E}from"./SectionTitleLineWithButton-81457cfe.js";import"./BaseIcon-c01bd735.js";import"./logo COP28-c10641a4.js";const H={class:"space-y-3 text-center md:text-left lg:mx-12"},O={class:"flex justify-center md:block"},T={class:"text-2xl"},L=t("p",null,[p("Last login "),t("b",null,"12 mins ago"),p(" from "),t("b",null,"127.0.0.1")],-1),z={class:"flex justify-center md:block"},I={__name:"UserCard",setup(S){const m=y(),r=N(()=>m.userName),s=k(!1);return(_,c)=>(h(),v(f,null,{default:a(()=>[e(Y,{type:"justify-around lg:justify-center"},{default:a(()=>[e(R,{class:"lg:mx-12"}),t("div",H,[t("div",O,[e(F,{modelValue:s.value,"onUpdate:modelValue":c[0]||(c[0]=b=>s.value=b),name:"notifications-switch",type:"switch",label:"Notifications","input-value":!0},null,8,["modelValue"])]),t("h1",T,[p(" Howdy, "),t("b",null,q(r.value),1),p("! ")]),L,t("div",z,[e(D,{label:"Verified",color:"info",icon:i(U)},null,8,["icon"])])])]),_:1})]),_:1}))}},J={class:"grid grid-cols-1 lg:grid-cols-2 gap-6"},ie={__name:"ProfileView",setup(S){const m=y(),r=w({name:m.userName,email:m.userEmail}),s=w({password_current:"",password:"",password_confirmation:""}),_=()=>{m.setUser(r)},c=()=>{};return(b,o)=>(h(),v(B,null,{default:a(()=>[e(A,null,{default:a(()=>[e(E,{icon:i(x),title:"Profile",main:""},{default:a(()=>[e(d,{href:"https://github.com/justboil/admin-one-vue-tailwind",target:"_blank",icon:i(j),label:"Star on GitHub",color:"contrast","rounded-full":"",small:""},null,8,["icon"])]),_:1},8,["icon"]),e(I,{class:"mb-6"}),t("div",J,[e(f,{"is-form":"",onSubmit:V(_,["prevent"])},{footer:a(()=>[e(g,null,{default:a(()=>[e(d,{color:"info",type:"submit",label:"Submit"}),e(d,{color:"info",label:"Options",outline:""})]),_:1})]),default:a(()=>[e(n,{label:"Avatar",help:"Max 500kb"},{default:a(()=>[e(G,{label:"Upload"})]),_:1}),e(n,{label:"Name",help:"Required. Your name"},{default:a(()=>[e(u,{modelValue:r.name,"onUpdate:modelValue":o[0]||(o[0]=l=>r.name=l),icon:i(x),name:"username",required:"",autocomplete:"username"},null,8,["modelValue","icon"])]),_:1}),e(n,{label:"E-mail",help:"Required. Your e-mail"},{default:a(()=>[e(u,{modelValue:r.email,"onUpdate:modelValue":o[1]||(o[1]=l=>r.email=l),icon:i(C),type:"email",name:"email",required:"",autocomplete:"email"},null,8,["modelValue","icon"])]),_:1})]),_:1},8,["onSubmit"]),e(f,{"is-form":"",onSubmit:V(c,["prevent"])},{footer:a(()=>[e(g,null,{default:a(()=>[e(d,{type:"submit",color:"info",label:"Submit"}),e(d,{color:"info",label:"Options",outline:""})]),_:1})]),default:a(()=>[e(n,{label:"Current password",help:"Required. Your current password"},{default:a(()=>[e(u,{modelValue:s.password_current,"onUpdate:modelValue":o[2]||(o[2]=l=>s.password_current=l),icon:i(P),name:"password_current",type:"password",required:"",autocomplete:"current-password"},null,8,["modelValue","icon"])]),_:1}),e(M),e(n,{label:"New password",help:"Required. New password"},{default:a(()=>[e(u,{modelValue:s.password,"onUpdate:modelValue":o[3]||(o[3]=l=>s.password=l),icon:i($),name:"password",type:"password",required:"",autocomplete:"new-password"},null,8,["modelValue","icon"])]),_:1}),e(n,{label:"Confirm password",help:"Required. New password one more time"},{default:a(()=>[e(u,{modelValue:s.password_confirmation,"onUpdate:modelValue":o[4]||(o[4]=l=>s.password_confirmation=l),icon:i($),name:"password_confirmation",type:"password",required:"",autocomplete:"new-password"},null,8,["modelValue","icon"])]),_:1})]),_:1},8,["onSubmit"])])]),_:1})]),_:1}))}};export{ie as default};
