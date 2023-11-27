import{S as l}from"./sweetalert2.all-4769e499.js";import{_ as x,e as m,h as i,o as c,c as v,w as y,a as u,g as e,t as b,f as p,E as I,F as N}from"./index-49d02188.js";import{L as B}from"./LayoutGuest-0882ec48.js";import{B as D}from"./bg-2-71df06d0.js";import{N as k}from"./Navbar-24da8cb3.js";import{I as w}from"./Input-4f5d480d.js";import{C}from"./Carousel-9030e3f1.js";import"./logo COP28-c10641a4.js";const P={data(){return{BackgroundImage:D,apiDomain:"https://carbon.koersi.id",guestId:"",firstName:"",lastName:"",code:"",email:"",phoneNumber:"",postcardId:"",dataPostcard:[],amount:0,step:1}},components:{LayoutGuest:B,InputDynamic:w,Carousel:C,NavBar:k},methods:{redirectToFormUser(){const s=localStorage.getItem("dataUser");if(!s)this.$router.push("/form-user");else{const t=JSON.parse(s).data;this.guestId=t.id,this.firstName=t.first_name,this.lastName=t.last_name,this.email=t.email,this.phoneNumber="08",this.amount=0}},onPayment(){const s={};s.guest_id=this.guestId,s.postcard_id=this.dataPostcard[0].id,s.currency="IDR",m.post(`${this.apiDomain}/api/v1/donations`,s).then(t=>{const a=t.data.data;l.fire({icon:"success",title:"Success!",text:"Data has been saved successfully",confirmButtonColor:"#3085d6",confirmButtonText:"OK"}).then(d=>{d.isConfirmed&&(window.location.href=a)})}).catch(t=>{let a="An error occurred";t.message&&(a=t.message),l.fire({icon:"error",title:"Error!",text:a})})},onSearch(s){s?m.get(`${this.apiDomain}/api/v1/postcards?code=${s}`).then(t=>{console.log(t),this.dataPostcard=t.data.data}):this.dataPostcard=[]}},created(){this.redirectToFormUser()}},S=["src"],L={class:"flex justify-center mb-4 mt-[25%] md:mt-[7%]"},U={class:"bg-white text-left p-10 z-10 rounded-lg bg-opacity-70 backdrop-blur-2xl w-[80%]"},F={class:"grid grid-cols-1 md:grid-cols-5 gap-4"},T={class:"col-span-1 md:col-span-3"},E={class:"flex items-center"},G={class:"header text-left"},V={class:"text-2xl font-bold text-[#2e2e2e]"},j=e("p",{class:"text-sm text-[#2e2e2e] mt-1"},"Thank you for helping us by donating, whatever your donation is, it means a lot to us.",-1),O={class:"mt-4"},$={class:"col-span-1 md:col-span-2"},q=["src"];function z(s,t,a,d,r,n){const h=i("NavBar"),f=i("InputDynamic"),_=i("LayoutGuest");return c(),v(_,null,{default:y(()=>[u(h),e("img",{src:r.BackgroundImage,class:"fixed w-screen h-screen top-0 left-0 w-full h-full object-cover",alt:""},null,8,S),e("div",L,[e("div",U,[e("div",F,[e("div",T,[e("div",E,[e("div",G,[e("h1",V,"Hello, "+b(this.firstName+" "+this.lastName),1),j])]),e("div",O,[u(f,{label:"Postcard Code",value:r.code,inputId:"codeInput",type:"text",required:!0,onValueUpdated:t[0]||(t[0]=o=>n.onSearch(o))},null,8,["value"])]),e("button",{class:"bg-[#476b6b] mt-4 text-white px-8 py-2 rounded-md font-medium hover:bg-[#223d3d] transition duration-300 ease-in-out",onClick:t[1]||(t[1]=(...o)=>n.onPayment&&n.onPayment(...o))}," Donation ")]),e("div",$,[(c(!0),p(N,null,I(r.dataPostcard,(o,g)=>(c(),p("div",{key:g},[e("img",{class:"rounded-lg",src:o.file_carbon_path,alt:"Carousel Image"},null,8,q)]))),128))])])])])]),_:1})}const X=x(P,[["render",z]]);export{X as default};
