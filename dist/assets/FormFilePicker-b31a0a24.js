import{l as b}from"./FormControl-5e4331d1.js";import{b as g}from"./BaseButtons-4575ad8d.js";import{k as i,C as u,p as h,o as r,f as d,g as t,a as v,n as V,t as k,D as I}from"./index-913caa4c.js";const x={class:"flex items-stretch justify-start relative"},R={class:"inline-flex"},S=["accept"],w={key:0,class:"px-4 py-2 bg-gray-100 dark:bg-slate-800 border-gray-200 dark:border-slate-700 border rounded-r"},z={class:"text-ellipsis line-clamp-1"},C={__name:"FormFilePicker",props:{modelValue:{type:[Object,File,Array],default:null},label:{type:String,default:null},icon:{type:String,default:b},accept:{type:String,default:null},color:{type:String,default:"info"},isRoundIcon:Boolean},emits:["update:modelValue"],setup(e,{emit:f}){const a=e,m=f,n=i(null),o=i(a.modelValue),s=u(()=>!a.isRoundIcon&&o.value),p=u(()=>a.modelValue);h(p,l=>{o.value=l,l||(n.value.input.value=null)});const y=l=>{const c=l.target.files||l.dataTransfer.files;o.value=c[0],m("update:modelValue",o.value)};return(l,c)=>(r(),d("div",x,[t("label",R,[v(g,{as:"a",class:V({"w-12 h-12":e.isRoundIcon,"rounded-r-none":s.value}),"icon-size":e.isRoundIcon?24:void 0,label:e.isRoundIcon?null:e.label,icon:e.icon,color:e.color,"rounded-full":e.isRoundIcon},null,8,["class","icon-size","label","icon","color","rounded-full"]),t("input",{ref_key:"root",ref:n,type:"file",class:"absolute top-0 left-0 w-full h-full opacity-0 outline-none cursor-pointer -z-1",accept:e.accept,onInput:y},null,40,S)]),s.value?(r(),d("div",w,[t("span",z,k(o.value.name),1)])):I("",!0)]))}};export{C as _};