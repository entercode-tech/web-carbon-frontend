import{_ as h,e as m,h as c,o as n,c as p,w as l,a as f,g as t,f as i,E as x,F as U,t as e}from"./index-49d02188.js";import{_ as g,a as y}from"./LayoutAuthenticated-7afe9e55.js";import"./FormControl-7a35efc7.js";import"./BaseIcon-c01bd735.js";import"./logo COP28-c10641a4.js";const b={data(){return{apiDomain:"https://carbon.koersi.id",dataUser:[]}},components:{SectionMain:g,LayoutAuthenticated:y},created(){this.fetchUserData()},methods:{async fetchUserData(){try{const a=localStorage.getItem("access_token"),s=await m.get(`${this.apiDomain}/api/v1/guests`,{headers:{Authorization:`Bearer ${a}`}});s.status===200?this.dataUser=s.data.data:console.error("Failed to fetch dataUser")}catch(a){console.error("An error occurred while fetching dataUser:",a)}}}},k=t("h1",{class:"text-xl md:text-3xl font-semibold"}," List User ",-1),L={class:"border-[1px] border-[#cccccc] rounded-md p-4 mt-6"},$={class:"table-auto"},A=t("thead",null,[t("tr",null,[t("th",null,"#"),t("th",null,"Full Name"),t("th",null,"Email"),t("th",null,"Location")])],-1);function B(a,s,D,S,d,w){const u=c("SectionMain"),_=c("LayoutAuthenticated");return n(),p(_,null,{default:l(()=>[f(u,null,{default:l(()=>[k,t("div",L,[t("table",$,[A,t("tbody",null,[(n(!0),i(U,null,x(d.dataUser,(o,r)=>(n(),i("tr",{key:r},[t("td",null,e(r+1),1),t("td",null,e(o.first_name)+" "+e(o.last_name),1),t("td",null,e(o.email),1),t("td",null,e(o.location),1)]))),128))])])])]),_:1})]),_:1})}const C=h(b,[["render",B]]);export{C as default};