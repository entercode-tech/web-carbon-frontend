import"./sweetalert2.all-570ed13e.js";import{L as i}from"./LayoutGuest-c36df982.js";import{B as l}from"./bg-2-6edf539e.js";import{N as m}from"./Navbar-8a92f9c8.js";import{I as u}from"./Input-c1a48c3a.js";import{R as d,T as p,C as f}from"./Carbon-19d7e916.js";import{_,h as e,o as h,c as x,w as g,a as o,g as t}from"./index-2f48ba4c.js";import"./logo COP28-37daee2c.js";const b={data(){return{BackgroundImage:l,listRadioButton:[{title:"One Trips",value:"One Trips"},{title:"Multiple Trips",value:"Multiple Trips"},{title:"Charter",value:"Charter"}]}},components:{LayoutGuest:i,NavBar:m,RadioDynamic:d,TextareaDynamic:p,InputDynamic:u,CarbonSection:f},methods:{redirectToFormUser(){localStorage.getItem("dataUser")||this.$router.push("/form-user")}},created(){this.redirectToFormUser()}},v=["src"],B={class:"flex justify-center mb-4 mt-[25%] md:mt-[7%]"},C={class:"resp-box bg-white text-center p-10 z-10 rounded-lg bg-opacity-70 backdrop-blur-2xl w-[80%]"},y=t("div",{class:"flex items-center"},[t("div",{class:"bg-[#163331] p-2 rounded-full mr-4"},[t("img",{src:"https://sustainabletravel.org/wp-content/plugins/sti_client/public/assets/images/calculator.svg",alt:""})]),t("div",{class:"header text-left"},[t("h1",{class:"text-md md:text-2xl font-bold text-[#2e2e2e]"},"Calculate Your Travel Carbon Footprint"),t("p",{class:"text-xs md:text-sm text-[#2e2e2e] mt-1"},"Use our carbon footprint calculator to calculate your travel emissions and purchase carbon offsets. ")])],-1),T={class:"content mt-10"};function w(s,k,I,N,a,U){const r=e("NavBar"),c=e("CarbonSection"),n=e("LayoutGuest");return h(),x(n,null,{default:g(()=>[o(r),t("img",{src:a.BackgroundImage,class:"fixed w-screen h-screen top-0 left-0 w-full h-full object-cover",alt:""},null,8,v),t("div",B,[t("div",C,[y,t("div",T,[o(c)])])])]),_:1})}const M=_(b,[["render",w]]);export{M as default};
