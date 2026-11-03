/* Inside My Mind v2 — a true two-scene GSAP scroll narrative.
   Desktop: sticky stage + scrubbed ScrollTrigger. Mobile/reduced-motion: both scenes flow normally.
*/
(function(){
  function begin(){
    var story=document.querySelector('.imm-story');
    if(!story || story.dataset.motionInitialized)return;
    var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var mobile=window.matchMedia('(max-width: 900px)').matches;
    if(reduced || mobile)return;
    if(!window.gsap || !window.ScrollTrigger){
      story.dataset.motionStatus='gsap-unavailable';
      console.warn('Inside My Mind: GSAP or ScrollTrigger did not load; using static layout.');
      return;
    }
    var first=story.querySelector('.imm-scene-one');
    var second=story.querySelector('.imm-scene-two');
    var photo=story.querySelector('.imm-portrait-frame');
    var notes=story.querySelectorAll('.imm-note');
    var intro=story.querySelector('.imm-copy');
    var secondContent=story.querySelector('.imm-second');
    var hint=story.querySelector('.imm-scroll-hint');
    if(!first||!second||!photo||!intro||!secondContent)return;
    window.gsap.registerPlugin(window.ScrollTrigger);
    story.classList.add('imm-animated');
    story.dataset.motionInitialized='true';
    story.dataset.motionStatus='active';
    var gsap=window.gsap;
    gsap.set(second,{autoAlpha:0,pointerEvents:'none'});
    gsap.set(secondContent,{y:85,scale:.96});
    var timeline=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{
       trigger:story,
       start:'top top',
       end:'bottom bottom',
       scrub:1.05,
       invalidateOnRefresh:true,
       onUpdate:function(self){
          second.style.pointerEvents=self.progress>.59?'auto':'none';
          if(hint)hint.style.opacity=String(Math.max(0,1-self.progress*5));
       }
    }});
    // 0-0.55: portrait expands beyond the viewport as thoughts disperse.
    timeline.to(photo,{scale:4.2,rotation:3,xPercent:-12,opacity:0,duration:.55},0)
       .to(notes,{x:function(i){return i===1?220:-210},y:function(i){return i===1?-180:130},rotation:function(i){return i===1?20:-18},opacity:0,stagger:.025,duration:.4},.05)
       .to(intro,{x:-65,opacity:0,duration:.4},.12)
       .to(first,{autoAlpha:0,duration:.22},.40)
       // 0.49-1: the story resolves into case studies.
       .to(second,{autoAlpha:1,duration:.28},.49)
       .to(secondContent,{y:0,scale:1,duration:.46},.49);
    window.ScrollTrigger.refresh();
    console.info('Inside My Mind: GSAP scroll transition active');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',begin,{once:true});
  else begin();
})();
