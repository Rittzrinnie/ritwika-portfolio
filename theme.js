(function(){
  if(window.__rmThemeInit) return; window.__rmThemeInit=true;
  var KEY='rm-theme';
  var saved=null; try{ saved=localStorage.getItem(KEY); }catch(e){}
  var theme=saved || (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  var html=document.documentElement; html.setAttribute('data-theme',theme);
  var D='html[data-theme="dark"] ';
  var bg=[['247, 244, 239','18, 17, 16'],['251, 249, 245','26, 25, 23'],['236, 231, 222','34, 32, 28'],['228, 223, 213','42, 40, 35'],['241, 236, 227','36, 34, 30'],['239, 235, 227','30, 28, 25'],['219, 214, 204','52, 49, 43'],['201, 195, 182','74, 70, 62'],['255, 255, 255','238, 235, 229']];
  var fg=[['26, 24, 20','242, 238, 231'],['44, 42, 36','222, 218, 210'],['70, 66, 58','196, 191, 181'],['86, 82, 74','175, 169, 159'],['107, 102, 92','154, 149, 138'],['154, 149, 138','138, 133, 123'],['247, 244, 239','18, 17, 16']];
  var bd=[['219, 214, 204','52, 49, 43'],['201, 195, 182','74, 70, 62'],['26, 24, 20','242, 238, 231']];
  var css=D+'body{background:#121110!important}'+D+'::selection{background:#F2EEE7;color:#121110}';
  bg.forEach(function(p){ if(p[0]==='255, 255, 255') return; css+=D+'[style*="background: rgb('+p[0]+')"]{background-color:rgb('+p[1]+')!important}'; });
  css+=D+'[style*="background: rgba(247, 244, 239"]{background-color:rgba(18, 17, 16, .86)!important}';
  css+=D+'[style*="background: rgb(26, 24, 20)"]:not(section){background-color:rgb(242, 238, 231)!important}';
  css+=D+'section[style*="background: rgb(26, 24, 20)"]{background-color:rgb(10, 9, 8)!important}';
  css+=D+'[style*="repeating-linear-gradient(135deg, rgb(228, 223, 213)"]{background:repeating-linear-gradient(135deg,#221F1B 0 16px,#2A2823 16px 32px)!important}';
  fg.forEach(function(p){ css+=D+'[style^="color: rgb('+p[0]+')"],'+D+'[style*="; color: rgb('+p[0]+')"]{color:rgb('+p[1]+')!important}'; });
  bd.forEach(function(p){ css+=D+'[style*="solid rgb('+p[0]+')"]{border-color:rgb('+p[1]+')!important}'; });
  var S=D+'section[style*="background: rgb(26, 24, 20)"] ';
  css+='html[data-theme="dark"] body section[style*="background: rgb(26, 24, 20)"]{color:rgb(242, 238, 231)!important}';
  css+=S+'[style*="background: rgb(247, 244, 239)"]{background-color:rgb(242, 238, 231)!important;color:rgb(18, 17, 16)!important}';
  css+=S+'[style^="color: rgb(247, 244, 239)"],'+S+'[style*="; color: rgb(247, 244, 239)"]{color:rgb(242, 238, 231)!important}';
  css+=S+'[style*="solid rgb(247, 244, 239)"]{border-color:rgb(242, 238, 231)!important}';
  css+=S+'[style*="background: rgb(242, 238, 231)"]{color:rgb(18, 17, 16)!important}';
  css+=D+'[data-theme-toggle]{color:#F2EEE7!important}';
  css+='html,body,[style]{transition-property:background-color,color,border-color;transition-duration:.25s}';
  var st=document.createElement('style'); st.id='rm-theme-css'; st.textContent=css; (document.head||html).appendChild(st);
  function sync(){ var dark=html.getAttribute('data-theme')==='dark'; document.querySelectorAll('[data-theme-toggle]').forEach(function(b){ var p=String(dark), tl=dark?'Switch to light mode':'Switch to dark mode', ic=dark?'☀':'☾'; if(b.getAttribute('aria-pressed')!==p) b.setAttribute('aria-pressed',p); if(b.getAttribute('title')!==tl) b.setAttribute('title',tl); var i=b.querySelector('[data-theme-icon]'); if(i && i.textContent!==ic) i.textContent=ic; }); }
  document.addEventListener('click',function(e){ var b=e.target.closest && e.target.closest('[data-theme-toggle]'); if(!b) return; var next=html.getAttribute('data-theme')==='dark'?'light':'dark'; html.setAttribute('data-theme',next); try{ localStorage.setItem(KEY,next); }catch(err){} sync(); });
  document.addEventListener('DOMContentLoaded',sync);
  [300,1200,3000].forEach(function(ms){ setTimeout(sync,ms); });
  sync();
})();

(function(){
  if(window.__rmIntro) return; window.__rmIntro=true;
  var reduce=window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var first=true; try{ first=!sessionStorage.getItem('rm-nav'); sessionStorage.removeItem('rm-nav'); }catch(e){}
  var HOLD=reduce?150:(first?1500:0);
  var css='#rm-intro{position:fixed;inset:0;z-index:2147483000;background:#0E0D0C;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:34px;transition:opacity .55s ease,visibility .55s;perspective:900px;font-family:"Space Grotesk",ui-monospace,monospace}'+
  '#rm-intro.out{opacity:0;visibility:hidden}#rm-intro.plain{transition:opacity .35s ease,visibility .35s}'+
  '#rm-intro .dia{width:132px;height:132px;position:relative;transform-style:preserve-3d;animation:rmSpin 2.2s cubic-bezier(.45,0,.2,1) infinite}'+
  '#rm-intro .face{position:absolute;inset:0;border:2px solid #F2EEE7;transform:rotate(45deg);box-shadow:0 0 0 rgba(242,238,231,0);animation:rmGlowBox 1.6s ease-in-out infinite alternate}'+
  '#rm-intro .face.b{transform:rotate(45deg) translateZ(-18px);border-color:rgba(242,238,231,.25)}'+
  '#rm-intro .rm{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:"Space Grotesk",system-ui,sans-serif;font-weight:700;font-size:40px;letter-spacing:-.02em;color:#F2EEE7;transform:translateZ(14px);animation:rmGlow 1.6s ease-in-out infinite alternate}'+
  '#rm-intro .gauge{width:220px;display:flex;flex-direction:column;gap:10px}'+
  '#rm-intro .ticks{display:flex;justify-content:space-between;font-size:10px;letter-spacing:.12em;color:#6F6A61}'+
  '#rm-intro .bar{height:2px;background:#2A2723;position:relative;overflow:hidden}'+
  '#rm-intro .bar i{position:absolute;left:0;top:0;bottom:0;width:0;background:linear-gradient(90deg,#F2EEE7,#1F5FE0);box-shadow:0 0 12px #1F5FE0}'+
  '#rm-intro .lbl{font-size:10.5px;letter-spacing:.14em;color:#B8B2A6;text-align:center}'+
  '@keyframes rmSpin{0%{transform:rotateX(18deg) rotateY(0)}100%{transform:rotateX(18deg) rotateY(360deg)}}'+
  '@keyframes rmGlow{from{text-shadow:0 0 0 rgba(242,238,231,0);opacity:.55}to{text-shadow:0 0 18px rgba(242,238,231,.85),0 0 42px rgba(31,95,224,.7);opacity:1}}'+
  '@keyframes rmGlowBox{from{box-shadow:0 0 0 rgba(31,95,224,0)}to{box-shadow:0 0 26px rgba(31,95,224,.55),inset 0 0 18px rgba(242,238,231,.12)}}'+
  '@keyframes rmRev{0%{width:0}55%{width:78%}70%{width:64%}100%{width:100%}}'+
  '@media (prefers-reduced-motion:reduce){#rm-intro .dia,#rm-intro .rm,#rm-intro .face{animation:none}}';
  var st=document.createElement('style'); st.textContent=css; (document.head||document.documentElement).appendChild(st);
  var el=document.createElement('div'); el.id='rm-intro'; el.setAttribute('aria-hidden','true');
  el.innerHTML='<div class="dia"><div class="face b"></div><div class="face"></div><div class="rm">RM</div></div><div class="gauge"><div class="ticks"><span>0</span><span>2</span><span>4</span><span>6</span><span>8</span></div><div class="bar"><i></i></div><div class="lbl">'+(first?'IGNITION · RITWIKA MONDAL':'SHIFTING GEAR')+'</div></div>';
  var dark=document.documentElement.getAttribute('data-theme')==='dark';
  if(!first){ el.classList.add('plain'); el.style.background=dark?'#121110':'#F7F4EF'; el.innerHTML=''; }
  (document.body||document.documentElement).appendChild(el);
  var boot=document.getElementById('rm-boot'); if(boot) requestAnimationFrame(function(){ boot.remove(); });
  var bar=el.querySelector('.bar i'); if(bar) bar.style.animation='rmRev '+(HOLD/1000)+'s cubic-bezier(.3,.1,.2,1) forwards';
  var hide=function(){ el.classList.add('out'); };
  var start=Date.now();
  var go=function(){ setTimeout(hide, Math.max(0, HOLD-(Date.now()-start))); };
  if(document.readyState==='complete') go(); else window.addEventListener('load',go);
  setTimeout(hide, HOLD+2500);
  window.addEventListener('pageshow',function(e){ if(e.persisted) hide(); });
  document.addEventListener('click',function(e){
    if(e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.button!==0) return;
    var a=e.target.closest&&e.target.closest('a[href]'); if(!a||a.target==='_blank'||a.hasAttribute('download')) return;
    var href=a.getAttribute('href'); if(!href||href.charAt(0)==='#'||/^(mailto:|tel:|javascript:|data:)/i.test(href)) return;
    if(!/\.html(#.*)?$/i.test(href.split('?')[0])) return;
    var url; try{ url=new URL(href,location.href); }catch(err){ return; }
    if(url.origin!==location.origin && location.protocol!=='blob:') return;
    e.preventDefault();
    var dk=document.documentElement.getAttribute('data-theme')==='dark';
    el.className='plain out'; el.innerHTML=''; el.style.background=dk?'#121110':'#F7F4EF'; void el.offsetWidth; el.classList.remove('out');
    try{ sessionStorage.setItem('rm-nav','1'); }catch(err){}
    setTimeout(function(){ location.href=a.href; }, reduce?30:260);
  });
})();

(function(){
  if(window.__rmPrefetch) return; window.__rmPrefetch=true;
  var done={};
  function pf(href){ try{ var u=new URL(href,location.href); if(u.origin!==location.origin||done[u.pathname]||!/\.html$/i.test(u.pathname)||u.pathname===location.pathname) return; done[u.pathname]=1; var l=document.createElement('link'); l.rel='prefetch'; l.href=u.href; document.head.appendChild(l); }catch(e){} }
  function all(){ document.querySelectorAll('a[href$=".html"]').forEach(function(a){ pf(a.getAttribute('href')); }); }
  var idle=window.requestIdleCallback||function(f){ return setTimeout(f,1500); };
  window.addEventListener('load',function(){ setTimeout(function(){ idle(all); },1200); });
  document.addEventListener('pointerover',function(e){ var a=e.target.closest&&e.target.closest('a[href$=".html"]'); if(a) pf(a.getAttribute('href')); },{passive:true});
})();
