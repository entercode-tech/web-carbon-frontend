import{w as r}from"./FormControl-7a35efc7.js";import{_ as s}from"./BaseIcon-c01bd735.js";import{b as u}from"./BaseButtons-8148b218.js";import{o as e,c as a,n,d as l,I as m,O as d,C as f,M as g,f as h,g as c,D as y,t as S,H as k}from"./index-49d02188.js";const x={__name:"IconRounded",props:{icon:{type:String,required:!0},color:{type:String,default:null},w:{type:String,default:"w-12"},h:{type:String,default:"h-12"},bg:Boolean},setup(t){return(i,o)=>(e(),a(s,{path:t.icon,w:t.w,h:t.h,size:"24",class:n(["rounded-full",t.bg?l(m)[t.color]:[l(d)[t.color],"bg-gray-50 dark:bg-slate-800"]])},null,8,["path","w","h","class"]))}},b={class:"flex items-center justify-start"},D={__name:"SectionTitleLineWithButton",props:{icon:{type:String,default:null},title:{type:String,required:!0},main:Boolean},setup(t){const i=f(()=>g().default);return(o,w)=>(e(),h("section",{class:n([{"pt-6":!t.main},"mb-6 flex items-center justify-between"])},[c("div",b,[t.icon&&t.main?(e(),a(x,{key:0,icon:t.icon,color:"light",class:"mr-3",bg:""},null,8,["icon"])):t.icon?(e(),a(s,{key:1,path:t.icon,class:"mr-2",size:"20"},null,8,["path"])):y("",!0),c("h1",{class:n([t.main?"text-3xl":"text-2xl","leading-tight"])},S(t.title),3)]),i.value?k(o.$slots,"default",{key:0}):(e(),a(u,{key:1,icon:l(r),color:"whiteDark"},null,8,["icon"]))],2))}};export{D as _};
