import{a as l,S as u,i as n}from"./assets/vendor-BkC4bTqC.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function e(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(r){if(r.ep)return;r.ep=!0;const t=e(r);fetch(r.href,t)}})();async function d(a){return(await l.get("https://pixabay.com/api/",{params:{key:"55065193-391623a3c41ad24a1105f24d8",q:a,image_type:"photo",orientation:"horizontal",safesearch:"true"}})).data}let m=new u(".gallery-item",{captionDelay:250});const c=document.querySelector("#gallery");function f(a){const o=a.map(e=>`
  <a href="${e.largeImageURL}" class="gallery-item">
    <img src="${e.webformatURL}" alt="${e.tags}" />
    <div class="info">
      <p><b>Likes:</b> ${e.likes}</p>
      <p><b>Views:</b> ${e.views}</p>
      <p><b>Comments:</b> ${e.comments}</p>
      <p><b>Downloads:</b> ${e.downloads}</p>
    </div>
  </a>
`).join("");c.innerHTML=o,m.refresh()}function y(){c.innerHTML=""}function p(){document.querySelector(".loader").classList.remove("hidden")}function g(){document.querySelector(".loader").classList.add("hidden")}const h=document.querySelector(".search-form");document.querySelector(".gallery");h.addEventListener("submit",b);async function b(a){a.preventDefault();const o=a.target.elements.searchText.value.trim();if(!o){n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}y(),p();try{const e=await d(o);if(!e||e.length===0){n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}f(e)}catch(e){console.error("Error fetching images:",e),n.error({title:"Error",message:"An error occurred while fetching images. Please try again later."})}finally{g()}}
//# sourceMappingURL=index.js.map
