import{e as r,h as d,o as h,c as F,w as f,a as c,g as e,f as _,E as S,F as C,t as m}from"./index-9befcfb3.js";import{S as u}from"./sweetalert2.all-aa963bce.js";import{_ as k,a as D}from"./LayoutAuthenticated-136686c8.js";import{I as E}from"./Input-f6986d77.js";import{M as v}from"./Modal-03315fab.js";import{_ as B}from"./_plugin-vue_export-helper-c27b6911.js";import"./FormControl-22a686c3.js";import"./BaseIcon-e3af5ae0.js";import"./logo COP28-c10641a4.js";/* empty css                                                              */const I={data(){return{apiDomain:"https://carbon.koersi.id",title:"",titleEdit:"",fileEdit:null,modalShow:!1,file:null,fileList:[],setFile:null}},components:{SectionMain:k,ModalPopup:v,InputDynamic:E,LayoutAuthenticated:D},created(){this.fetchFileData()},methods:{async onSubmit(){try{let t=document.querySelector(".in-load");t.innerHTML='Submit <i class="ml-2 fa-solid fa-circle-notch load"></i>';const o=new FormData;o.append("name",this.title),o.append("file",this.file);const a=localStorage.getItem("access_token");(await r.post(`${this.apiDomain}/api/v1/included-files`,o,{headers:{Authorization:`Bearer ${a}`}})).status===200?(await this.fetchFileData(),t.innerHTML="Submit",u.fire({icon:"success",title:"Success!",text:"Data has been saved successfully",confirmButtonColor:"#3085d6",confirmButtonText:"OK"}).then(n=>{n.isConfirmed&&(this.title="",this.file=null)})):(t.innerHTML="Submit",console.error("Failed to upload the file"))}catch(t){console.error("An error occurred while uploading the file:",t)}},async fetchFileData(){try{const t=localStorage.getItem("access_token"),o=await r.get(`${this.apiDomain}/api/v1/included-files`,{headers:{Authorization:`Bearer ${t}`}});o.status===200?this.fileList=o.data.data:console.error("Failed to fetch dataUser")}catch(t){console.error("An error occurred while fetching dataUser:",t)}},async onEdit(){try{const t=new FormData;t.append("name",this.titleEdit),this.fileEdit&&t.append("file",this.fileEdit);const o=localStorage.getItem("access_token");(await r.post(`${this.apiDomain}/api/v1/included-files/${this.setFile.id}?_method=PUT`,t,{headers:{Authorization:`Bearer ${o}`}})).status===200?(this.openModal(),await this.fetchFileData(),u.fire({icon:"success",title:"Success!",text:"Data has been saved successfully",confirmButtonColor:"#3085d6",confirmButtonText:"OK"}).then(s=>{s.isConfirmed&&(this.titleEdit="",this.fileEdit=null)})):console.error("Failed to upload the file")}catch(t){console.error("An error occurred while uploading the file:",t)}},async deleteFile(t){u.fire({icon:"warning",title:"Delete Confirmation",text:"Are you sure you want to delete this data?",showCancelButton:!0,confirmButtonColor:"#d33",confirmButtonText:"Yes, delete it",cancelButtonText:"No, cancel"}).then(async o=>{if(o.isConfirmed){const a=localStorage.getItem("access_token");try{(await r.delete(`${this.apiDomain}/api/v1/included-files/${t.id}`,{headers:{Authorization:`Bearer ${a}`}})).status===200?(await this.fetchFileData(),u.fire({icon:"success",title:"Success!",text:"Data has been deleted successfully",confirmButtonColor:"#3085d6",confirmButtonText:"OK"})):console.error("Failed to delete the file")}catch(s){console.error("An error occurred while deleting the file:",s)}}})},onFileChange(t){this.file=t.target.files[0]},onFileChangeEdit(t){this.fileEdit=t.target.files[0]},selectedFile(t){this.modalShow=!this.modalShow,this.setFile=t,this.titleEdit=t.name},openModal(){this.modalShow=!this.modalShow}}},M=e("h1",{class:"text-xl md:text-3xl font-semibold"}," List File ",-1),A={class:"border-[1px] border-[#cccccc] rounded-md p-4 mt-6"},L={class:"grid grid-cols-1 md:grid-cols-3 gap-4"},T={class:"table-auto mt-4"},N=e("thead",null,[e("tr",null,[e("th",null,"#"),e("th",null,"File"),e("th",null,"Name"),e("th",null,"Action")])],-1),U=["href"],z={class:"flex"},P=["onClick"],V=["onClick"],H={class:"p-4"},K={class:"text-xl font-bold"},O=e("p",null,"Input your field.",-1),j={class:"mt-10"},q=["for"],Y=["for"],G={class:"flex mt-8 justify-end"};function J(t,o,a,s,n,l){const p=d("InputDynamic"),g=d("SectionMain"),y=d("ModalPopup"),w=d("LayoutAuthenticated");return h(),F(w,null,{default:f(()=>[c(g,null,{default:f(()=>[M,e("div",A,[e("div",L,[c(p,{placeholder:"Masukan Nama File",value:n.title,inputId:"namaBelakangInput",type:"text",onValueUpdated:o[0]||(o[0]=i=>n.title=i)},null,8,["value"]),e("input",{type:"file",name:"file",id:"file",class:"border-[1px] mt-2 border-[#cccccc] w-full bg-white bg-opacity-50 rounded-md",onChange:o[1]||(o[1]=(...i)=>l.onFileChange&&l.onFileChange(...i))},null,32),e("button",{class:"in-load bg-[#476b6b] text-white px-8 mt-2 rounded-md font-medium hover:bg-[#223d3d] transition duration-300 ease-in-out",onClick:o[2]||(o[2]=(...i)=>l.onSubmit&&l.onSubmit(...i))}," Submit ")]),e("table",T,[N,e("tbody",null,[(h(!0),_(C,null,S(n.fileList,(i,b)=>(h(),_("tr",{key:b},[e("td",null,m(b+1),1),e("td",null,[e("a",{href:i.file_path,style:{crusor:"pointer"},class:"bg-[#476b6b] text-white px-4 py-2 rounded-md",target:"_blank"},"Lihat",8,U)]),e("td",null,m(i.name),1),e("td",null,[e("div",z,[e("button",{onClick:x=>l.selectedFile(i),class:"bg-[#ffbb3e] text-white px-4 py-2 rounded-md mr-2"}," Edit ",8,P),e("button",{onClick:x=>l.deleteFile(i),class:"bg-[#ff5555] text-white px-4 py-2 rounded-md mr-2"}," Delete ",8,V)])])]))),128))])])])]),_:1}),c(y,{show:n.modalShow},{default:f(()=>[e("div",H,[e("h2",K,'Edit File "'+m(n.setFile.name)+'"',1),O,e("div",j,[e("label",{for:t.inputId,class:"mb-2"}," Title: ",8,q),c(p,{class:"mb-2",value:n.titleEdit,inputId:"namaBelakangInput",type:"text",onValueUpdated:o[3]||(o[3]=i=>n.titleEdit=i)},null,8,["value"]),e("label",{for:t.inputId}," File: ",8,Y),e("input",{type:"file",name:"file",id:"file",class:"border-[1px] mt-2 border-[#cccccc] w-full bg-white bg-opacity-50 rounded-md",onChange:o[4]||(o[4]=(...i)=>l.onFileChangeEdit&&l.onFileChangeEdit(...i))},null,32)]),e("div",G,[e("button",{onClick:o[5]||(o[5]=(...i)=>l.openModal&&l.openModal(...i)),class:"bg-red-500 text-white px-4 py-2 mr-3 rounded"},"Close"),e("button",{onClick:o[6]||(o[6]=(...i)=>l.onEdit&&l.onEdit(...i)),class:"bg-[#476b6b] text-white px-4 py-2 rounded"},"Submit")])])]),_:1},8,["show"])]),_:1})}const le=B(I,[["render",J]]);export{le as default};
