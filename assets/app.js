const API_BASE = window.KAMINI_CONFIG?.apiBaseUrl?.replace(/\/+$/, "") || "https://kmini-g-lang.vercel.app";
const menu = document.querySelector("#menu");
const sidebar = document.querySelector("#sidebar");
const scrim = document.querySelector("#scrim");
function setMenu(open) {
  document.body.classList.toggle("menu-open", open);
  menu?.setAttribute("aria-expanded", String(open));
  menu?.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
}
menu?.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
scrim?.addEventListener("click", () => setMenu(false));
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
sidebar?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
document.querySelectorAll("[data-copy]").forEach(button => button.addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(button.dataset.copy); const old=button.textContent; button.textContent="Copied ✓"; setTimeout(()=>button.textContent=old,1200); }
  catch { button.textContent="Copy unavailable"; }
}));
const links=[...document.querySelectorAll("[data-section]")];
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)links.forEach(link=>link.classList.toggle("active",link.dataset.section===entry.target.id));}),{rootMargin:"-20% 0px -70% 0px"});
document.querySelectorAll("main section[id]").forEach(section=>observer.observe(section));
const route=document.querySelector("#console-route");
const pageField=document.querySelector("#page-field"), queryField=document.querySelector("#query-field"), slugField=document.querySelector("#slug-field");
const pageInput=document.querySelector("#console-page"), queryInput=document.querySelector("#console-query"), slugInput=document.querySelector("#console-slug");
const urlLabel=document.querySelector("#console-url");
function buildURL(){
 const p=Math.min(30,Math.max(1,Number.parseInt(pageInput.value||"1",10)||1));
 pageInput.value=p;
 let path="";
 switch(route.value){
  case "feed": path="/api/v1/feed?page="+p; break;
  case "search": path="/api/v1/search?q="+encodeURIComponent(queryInput.value.trim())+"&page="+p; break;
  case "feed-post": path="/api/v1/feed/posts/"+encodeURIComponent(slugInput.value.trim()); break;
  case "post": path="/api/v1/posts/"+encodeURIComponent(slugInput.value.trim()); break;
 }
 urlLabel.textContent="GET "+API_BASE+path; return API_BASE+path;
}
function syncFields(){
 const collection=route.value==="feed"||route.value==="search";
 pageField.classList.toggle("hidden",!collection);
 queryField.classList.toggle("hidden",route.value!=="search");
 slugField.classList.toggle("hidden",collection);
 buildURL();
}
route?.addEventListener("change",syncFields);
[pageInput,queryInput,slugInput].forEach(el=>el?.addEventListener("input",buildURL));
syncFields();
document.querySelector("#api-console")?.addEventListener("submit",async e=>{
 e.preventDefault();
 const output=document.querySelector("#console-output"), status=document.querySelector("#console-status"), button=document.querySelector("#run-request");
 const url=buildURL();
 if(route.value==="search"&&!queryInput.value.trim()){status.textContent="Missing query";output.textContent="Enter a search query before sending the request.";return;}
 if((route.value==="feed-post"||route.value==="post")&&!slugInput.value.trim()){status.textContent="Missing slug";output.textContent="Enter the complete post slug before sending the request.";return;}
 button.disabled=true;button.textContent="Sending…";status.textContent="Request in progress";output.textContent="Waiting for API response…";
 const start=performance.now();
 try{
  const response=await fetch(url,{method:"GET",headers:{Accept:"application/json"}});
  const text=await response.text();let body;try{body=JSON.parse(text)}catch{body=text}
  status.textContent=response.status+" · "+Math.round(performance.now()-start)+" ms";
  output.textContent=typeof body==="string"?body:JSON.stringify(body,null,2);
 }catch(err){status.textContent="Network error";output.textContent=String(err)+"\n\nIf this is a browser CORS/network issue, try the same URL with cURL."}
 finally{button.disabled=false;button.textContent="Send request →"}
});
