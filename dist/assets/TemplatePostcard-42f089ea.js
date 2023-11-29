import{e as r,h as c,o as m,c as F,w as h,a as d,g as t,f as g,E as S,F as C,t as p}from"./index-913caa4c.js";import{S as u}from"./sweetalert2.all-0a01f69a.js";import{_ as k,a as D}from"./LayoutAuthenticated-ddee1220.js";import{I as E}from"./Input-c694a5e4.js";import{M as v}from"./Modal-4541377c.js";import{_ as B}from"./_plugin-vue_export-helper-c27b6911.js";import"./FormControl-5e4331d1.js";import"./BaseIcon-a7c14867.js";import"./logo COP28-c10641a4.js";/* empty css                                                              */const I={data(){return{apiDomain:"https://carbon.koersi.id",title:"",titleEdit:"",fileEdit:null,modalShow:!1,file:null,fileList:[],setFile:null}},components:{SectionMain:k,ModalPopup:v,InputDynamic:E,LayoutAuthenticated:D},created(){this.fetchFileData()},methods:{async onSubmit(){try{let e=document.querySelector(".in-load");e.innerHTML='Submit <i class="ml-2 fa-solid fa-circle-notch load"></i>';const o=new FormData;o.append("name",this.title),o.append("image",this.file);const a=localStorage.getItem("access_token");(await r.post(`${this.apiDomain}/api/v1/postcard-templates`,o,{headers:{Authorization:`Bearer ${a}`}})).status===200?(await this.fetchFileData(),e.innerHTML="Submit",u.fire({icon:"success",title:"Success!",text:"Data has been saved successfully",confirmButtonColor:"#3085d6",confirmButtonText:"OK"}).then(n=>{n.isConfirmed&&(this.title="",this.file=null)})):(e.innerHTML="Submit",console.error("Failed to upload the file"))}catch(e){console.error("An error occurred while uploading the file:",e)}},async fetchFileData(){try{const e=localStorage.getItem("access_token"),o=await r.get(`${this.apiDomain}/api/v1/postcard-templates`,{headers:{Authorization:`Bearer ${e}`}});o.status===200?this.fileList=o.data.data:console.error("Failed to fetch dataUser")}catch(e){console.error("An error occurred while fetching dataUser:",e)}},async onEdit(){try{const e=new FormData;e.append("name",this.titleEdit),this.fileEdit&&e.append("image",this.fileEdit);const o=localStorage.getItem("access_token");(await r.post(`${this.apiDomain}/api/v1/postcard-templates/${this.setFile.id}?_method=PUT`,e,{headers:{Authorization:`Bearer ${o}`}})).status===200?(this.openModal(),await this.fetchFileData(),u.fire({icon:"success",title:"Success!",text:"Data has been saved successfully",confirmButtonColor:"#3085d6",confirmButtonText:"OK"}).then(s=>{s.isConfirmed&&(this.titleEdit="",this.fileEdit=null)})):console.error("Failed to upload the file")}catch(e){console.error("An error occurred while uploading the file:",e)}},async deleteFile(e){u.fire({icon:"warning",title:"Delete Confirmation",text:"Are you sure you want to delete this data?",showCancelButton:!0,confirmButtonColor:"#d33",confirmButtonText:"Yes, delete it",cancelButtonText:"No, cancel"}).then(async o=>{if(o.isConfirmed){const a=localStorage.getItem("access_token");try{(await r.delete(`${this.apiDomain}/api/v1/postcard-templates/${e.id}`,{headers:{Authorization:`Bearer ${a}`}})).status===200?(await this.fetchFileData(),u.fire({icon:"success",title:"Success!",text:"Data has been deleted successfully",confirmButtonColor:"#3085d6",confirmButtonText:"OK"})):console.error("Failed to delete the file")}catch(s){console.error("An error occurred while deleting the file:",s)}}})},onFileChange(e){this.file=e.target.files[0]},onFileChangeEdit(e){this.fileEdit=e.target.files[0]},selectedFile(e){this.modalShow=!this.modalShow,this.setFile=e,this.titleEdit=e.name},openModal(){this.modalShow=!this.modalShow}}},M=t("h1",{class:"text-xl md:text-3xl font-semibold"}," List File ",-1),A={class:"border-[1px] border-[#cccccc] rounded-md p-4 mt-6"},T={class:"grid grid-cols-1 md:grid-cols-3 gap-4"},L={class:"table-auto mt-4"},N=t("thead",null,[t("tr",null,[t("th",null,"#"),t("th",null,"File"),t("th",null,"Name"),t("th",null,"Action")])],-1),P=["src"],U={class:"flex"},z=["onClick"],V=["onClick"],H={class:"p-4"},K={class:"text-xl font-bold"},O=t("p",null,"Input your field.",-1),j={class:"mt-10"},q=["for"],Y=["for"],G={class:"flex mt-8 justify-end"};function J(e,o,a,s,n,l){const f=c("InputDynamic"),_=c("SectionMain"),y=c("ModalPopup"),w=c("LayoutAuthenticated");return m(),F(w,null,{default:h(()=>[d(_,null,{default:h(()=>[M,t("div",A,[t("div",T,[d(f,{placeholder:"Masukan Nama Template",value:n.title,inputId:"namaBelakangInput",type:"text",onValueUpdated:o[0]||(o[0]=i=>n.title=i)},null,8,["value"]),t("input",{type:"file",name:"file",id:"file",class:"border-[1px] mt-2 border-[#cccccc] w-full bg-white bg-opacity-50 rounded-md",onChange:o[1]||(o[1]=(...i)=>l.onFileChange&&l.onFileChange(...i))},null,32),t("button",{class:"in-load bg-[#476b6b] text-white px-8 mt-2 rounded-md font-medium hover:bg-[#223d3d] transition duration-300 ease-in-out",onClick:o[2]||(o[2]=(...i)=>l.onSubmit&&l.onSubmit(...i))}," Submit ")]),t("table",L,[N,t("tbody",null,[(m(!0),g(C,null,S(n.fileList,(i,b)=>(m(),g("tr",{key:b},[t("td",null,p(b+1),1),t("td",null,[t("img",{src:i.image_path,style:{height:"45px"}},null,8,P)]),t("td",null,p(i.name),1),t("td",null,[t("div",U,[t("button",{onClick:x=>l.selectedFile(i),class:"bg-[#ffbb3e] text-white px-4 py-2 rounded-md mr-2"}," Edit ",8,z),t("button",{onClick:x=>l.deleteFile(i),class:"bg-[#ff5555] text-white px-4 py-2 rounded-md mr-2"}," Delete ",8,V)])])]))),128))])])])]),_:1}),d(y,{show:n.modalShow},{default:h(()=>[t("div",H,[t("h2",K,'Edit File "'+p(n.setFile.name)+'"',1),O,t("div",j,[t("label",{for:e.inputId,class:"mb-2"}," Title: ",8,q),d(f,{class:"mb-2",value:n.titleEdit,inputId:"namaBelakangInput",type:"text",onValueUpdated:o[3]||(o[3]=i=>n.titleEdit=i)},null,8,["value"]),t("label",{for:e.inputId}," File: ",8,Y),t("input",{type:"file",name:"file",id:"file",class:"border-[1px] mt-2 border-[#cccccc] w-full bg-white bg-opacity-50 rounded-md",onChange:o[4]||(o[4]=(...i)=>l.onFileChangeEdit&&l.onFileChangeEdit(...i))},null,32)]),t("div",G,[t("button",{onClick:o[5]||(o[5]=(...i)=>l.openModal&&l.openModal(...i)),class:"bg-red-500 text-white px-4 py-2 mr-3 rounded"},"Close"),t("button",{onClick:o[6]||(o[6]=(...i)=>l.onEdit&&l.onEdit(...i)),class:"bg-[#476b6b] text-white px-4 py-2 rounded"},"Submit")])])]),_:1},8,["show"])]),_:1})}const lt=B(I,[["render",J]]);export{lt as default};