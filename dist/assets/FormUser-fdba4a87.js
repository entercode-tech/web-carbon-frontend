import{i as A,Q as Z,S as E,k as v,T as N,C as oe,p as j,U as L,m as R,l as Y,o as C,f as P,g as d,H as re,V as ie,W as ae,_ as G,h as _,a as w,w as J,X as se,n as ne,G as le,t as O,e as ce,c as K}from"./index-2f48ba4c.js";import{S as q}from"./sweetalert2.all-570ed13e.js";import{L as de}from"./LayoutGuest-c36df982.js";import{N as ue}from"./Navbar-8a92f9c8.js";import{I as pe}from"./Input-c1a48c3a.js";import{R as he,T as me,C as ge}from"./Carbon-19d7e916.js";import{B as fe}from"./bg-2-6edf539e.js";import"./logo COP28-37daee2c.js";(function(){try{if(typeof document<"u"){var o=document.createElement("style");o.appendChild(document.createTextNode(".mapdiv[data-v-174b771e]{width:100%;height:100%}.info-window-wrapper[data-v-90174664]{display:none}.mapdiv .info-window-wrapper[data-v-90174664]{display:inline-block}.custom-marker-wrapper[data-v-2d2d343a]{display:none}.mapdiv .custom-marker-wrapper[data-v-2d2d343a]{display:inline-block}")),document.head.appendChild(o)}}catch(e){console.error("vite-plugin-css-injected-by-js",e)}})();var ye=Object.defineProperty,ve=(o,e,t)=>e in o?ye(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t,$=(o,e,t)=>(ve(o,typeof e!="symbol"?e+"":e,t),t);const W=Symbol("map"),X=Symbol("api"),be=Symbol("marker"),_e=Symbol("markerCluster"),U=Symbol("CustomMarker"),we=Symbol("mapTilesLoaded"),Q=["click","dblclick","drag","dragend","dragstart","mousedown","mousemove","mouseout","mouseover","mouseup","rightclick"];/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function ke(o,e,t,i){function r(a){return a instanceof t?a:new t(function(s){s(a)})}return new(t||(t=Promise))(function(a,s){function l(u){try{m(i.next(u))}catch(n){s(n)}}function p(u){try{m(i.throw(u))}catch(n){s(n)}}function m(u){u.done?a(u.value):r(u.value).then(l,p)}m((i=i.apply(o,e||[])).next())})}var Se=function o(e,t){if(e===t)return!0;if(e&&t&&typeof e=="object"&&typeof t=="object"){if(e.constructor!==t.constructor)return!1;var i,r,a;if(Array.isArray(e)){if(i=e.length,i!=t.length)return!1;for(r=i;r--!==0;)if(!o(e[r],t[r]))return!1;return!0}if(e.constructor===RegExp)return e.source===t.source&&e.flags===t.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===t.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===t.toString();if(a=Object.keys(e),i=a.length,i!==Object.keys(t).length)return!1;for(r=i;r--!==0;)if(!Object.prototype.hasOwnProperty.call(t,a[r]))return!1;for(r=i;r--!==0;){var s=a[r];if(!o(e[s],t[s]))return!1}return!0}return e!==e&&t!==t};const V="__googleMapsScriptId";var M;(function(o){o[o.INITIALIZED=0]="INITIALIZED",o[o.LOADING=1]="LOADING",o[o.SUCCESS=2]="SUCCESS",o[o.FAILURE=3]="FAILURE"})(M||(M={}));class S{constructor({apiKey:e,authReferrerPolicy:t,channel:i,client:r,id:a=V,language:s,libraries:l=[],mapIds:p,nonce:m,region:u,retries:n=3,url:h="https://maps.googleapis.com/maps/api/js",version:f}){if(this.callbacks=[],this.done=!1,this.loading=!1,this.errors=[],this.apiKey=e,this.authReferrerPolicy=t,this.channel=i,this.client=r,this.id=a||V,this.language=s,this.libraries=l,this.mapIds=p,this.nonce=m,this.region=u,this.retries=n,this.url=h,this.version=f,S.instance){if(!Se(this.options,S.instance.options))throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(S.instance.options)}`);return S.instance}S.instance=this}get options(){return{version:this.version,apiKey:this.apiKey,channel:this.channel,client:this.client,id:this.id,libraries:this.libraries,language:this.language,region:this.region,mapIds:this.mapIds,nonce:this.nonce,url:this.url,authReferrerPolicy:this.authReferrerPolicy}}get status(){return this.errors.length?M.FAILURE:this.done?M.SUCCESS:this.loading?M.LOADING:M.INITIALIZED}get failed(){return this.done&&!this.loading&&this.errors.length>=this.retries+1}createUrl(){let e=this.url;return e+="?callback=__googleMapsCallback",this.apiKey&&(e+=`&key=${this.apiKey}`),this.channel&&(e+=`&channel=${this.channel}`),this.client&&(e+=`&client=${this.client}`),this.libraries.length>0&&(e+=`&libraries=${this.libraries.join(",")}`),this.language&&(e+=`&language=${this.language}`),this.region&&(e+=`&region=${this.region}`),this.version&&(e+=`&v=${this.version}`),this.mapIds&&(e+=`&map_ids=${this.mapIds.join(",")}`),this.authReferrerPolicy&&(e+=`&auth_referrer_policy=${this.authReferrerPolicy}`),e}deleteScript(){const e=document.getElementById(this.id);e&&e.remove()}load(){return this.loadPromise()}loadPromise(){return new Promise((e,t)=>{this.loadCallback(i=>{i?t(i.error):e(window.google)})})}importLibrary(e){return this.execute(),google.maps.importLibrary(e)}loadCallback(e){this.callbacks.push(e),this.execute()}setScript(){var e,t;if(document.getElementById(this.id)){this.callback();return}const i={key:this.apiKey,channel:this.channel,client:this.client,libraries:this.libraries.length&&this.libraries,v:this.version,mapIds:this.mapIds,language:this.language,region:this.region,authReferrerPolicy:this.authReferrerPolicy};Object.keys(i).forEach(a=>!i[a]&&delete i[a]),!((t=(e=window==null?void 0:window.google)===null||e===void 0?void 0:e.maps)===null||t===void 0)&&t.importLibrary||(a=>{let s,l,p,m="The Google Maps JavaScript API",u="google",n="importLibrary",h="__ib__",f=document,c=window;c=c[u]||(c[u]={});const g=c.maps||(c.maps={}),y=new Set,b=new URLSearchParams,x=()=>s||(s=new Promise((k,I)=>ke(this,void 0,void 0,function*(){var T;yield l=f.createElement("script"),l.id=this.id,b.set("libraries",[...y]+"");for(p in a)b.set(p.replace(/[A-Z]/g,F=>"_"+F[0].toLowerCase()),a[p]);b.set("callback",u+".maps."+h),l.src=this.url+"?"+b,g[h]=k,l.onerror=()=>s=I(Error(m+" could not load.")),l.nonce=this.nonce||((T=f.querySelector("script[nonce]"))===null||T===void 0?void 0:T.nonce)||"",f.head.append(l)})));g[n]?console.warn(m+" only loads once. Ignoring:",a):g[n]=(k,...I)=>y.add(k)&&x().then(()=>g[n](k,...I))})(i);const r=this.libraries.map(a=>this.importLibrary(a));r.length||r.push(this.importLibrary("core")),Promise.all(r).then(()=>this.callback(),a=>{const s=new ErrorEvent("error",{error:a});this.loadErrorCallback(s)})}reset(){this.deleteScript(),this.done=!1,this.loading=!1,this.errors=[],this.onerrorEvent=null}resetIfRetryingFailed(){this.failed&&this.reset()}loadErrorCallback(e){if(this.errors.push(e),this.errors.length<=this.retries){const t=this.errors.length*Math.pow(2,this.errors.length);console.error(`Failed to load Google Maps script, retrying in ${t} ms.`),setTimeout(()=>{this.deleteScript(),this.setScript()},t)}else this.onerrorEvent=e,this.callback()}callback(){this.done=!0,this.loading=!1,this.callbacks.forEach(e=>{e(this.onerrorEvent)}),this.callbacks=[]}execute(){if(this.resetIfRetryingFailed(),this.done)this.callback();else{if(window.google&&window.google.maps&&window.google.maps.version){console.warn("Google Maps already loaded outside @googlemaps/js-api-loader.This may result in undesirable behavior as options and script parameters may not match."),this.callback();return}this.loading||(this.loading=!0,this.setScript())}}}function Ce(o){return class extends o.OverlayView{constructor(e){super(),$(this,"element"),$(this,"opts");const{element:t,...i}=e;this.element=t,this.opts=i,this.opts.map&&this.setMap(this.opts.map)}getPosition(){return this.opts.position?this.opts.position instanceof o.LatLng?this.opts.position:new o.LatLng(this.opts.position):null}getVisible(){if(!this.element)return!1;const e=this.element;return e.style.display!=="none"&&e.style.visibility!=="hidden"&&(e.style.opacity===""||Number(e.style.opacity)>.01)}onAdd(){if(!this.element)return;const e=this.getPanes();e&&e.overlayMouseTarget.appendChild(this.element)}draw(){if(!this.element)return;const e=this.getProjection(),t=e==null?void 0:e.fromLatLngToDivPixel(this.getPosition());if(t){this.element.style.position="absolute";const i=this.element.offsetHeight,r=this.element.offsetWidth;let a,s;switch(this.opts.anchorPoint){case"TOP_CENTER":a=t.x-r/2,s=t.y;break;case"BOTTOM_CENTER":a=t.x-r/2,s=t.y-i;break;case"LEFT_CENTER":a=t.x,s=t.y-i/2;break;case"RIGHT_CENTER":a=t.x-r,s=t.y-i/2;break;case"TOP_LEFT":a=t.x,s=t.y;break;case"TOP_RIGHT":a=t.x-r,s=t.y;break;case"BOTTOM_LEFT":a=t.x,s=t.y-i;break;case"BOTTOM_RIGHT":a=t.x-r,s=t.y-i;break;default:a=t.x-r/2,s=t.y-i/2}this.element.style.left=a+"px",this.element.style.top=s+"px",this.element.style.transform=`translateX(${this.opts.offsetX||0}px) translateY(${this.opts.offsetY||0}px)`,this.opts.zIndex&&(this.element.style.zIndex=this.opts.zIndex.toString())}}onRemove(){this.element&&this.element.remove()}setOptions(e){const{element:t,...i}=e;this.element=t,this.opts=i,this.draw()}}}let z;const D=["bounds_changed","center_changed","click","dblclick","drag","dragend","dragstart","heading_changed","idle","maptypeid_changed","mousemove","mouseout","mouseover","projection_changed","resize","rightclick","tilesloaded","tilt_changed","zoom_changed"],xe=A({props:{apiPromise:{type:Promise},apiKey:{type:String,default:""},version:{type:String,default:"weekly"},libraries:{type:Array,default:()=>["places"]},region:{type:String,required:!1},language:{type:String,required:!1},backgroundColor:{type:String,required:!1},center:{type:Object,default:()=>({lat:0,lng:0})},clickableIcons:{type:Boolean,required:!1,default:void 0},controlSize:{type:Number,required:!1},disableDefaultUi:{type:Boolean,required:!1,default:void 0},disableDoubleClickZoom:{type:Boolean,required:!1,default:void 0},draggable:{type:Boolean,required:!1,default:void 0},draggableCursor:{type:String,required:!1},draggingCursor:{type:String,required:!1},fullscreenControl:{type:Boolean,required:!1,default:void 0},fullscreenControlPosition:{type:String,required:!1},gestureHandling:{type:String,required:!1},heading:{type:Number,required:!1},keyboardShortcuts:{type:Boolean,required:!1,default:void 0},mapTypeControl:{type:Boolean,required:!1,default:void 0},mapTypeControlOptions:{type:Object,required:!1},mapTypeId:{type:[Number,String],required:!1},mapId:{type:String,required:!1},maxZoom:{type:Number,required:!1},minZoom:{type:Number,required:!1},noClear:{type:Boolean,required:!1,default:void 0},panControl:{type:Boolean,required:!1,default:void 0},panControlPosition:{type:String,required:!1},restriction:{type:Object,required:!1},rotateControl:{type:Boolean,required:!1,default:void 0},rotateControlPosition:{type:String,required:!1},scaleControl:{type:Boolean,required:!1,default:void 0},scaleControlStyle:{type:Number,required:!1},scrollwheel:{type:Boolean,required:!1,default:void 0},streetView:{type:Object,required:!1},streetViewControl:{type:Boolean,required:!1,default:void 0},streetViewControlPosition:{type:String,required:!1},styles:{type:Array,required:!1},tilt:{type:Number,required:!1},zoom:{type:Number,required:!1},zoomControl:{type:Boolean,required:!1,default:void 0},zoomControlPosition:{type:String,required:!1}},emits:D,setup(o,{emit:e}){const t=v(),i=v(!1),r=v(),a=v(),s=v(!1);E(W,r),E(X,a),E(we,s);const l=()=>{const n={...o};Object.keys(n).forEach(c=>{n[c]===void 0&&delete n[c]});const h=c=>{var g;return c?{position:(g=a.value)==null?void 0:g.ControlPosition[c]}:{}},f={scaleControlOptions:o.scaleControlStyle?{style:o.scaleControlStyle}:{},panControlOptions:h(o.panControlPosition),zoomControlOptions:h(o.zoomControlPosition),rotateControlOptions:h(o.rotateControlPosition),streetViewControlOptions:h(o.streetViewControlPosition),fullscreenControlOptions:h(o.fullscreenControlPosition),disableDefaultUI:o.disableDefaultUi};return{...n,...f}},p=j([a,r],([n,h])=>{const f=n,c=h;f&&c&&(f.event.addListenerOnce(c,"tilesloaded",()=>{s.value=!0}),setTimeout(p,0))},{immediate:!0}),m=()=>{try{const{apiKey:n,region:h,version:f,language:c,libraries:g}=o;z=new S({apiKey:n,region:h,version:f,language:c,libraries:g})}catch(n){console.error(n)}},u=n=>{a.value=L(n.maps),r.value=L(new n.maps.Map(t.value,l()));const h=Ce(a.value);a.value[U]=h,D.forEach(c=>{var g;(g=r.value)==null||g.addListener(c,y=>e(c,y))}),i.value=!0;const f=Object.keys(o).filter(c=>!["apiPromise","apiKey","version","libraries","region","language","center","zoom"].includes(c)).map(c=>Z(o,c));j([()=>o.center,()=>o.zoom,...f],([c,g],[y,b])=>{var x,k,I;const{center:T,zoom:F,...ee}=l();(x=r.value)==null||x.setOptions(ee),g!==void 0&&g!==b&&((k=r.value)==null||k.setZoom(g));const te=!y||c.lng!==y.lng||c.lat!==y.lat;c&&te&&((I=r.value)==null||I.panTo(c))})};return Y(()=>{o.apiPromise&&o.apiPromise instanceof Promise?o.apiPromise.then(u):(m(),z.load().then(u))}),R(()=>{var n;s.value=!1,r.value&&((n=a.value)==null||n.event.clearInstanceListeners(r.value))}),{mapRef:t,ready:i,map:r,api:a,mapTilesLoaded:s}}}),Ie=(o,e)=>{const t=o.__vccOpts||o;for(const[i,r]of e)t[i]=r;return t},Oe={ref:"mapRef",class:"mapdiv"};function Me(o,e,t,i,r,a){return C(),P("div",null,[d("div",Oe,null,512),re(o.$slots,"default",ie(ae({ready:o.ready,map:o.map,api:o.api,mapTilesLoaded:o.mapTilesLoaded})),void 0,!0)])}const Le=Ie(xe,[["render",Me],["__scopeId","data-v-174b771e"]]);function Pe(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}var Te=function o(e,t){if(e===t)return!0;if(e&&t&&typeof e=="object"&&typeof t=="object"){if(e.constructor!==t.constructor)return!1;var i,r,a;if(Array.isArray(e)){if(i=e.length,i!=t.length)return!1;for(r=i;r--!==0;)if(!o(e[r],t[r]))return!1;return!0}if(e.constructor===RegExp)return e.source===t.source&&e.flags===t.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===t.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===t.toString();if(a=Object.keys(e),i=a.length,i!==Object.keys(t).length)return!1;for(r=i;r--!==0;)if(!Object.prototype.hasOwnProperty.call(t,a[r]))return!1;for(r=i;r--!==0;){var s=a[r];if(!o(e[s],t[s]))return!1}return!0}return e!==e&&t!==t};const Ee=Pe(Te),Ne=o=>o==="Marker",qe=o=>o===U,je=(o,e,t,i)=>{const r=v(),a=N(W,v()),s=N(X,v()),l=N(_e,v()),p=oe(()=>!!(l.value&&s.value&&(r.value instanceof s.value.Marker||r.value instanceof s.value[U])));return j([a,t],(m,[u,n])=>{var h,f,c;const g=!Ee(t.value,n)||a.value!==u;!a.value||!s.value||!g||(r.value?(r.value.setOptions(t.value),p.value&&((h=l.value)==null||h.removeMarker(r.value),(f=l.value)==null||f.addMarker(r.value))):(Ne(o)?r.value=L(new s.value[o](t.value)):qe(o)?r.value=L(new s.value[o](t.value)):r.value=L(new s.value[o]({...t.value,map:a.value})),p.value?(c=l.value)==null||c.addMarker(r.value):r.value.setMap(a.value),e.forEach(y=>{var b;(b=r.value)==null||b.addListener(y,x=>i(y,x))})))},{immediate:!0}),R(()=>{var m,u;r.value&&((m=s.value)==null||m.event.clearInstanceListeners(r.value),p.value?(u=l.value)==null||u.removeMarker(r.value):r.value.setMap(null))}),r},H=["animation_changed","click","dblclick","rightclick","dragstart","dragend","drag","mouseover","mousedown","mouseout","mouseup","draggable_changed","clickable_changed","contextmenu","cursor_changed","flat_changed","rightclick","zindex_changed","icon_changed","position_changed","shape_changed","title_changed","visible_changed"],Be=A({name:"Marker",props:{options:{type:Object,required:!0}},emits:H,setup(o,{emit:e,expose:t,slots:i}){const r=Z(o,"options"),a=je("Marker",H,r,e);return E(be,a),t({marker:a}),()=>{var s;return(s=i.default)==null?void 0:s.call(i)}}});Q.concat(["bounds_changed"]);Q.concat(["center_changed","radius_changed"]);var B;(function(o){o.CLUSTERING_BEGIN="clusteringbegin",o.CLUSTERING_END="clusteringend",o.CLUSTER_CLICK="click"})(B||(B={}));Object.values(B);const Ae="/carbon/assets/flag-79b88d64.ico",Re={props:{mapsKey:String,latitude:Number,longitude:Number,flagPath:String},data(){return{center:{lat:this.latitude,lng:this.longitude},flagIcon:null}},components:{GoogleMap:Le,Marker:Be},watch:{latitude:function(o){this.center.lat=o},longitude:function(o){this.center.lng=o}},mounted(){this.loadFlagIcon()},methods:{loadFlagIcon(){this.flagIcon={url:this.flagPath||Ae,scaledSize:new window.google.maps.Size(70,70)}}}};function Ge(o,e,t,i,r,a){const s=_("Marker"),l=_("GoogleMap");return C(),P("div",null,[w(l,{"api-key":t.mapsKey,class:"w-full h-[500px]",center:r.center,zoom:15},{default:J(()=>[w(s,{options:{position:{lat:t.latitude,lng:t.longitude},icon:r.flagIcon}},null,8,["options"])]),_:1},8,["api-key","center"])])}const Ue=G(Re,[["render",Ge]]),Fe=A({props:{modelValue:{type:String,default:""},apiKey:{type:String,required:!0},placeholder:{type:String,default:""},class:{type:String,default:""}},emits:["update:modelValue","callback"],setup(o,{emit:e}){const t=v(null);let i=!1;function r(){return new Promise((s,l)=>{if(window.google&&window.google.maps&&window.google.maps.places)s();else if(!i){i=!0;const p=document.createElement("script");p.setAttribute("src",`https://maps.googleapis.com/maps/api/js?key=${o.apiKey}&libraries=places&callback=initMap`),window.initMap=()=>{s()},p.onerror=m=>{l(m)},document.head.appendChild(p)}})}Y(async()=>{try{await r(),await se(),a()}catch(s){console.error("Failed to load Google Maps API",s)}}),R(()=>{delete window.initMap});function a(){if(t.value){const s=new google.maps.places.Autocomplete(t.value);s.addListener("place_changed",()=>{const l=s.getPlace();e("update:modelValue",l.formatted_address),e("callback",l)})}}return{autocompleteInput:t}}}),Ke=(o,e)=>{const t=o.__vccOpts||o;for(const[i,r]of e)t[i]=r;return t},$e=["placeholder"];function Ve(o,e,t,i,r,a){return C(),P("input",{ref:"autocompleteInput",type:"text",autocomplete:"off",placeholder:o.placeholder,class:ne(o.class)},null,10,$e)}const ze=Ke(Fe,[["render",Ve]]),De={props:{mapsKey:String},components:{GoogleAddressAutocomplete:ze},methods:{callbackFunction(o){this.$emit("searchMaps",o)}}},He={class:"mb-2"},Ze=d("span",{class:"text-red-500"},"*",-1);function Ye(o,e,t,i,r,a){const s=_("GoogleAddressAutocomplete");return C(),P("div",null,[d("label",He,[le(O(o.$t("formUser.locationSection"))+" ",1),Ze]),w(s,{placeholder:"Where Your Location?",apiKey:t.mapsKey,modelValue:o.address,"onUpdate:modelValue":e[0]||(e[0]=l=>o.address=l),onCallback:a.callbackFunction,class:"border-[1px] mt-2 border-[#cccccc] w-full bg-white bg-opacity-50 rounded-md"},null,8,["apiKey","modelValue","onCallback"])])}const Je=G(De,[["render",Ye]]),We={data(){return{apiDomain:"https://carbon.koersi.id",mapsKey:"AIzaSyBHiGcY7tohl9P47ZOYtY5gH4IKdwjndU0",BackgroundImage:fe,firstName:"",address:"",latitude:40.689247,longitude:-74.044502,lastName:"",email:"",showGoogleMaps:!1,listRadioButton:[{title:"One Trips",value:"One Trips"},{title:"Multiple Trips",value:"Multiple Trips"},{title:"Charter",value:"Charter"}]}},components:{LayoutGuest:de,GoogleMaps:Ue,AddressAutocomplete:Je,NavBar:ue,RadioDynamic:he,TextareaDynamic:me,InputDynamic:pe,CarbonSection:ge},created(){setTimeout(()=>{this.showGoogleMaps=!0},1e3)},methods:{onSubmit(){let o=document.querySelector(".in-load");if(o.innerHTML+='<i class="ml-2 fa-solid fa-circle-notch load"></i>',!this.firstName||!this.address||!this.lastName||!this.email)q.fire({icon:"error",title:"Validation Failed!",text:"All fields must be filled"});else{const e={};e.first_name=this.firstName,e.last_name=this.lastName,e.location=this.address,e.email=this.email,ce.post(`${this.apiDomain}/api/v1/guests`,e).then(t=>{q.fire({icon:"success",title:"Success!",text:"Data has been saved successfully",confirmButtonColor:"#3085d6",confirmButtonText:"OK"}).then(i=>{i.isConfirmed&&(localStorage.setItem("dataUser",JSON.stringify(t.data)),this.$router.push("/carbon-calc"))})}).catch(t=>{let i="An error occurred";t.message&&(i=t.message),o.innerHTML="Submit",q.fire({icon:"error",title:"Error!",text:i})})}},onSearchMap(o){this.showGoogleMaps=!1;const e=o.geometry.location.lat(),t=o.geometry.location.lng(),i=o.formatted_address;this.address=i,this.latitude=e,this.longitude=t,setTimeout(()=>{this.showGoogleMaps=!0},500)}}},Xe=["src"],Qe={class:"flex justify-center mb-4 mt-[25%] md:mt-[7%]"},et={class:"resp-box bg-white text-center p-10 z-10 rounded-lg bg-opacity-70 backdrop-blur-2xl w-[80%]"},tt={class:"flex items-center"},ot=d("div",{class:"bg-[#163331] p-2 rounded-full mr-4"},[d("svg",{width:"30",height:"30",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[d("path",{d:"M4 7C4 5.11438 4 4.17157 4.58579 3.58579C5.17157 3 6.11438 3 8 3H16C17.8856 3 18.8284 3 19.4142 3.58579C20 4.17157 20 5.11438 20 7V15C20 17.8284 20 19.2426 19.1213 20.1213C18.2426 21 16.8284 21 14 21H10C7.17157 21 5.75736 21 4.87868 20.1213C4 19.2426 4 17.8284 4 15V7Z",stroke:"#FFF","stroke-width":"2"}),d("path",{d:"M15 18L15 21M9 18L9 21",stroke:"#FFF","stroke-width":"2","stroke-linecap":"round"}),d("path",{d:"M9 8L15 8",stroke:"#FFF","stroke-width":"2","stroke-linecap":"round"}),d("path",{d:"M9 12L15 12",stroke:"#FFF","stroke-width":"2","stroke-linecap":"round"})])],-1),rt={class:"header text-left"},it={class:"text-md md:text-2xl font-bold text-[#2e2e2e]"},at={class:"text-xs md:text-sm text-[#2e2e2e] mt-1"},st={class:"content mt-10"},nt={class:"carbon text-left text-[#2e2e2e]"},lt={class:"grid grid-cols-1 gap-4"},ct={class:"left-section border-[1px] border-[#cccccc] rounded-md py-4 px-6 bg-white bg-opacity-50"},dt={class:"text-xl font-semibold"},ut={class:"grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"},pt={class:"grid grid-cols-1 gap-4 mt-4"},ht={class:"left-section border-[1px] border-[#cccccc] rounded-md py-4 px-6 bg-white bg-opacity-50"},mt={class:"text-xl font-semibold"},gt={class:"grid grid-cols-1 gap-4 mt-4"},ft={class:"grid grid-cols-1 gap-4 mt-4 rounded-md overflow-hidden"},yt={class:"h-[500px]"},vt={key:1,class:"flex items-center justify-center h-full bg-white bg-opacity-50 rounded-md border-[1px] relative border-[#cccccc]"},bt=d("div",{class:"animate-spin w-16 h-16 border-t-4 border-[#476b6b] border-solid rounded-full"},null,-1),_t=[bt];function wt(o,e,t,i,r,a){const s=_("NavBar"),l=_("InputDynamic"),p=_("AddressAutocomplete"),m=_("GoogleMaps"),u=_("LayoutGuest");return C(),K(u,null,{default:J(()=>[w(s),d("img",{src:r.BackgroundImage,class:"fixed w-screen h-screen top-0 left-0 w-full h-full object-cover",alt:""},null,8,Xe),d("div",Qe,[d("div",et,[d("div",tt,[ot,d("div",rt,[d("h1",it,O(o.$t("formUser.formTitle")),1),d("p",at,O(o.$t("formUser.formSubtitle")),1)])]),d("div",st,[d("div",nt,[d("div",lt,[d("div",ct,[d("h1",dt,O(o.$t("formUser.biodataSection")),1),d("div",ut,[w(l,{placeholder:"First Name?",label:o.$t("formUser.firstNameLabel"),value:r.firstName,inputId:"namaDepanInput",type:"text",required:!0,onValueUpdated:e[0]||(e[0]=n=>r.firstName=n)},null,8,["label","value"]),w(l,{placeholder:"Last Name",label:o.$t("formUser.lastNameLabel"),value:r.lastName,inputId:"namaBelakangInput",type:"text",required:!0,onValueUpdated:e[1]||(e[1]=n=>r.lastName=n)},null,8,["label","value"])]),d("div",pt,[w(l,{placeholder:"Your Email?",label:o.$t("formUser.emailLabel"),value:r.email,inputId:"emailInput",type:"email",required:!0,onValueUpdated:e[2]||(e[2]=n=>r.email=n)},null,8,["label","value"])])]),d("div",ht,[d("h1",mt,O(o.$t("formUser.locationSection")),1),d("div",gt,[w(p,{mapsKey:r.mapsKey,onSearchMaps:a.onSearchMap},null,8,["mapsKey","onSearchMaps"]),d("div",ft,[d("div",yt,[r.showGoogleMaps?(C(),K(m,{key:0,mapsKey:r.mapsKey,longitude:r.longitude,latitude:r.latitude},null,8,["mapsKey","longitude","latitude"])):(C(),P("div",vt,_t))])])])])]),d("button",{class:"in-load bg-[#476b6b] mt-4 text-white px-8 py-2 rounded-md font-medium hover:bg-[#223d3d] transition duration-300 ease-in-out",onClick:e[3]||(e[3]=(...n)=>a.onSubmit&&a.onSubmit(...n))},O(o.$t("formUser.submitButton")),1)])])])])]),_:1})}const Pt=G(We,[["render",wt]]);export{Pt as default};
