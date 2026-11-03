/* GSAP enhancement only. Content is visible and navigable without JavaScript/CDN. */
(function(){
  function boot(){
    var stage=document.querySelector('.rm-focus-stage');
    if(!stage||!window.gsap||!window.ScrollTrigger||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    if(window.matchMedia('(max-width: 750px)').matches)return;
    window.gsap.registerPlugin(window.ScrollTrigger);
    document.documentElement.classList.add('rm-motion-active');
    var tl=window.gsap.timeline({scrollTrigger:{trigger:stage,start:'top top',end:'bottom bottom',scrub:1.1,pin:stage.querySelector('.rm-focus-pin'),pinSpacing:false,invalidateOnRefresh:true}});
    tl.to('.rm-focus-portal',{scale:3.4,opacity:.28,ease:'none'},0)
      .to('.rm-focus-inner',{scale:.86,y:-48,opacity:.25,ease:'none'},.15)
      .to('.rm-focus-portal',{scale:6.5,opacity:0,ease:'none'},.62)
      .to('.rm-focus-inner',{opacity:0,ease:'none'},.73);
    window.ScrollTrigger.refresh();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
