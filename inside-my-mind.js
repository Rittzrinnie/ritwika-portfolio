/* Two-scene immersive story with progressive enhancement. Falls back to readable static scenes. */
(function(){
  function init(){
    var stage=document.querySelector('.imm-story');
    if(!stage || !window.gsap || !window.ScrollTrigger)return;
    if(window.matchMedia('(max-width:900px), (prefers-reduced-motion: reduce)').matches)return;
    var one=stage.querySelector('.imm-scene-one'),two=stage.querySelector('.imm-scene-two');
    var portrait=stage.querySelector('.imm-portrait-frame'),notes=stage.querySelectorAll('.imm-note');
    if(!one||!two||!portrait)return;
    window.gsap.registerPlugin(window.ScrollTrigger);
    stage.classList.add('imm-animated');
    var tl=window.gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:stage,start:'top top',end:'bottom bottom',scrub:1.15,pin:stage.querySelector('.imm-pin'),pinSpacing:false,invalidateOnRefresh:true}});
    tl.to(portrait,{scale:1.58,rotation:2,xPercent:-9,opacity:0},0.08)
      .to(notes,{x:function(i){return i%2===0?-165:165},y:function(i){return i===1?-95:75},rotation:function(i){return i%2?18:-18},opacity:0,stagger:.04},0.07)
      .to(one,{opacity:0,scale:.96},.18)
      .set(two,{visibility:'visible',pointerEvents:'auto'},.48)
      .to(two,{opacity:1},.48)
      .fromTo(two.querySelector('.imm-second'),{y:100,opacity:.2},{y:0,opacity:1},.5);
    window.ScrollTrigger.refresh();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
