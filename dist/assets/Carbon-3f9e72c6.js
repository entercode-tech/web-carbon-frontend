import"./sweetalert2.all-0a01f69a.js";import{L as i}from"./LayoutGuest-2e106288.js";import{B as l}from"./bg-2-71df06d0.js";import{N as m}from"./Navbar-0ece169a.js";import{I as u}from"./Input-3829e9d8.js";import{R as d,T as p,C as f}from"./Carbon-5f6af020.js";import{_}from"./_plugin-vue_export-helper-c27b6911.js";import{h as e,o as h,c as x,w as g,a as o,g as t}from"./index-ca22cfac.js";import"./logo COP28-c10641a4.js";const b={data(){return{BackgroundImage:l,listRadioButton:[{title:"One Trips",value:"One Trips"},{title:"Multiple Trips",value:"Multiple Trips"},{title:"Charter",value:"Charter"}]}},components:{LayoutGuest:i,NavBar:m,RadioDynamic:d,TextareaDynamic:p,InputDynamic:u,CarbonSection:f},methods:{redirectToFormUser(){localStorage.getItem("dataUser")||this.$router.push("/form-user")}},created(){this.redirectToFormUser()}},v=["src"],B={class:"flex justify-center mb-4 mt-[25%] md:mt-[7%]"},C={class:"resp-box bg-white text-center p-10 z-10 rounded-lg bg-opacity-70 backdrop-blur-2xl w-[80%]"},y=t("div",{class:"flex items-center"},[t("div",{class:"bg-[#163331] p-2 rounded-full mr-4"},[t("img",{src:"https://sustainabletravel.org/wp-content/plugins/sti_client/public/assets/images/calculator.svg",alt:""})]),t("div",{class:"header text-left"},[t("h1",{class:"text-md md:text-2xl font-bold text-[#2e2e2e]"},"Calculate Your Travel Carbon Footprint"),t("p",{class:"text-xs md:text-sm text-[#2e2e2e] mt-1"},"Use our carbon footprint calculator to calculate your travel emissions and purchase carbon offsets. ")])],-1),T={class:"content mt-10"};function w(s,k,I,N,a,U){const r=e("NavBar"),c=e("CarbonSection"),n=e("LayoutGuest");return h(),x(n,null,{default:g(()=>[o(r),t("img",{src:a.BackgroundImage,class:"fixed w-screen h-screen top-0 left-0 w-full h-full object-cover",alt:""},null,8,v),t("div",B,[t("div",C,[y,t("div",T,[o(c)])])])]),_:1})}const O=_(b,[["render",w]]);export{O as default};
