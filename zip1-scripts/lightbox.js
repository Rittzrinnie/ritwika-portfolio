(function(){
  if(window.__rmLightbox) return; window.__rmLightbox=true;
  var SKIP='a,button,nav,[data-draggable],[data-no-lightbox],#side-ctx-nav';
  function srcOf(el){
    if(el.tagName==='IMG') return el.currentSrc||el.src||null;
    var im=el.shadowRoot&&el.shadowRoot.querySelector('.frame img');
    return (im&&im.style.display!=='none'&&im.getAttribute('src'))?im.src:null;
  }
  function ok(el){
    if(!el||!el.isConnected||el.closest(SKIP)) return false;
    if(el.tagName==='IMG'){ var r=el.getBoundingClientRect(); if(r.width<120||r.height<80) return false; }
    return !!srcOf(el);
  }
  function all(){ return Array.prototype.slice.call(document.querySelectorAll('image-slot, img')).filter(ok); }
  function cap(el){
    var fig=el.closest('figure'), c=fig&&fig.querySelector('figcaption');
    if(c) return c.textContent.trim();
    return (el.getAttribute('alt')||'').trim();
  }
  var ov,img,cp,pv,nx,x,list=[],idx=0;
  function build(){
    ov=document.createElement('div');
    ov.setAttribute('role','dialog'); ov.setAttribute('aria-modal','true'); ov.setAttribute('aria-label','Image viewer'); ov.setAttribute('data-no-lightbox','');
    ov.style.cssText='position:fixed;inset:0;z-index:2147483000;background:rgba(20,18,15,.94);display:none;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:64px 72px 24px;box-sizing:border-box;opacity:0;transition:opacity .25s;cursor:zoom-out';
    img=document.createElement('img'); img.alt='';
    img.style.cssText='max-width:min(1600px,100%);max-height:calc(100vh - 150px);object-fit:contain;background:#fff;box-shadow:0 20px 60px rgba(0,0,0,.4);cursor:default';
    cp=document.createElement('div');
    cp.style.cssText='font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.04em;line-height:1.5;color:#D9D4CA;text-align:center;max-width:900px';
    function mk(t,css,lab){ var b=document.createElement('button'); b.type='button'; b.textContent=t; b.setAttribute('aria-label',lab); b.style.cssText='position:absolute;width:44px;height:44px;border:1px solid #44403A;background:rgba(26,24,20,.7);color:#F7F4EF;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;'+css; return b; }
    x=mk('✕','top:14px;right:14px','Close'); pv=mk('←','left:14px;top:50%;margin-top:-22px','Previous image'); nx=mk('→','right:14px;top:50%;margin-top:-22px','Next image');
    ov.appendChild(img); ov.appendChild(cp); ov.appendChild(x); ov.appendChild(pv); ov.appendChild(nx);
    document.body.appendChild(ov);
    ov.addEventListener('click',function(e){ if(e.target===ov||e.target===cp) close(); });
    x.addEventListener('click',close);
    pv.addEventListener('click',function(e){ e.stopPropagation(); show(idx-1); });
    nx.addEventListener('click',function(e){ e.stopPropagation(); show(idx+1); });
    var sx=null;
    ov.addEventListener('touchstart',function(e){ sx=e.touches[0].clientX; },{passive:true});
    ov.addEventListener('touchend',function(e){ if(sx==null) return; var dx=e.changedTouches[0].clientX-sx; if(Math.abs(dx)>50&&list.length>1) show(idx+(dx<0?1:-1)); sx=null; });
  }
  function show(i){
    idx=(i+list.length)%list.length; var el=list[idx];
    img.src=srcOf(el);
    var c=cap(el); cp.textContent=c+(list.length>1?(c?'   ·   ':'')+(idx+1)+' / '+list.length:'');
    var m=list.length>1?'flex':'none'; pv.style.display=m; nx.style.display=m;
  }
  function open(el){
    if(!ov) build();
    list=all(); var i=list.indexOf(el); if(i<0) return;
    show(i); ov.style.display='flex';
    requestAnimationFrame(function(){ ov.style.opacity='1'; });
    document.documentElement.style.overflow='hidden'; x.focus({preventScroll:true});
  }
  function close(){
    ov.style.opacity='0';
    setTimeout(function(){ ov.style.display='none'; img.removeAttribute('src'); },250);
    document.documentElement.style.overflow='';
  }
  function target(e){
    var p=e.composedPath?e.composedPath():[e.target];
    for(var i=0;i<p.length;i++){
      var n=p[i]; if(!n.tagName) continue;
      if(n.tagName==='BUTTON'||n.tagName==='INPUT') return null;
      if(n.tagName==='IMAGE-SLOT') return n;
      if(n.tagName==='IMG'&&n.getRootNode()===document) return n;
    }
    return null;
  }
  document.addEventListener('click',function(e){ var t=target(e); if(t&&ok(t)){ e.preventDefault(); open(t); } });
  document.addEventListener('mouseover',function(e){ var t=target(e); if(t&&!t.closest(SKIP)) t.style.cursor=ok(t)?'zoom-in':''; });
  document.addEventListener('keydown',function(e){
    if(!ov||ov.style.display!=='flex') return;
    if(e.key==='Escape') close(); else if(e.key==='ArrowLeft') show(idx-1); else if(e.key==='ArrowRight') show(idx+1);
  });
})();
