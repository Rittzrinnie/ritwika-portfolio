(function(){
  if(window.__rmThinking) return; window.__rmThinking=true;
  var K_ON='rm-thinking', K_SEEN='rm-thinking-seen';
  var on=false, seen=false;
  try{ on=localStorage.getItem(K_ON)==='1'; seen=!!localStorage.getItem(K_SEEN); }catch(e){}
  var ACC='#1F5FE0', GRID='rgba(255,64,64,.09)', NEST='#9747FF';
  var NOTES=[
    {sel:'nav a[href="#top"]', tip:'tl', t:'Start here. This is my portfolio, built like a design file. Turn Thinking off anytime from the bubble in the corner.'},
    {sel:'nav [data-r="navlinks"]', tip:'tl', t:'Jump straight to Work, Case studies, Experience or About.'},
    {sel:'[data-theme-toggle]', tip:'tl', t:'Light or dark mode. Your choice is remembered for next time.'},
    {sel:'button[title^="Engine"]', tip:'tl', t:'Too much motion? This switches the animations off.'},
    {sel:'#top', sec:1, t:'Hi, I\'m Ritwika, a product and UX designer. The pink columns are the 12-column grid every section sits on.'},
    {sel:'#work', sec:1, t:'Selected case studies. Keep scrolling to move through them, and open any card for the full story.'},
    {sel:'#process', sec:1, t:'A short video on how I work, from first research to shipped product.'},
    {sel:'#experience', sec:1, t:'Where I\'ve worked and what I owned at each place.'},
    {sel:'#about', sec:1, t:'The longer story. This section plays out as you scroll.'},
    {sel:'#playground', sec:1, t:'Side projects and experiments.'},
    {sel:'#contact', sec:1, t:'If something here resonates, this is how to reach me.'}
  ];
  var css=
  '#rmt-ui{position:fixed;inset:0;pointer-events:none;z-index:2147482000;font-family:"Hanken Grotesk",system-ui,sans-serif}'+
  '#rmt-grid{position:absolute;inset:0;display:none}#rmt-grid .c{position:absolute;top:0;bottom:0;margin:0 auto;left:0;right:0;display:grid;grid-template-columns:repeat(12,1fr);column-gap:30px;padding:0 15px;box-sizing:border-box}'+
  '#rmt-grid .c i{background:'+GRID+';border-left:1px solid rgba(255,64,64,.18);border-right:1px solid rgba(255,64,64,.18)}'+
  '#rmt-nest{position:absolute;inset:0}#rmt-nest b{position:absolute;box-sizing:border-box;border:1px dashed '+NEST+';font-weight:400}'+
  '#rmt-nest b.r{border-style:solid;border-color:rgba(151,71,255,.55)}#rmt-nest b span{position:absolute;left:-1px;top:-17px;height:16px;padding:0 5px;background:'+NEST+';color:#fff;font:500 10px/16px "JetBrains Mono",monospace;white-space:nowrap}'+
  '#rmt-nest b.r>span{background:#fff;color:'+NEST+';border:1px solid '+NEST+';line-height:14px}'+
  '.rmt-pin{position:absolute;width:32px;height:32px;pointer-events:auto;cursor:pointer;border:0;padding:0;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.06);display:flex;align-items:center;justify-content:center;transition:transform .15s}'+
  '.rmt-pin:hover{transform:scale(1.08)}.rmt-pin em{width:24px;height:24px;border-radius:50%;background:'+ACC+';color:#fff;font:600 10px/24px "Space Grotesk",sans-serif;font-style:normal;text-align:center}'+
  '.rmt-pin.bl{border-radius:50% 50% 50% 0;transform-origin:0 100%}.rmt-pin.tl{border-radius:0 50% 50% 50%;transform-origin:0 0}'+
  '.rmt-pin.on{box-shadow:0 0 0 2px '+ACC+',0 4px 12px rgba(0,0,0,.2)}.rmt-pin.done em{background:#8A857B}'+
  '.rmt-card{position:absolute;width:300px;pointer-events:auto;background:#fff;color:#1A1814;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.06);overflow:hidden;animation:rmtIn .16s ease-out}'+
  '.rmt-card .h{display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-bottom:1px solid #EEEAE3;font-size:12px;color:#6B665C}'+
  '.rmt-card .h button,.rmt-card .f button{border:0;background:transparent;cursor:pointer;color:inherit;font:inherit;min-width:28px;height:28px;border-radius:6px}.rmt-card .h button:hover,.rmt-card .f button:hover{background:#F2EFE9}'+
  '.rmt-card .b{display:flex;gap:10px;padding:14px 14px 12px}.rmt-card .b>em{flex:none;width:28px;height:28px;border-radius:50%;background:'+ACC+';color:#fff;font:600 11px/28px "Space Grotesk",sans-serif;font-style:normal;text-align:center}'+
  '.rmt-card .n{font-size:13px;font-weight:600}.rmt-card .n small{font-weight:400;color:#8A857B;margin-left:6px;font-size:12px}.rmt-card p{margin:3px 0 0;font-size:14px;line-height:1.45;text-wrap:pretty}'+
  '.rmt-card .f{display:flex;align-items:center;justify-content:space-between;padding:8px 10px 10px 52px;font:12px "JetBrains Mono",monospace;color:#8A857B}.rmt-card .f div{display:flex;gap:6px}'+
  '.rmt-card .f .nx{background:'+ACC+';color:#fff;padding:0 12px;font-family:"Hanken Grotesk",sans-serif;font-size:13px}.rmt-card .f .nx:hover{background:#1A4FC0}'+
  '#rmt-tog{position:fixed;left:20px;bottom:20px;z-index:2147482001;display:flex;align-items:center;gap:10px;height:44px;padding:0 14px 0 6px;border:0;cursor:pointer;background:#fff;color:#1A1814;border-radius:22px 22px 22px 4px;box-shadow:0 4px 16px rgba(0,0,0,.16),0 0 0 1px rgba(0,0,0,.06);font:500 13px "Hanken Grotesk",sans-serif}'+
  '#rmt-tog>em{width:32px;height:32px;border-radius:50%;background:'+ACC+';color:#fff;font:600 11px/32px "Space Grotesk",sans-serif;font-style:normal;text-align:center}'+
  '#rmt-tog .sw{width:28px;height:16px;border-radius:8px;background:#D8D3CA;position:relative;transition:background .2s}#rmt-tog .sw:after{content:"";position:absolute;top:2px;left:2px;width:12px;height:12px;border-radius:50%;background:#fff;transition:transform .2s}'+
  '#rmt-tog[aria-pressed="true"] .sw{background:'+ACC+'}#rmt-tog[aria-pressed="true"] .sw:after{transform:translateX(12px)}'+
  '#rmt-tog .lg{display:none;font:11px "JetBrains Mono",monospace;color:#8A857B;padding-left:10px;border-left:1px solid #EEEAE3}#rmt-tog[aria-pressed="true"] .lg{display:block}'+
  '#rmt-nudge{position:fixed;left:20px;bottom:76px;z-index:2147482001;width:250px;background:#fff;color:#1A1814;border-radius:12px 12px 12px 4px;box-shadow:0 10px 30px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.06);padding:12px 14px;font-size:14px;line-height:1.4;animation:rmtIn .2s ease-out}'+
  '#rmt-nudge b{display:block;font-size:13px;margin-bottom:2px}'+
  '@keyframes rmtIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}'+
  '@media (max-width:640px){#rmt-tog .lg{display:none!important}.rmt-card{width:calc(100vw - 32px)}}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  var ui,grid,nest,pinsEl,tog,nudge,cur=-1,visited={},rows=[],raf=0;
  function el(t,c,h){ var e=document.createElement(t); if(c) e.className=c; if(h!=null) e.innerHTML=h; return e; }
  function bp(){ var w=innerWidth; return w>=1200?'lg':w>=992?'md':w>=768?'sm':'xs'; }
  function cw(){ var w=innerWidth; return w>=1200?1170:w>=992?970:w>=768?750:w; }

  function build(){
    ui=el('div'); ui.id='rmt-ui';
    grid=el('div'); grid.id='rmt-grid'; var c=el('div','c'); for(var i=0;i<12;i++) c.appendChild(el('i')); grid.appendChild(c);
    nest=el('div'); nest.id='rmt-nest'; pinsEl=el('div');
    ui.appendChild(grid); ui.appendChild(nest); ui.appendChild(pinsEl); document.body.appendChild(ui);
    tog=el('button',null,'<em>RM</em><span>Thinking</span><span class="sw"></span><span class="lg"></span>'); tog.id='rmt-tog';
    tog.setAttribute('aria-label','Toggle Thinking: onboarding comments and layout grid');
    tog.onclick=function(){ set(!on); };
    document.body.appendChild(tog);
    if(!seen) setTimeout(function(){ if(on||seen) return; nudge=el('div',null,'<b>Ritwika Mondal</b>New here? Turn on Thinking for a quick tour and to see the grid this site is built on.'); nudge.id='rmt-nudge'; document.body.appendChild(nudge); },2600);
    addEventListener('scroll',tick,{passive:true}); addEventListener('resize',function(){ scan(); tick(); });
    addEventListener('keydown',function(e){ if(!on) return; if(e.key==='Escape') open(-1); });
    setInterval(function(){ if(on) scan(); },2000);
    set(on,true);
  }

  function set(v,init){
    on=v; try{ localStorage.setItem(K_ON,v?'1':'0'); }catch(e){}
    tog.setAttribute('aria-pressed',String(v)); ui.style.display=v?'block':'none';
    if(nudge){ nudge.remove(); nudge=null; }
    if(v){ scan(); tick(); if(!seen&&!init){ seen=true; try{ localStorage.setItem(K_SEEN,'1'); }catch(e){} open(0); } }
    else open(-1);
  }

  function skip(n){ return !n||n.closest('#rmt-ui,#rmt-tog,svg,[data-deck-modal],#rm-intro'); }
  function scan(){
    if(!on) return; rows=[];
    var secs=document.querySelectorAll('nav, section[id]');
    secs.forEach(function(s){
      (function walk(node,depth){
        if(depth>7||rows.length>80) return;
        for(var i=0;i<node.children.length;i++){
          var ch=node.children[i]; if(skip(ch)) continue;
          var cs=getComputedStyle(ch); if(cs.display==='none'||cs.visibility==='hidden') continue;
          var kids=[].filter.call(ch.children,function(k){ var r=k.getBoundingClientRect(); return r.width>24&&r.height>12&&getComputedStyle(k).position!=='absolute'; });
          var r=ch.getBoundingClientRect();
          var isRow=(cs.display.indexOf('grid')>-1&&kids.length>1)||(cs.display.indexOf('flex')>-1&&cs.flexDirection.indexOf('row')===0&&kids.length>1&&r.width>=360);
          if(isRow&&r.width>=200) rows.push({e:ch,kids:kids,d:depth});
          walk(ch,depth+1);
        }
      })(s,0);
    });
  }

  function tick(){ if(!on||raf) return; raf=requestAnimationFrame(function(){ raf=0; draw(); }); }
  function draw(){
    var vh=innerHeight,vw=innerWidth,b=bp();
    var c=grid.firstChild; c.style.maxWidth=cw()+'px'; c.style.columnGap=(vw<768?16:30)+'px'; grid.style.display='block';
    tog.querySelector('.lg').textContent='12 col · '+b+' · '+(vw<768?'fluid':cw()+'px');
    var h='';
    rows.forEach(function(o){
      var r=o.e.getBoundingClientRect(); if(r.bottom<0||r.top>vh||r.width<1) return;
      var lvl=o.d<=1?'.row':'.row.nested';
      h+='<b class="r" style="left:'+r.left+'px;top:'+r.top+'px;width:'+r.width+'px;height:'+r.height+'px"><span>'+lvl+'</span></b>';
      o.kids.forEach(function(k){
        var kr=k.getBoundingClientRect(); if(kr.bottom<0||kr.top>vh) return;
        var n=Math.max(1,Math.min(12,Math.round(kr.width/r.width*12)));
        h+='<b style="left:'+kr.left+'px;top:'+kr.top+'px;width:'+kr.width+'px;height:'+kr.height+'px"><span>.col-'+b+'-'+n+'</span></b>';
      });
    });
    nest.innerHTML=h;
    drawPins();
  }

  function anchor(n){
    var e=document.querySelector(n.sel); if(!e) return null;
    var r=e.getBoundingClientRect(); if(r.width<2||r.height<2) return null;
    if(n.tip==='tl') return {x:r.left+Math.min(r.width-4,r.width*.6),y:r.bottom-4};
    if(r.bottom<120||r.top>innerHeight-60) return null;
    var x=Math.max(r.left+16,(innerWidth-cw())/2+8);
    var y=Math.min(Math.max(r.top+28,92),r.bottom-48);
    return {x:x,y:y};
  }
  function drawPins(){
    pinsEl.innerHTML='';
    NOTES.forEach(function(n,i){
      var a=anchor(n); if(!a) return;
      var tip=n.tip||'bl';
      var p=el('button','rmt-pin '+tip+(cur===i?' on':'')+(visited[i]&&cur!==i?' done':''),'<em>'+(i+1)+'</em>');
      p.setAttribute('aria-label','Comment '+(i+1));
      p.style.left=a.x+'px'; p.style.top=(tip==='tl'?a.y:a.y-32)+'px';
      p.onclick=function(e){ e.stopPropagation(); open(cur===i?-1:i); };
      pinsEl.appendChild(p);
      if(cur===i) card(n,i,a,tip);
    });
  }
  function card(n,i,a,tip){
    var c=el('div','rmt-card',
      '<div class="h"><span>Comment '+(i+1)+'</span><button data-x aria-label="Close">✕</button></div>'+
      '<div class="b"><em>RM</em><div><div class="n">Ritwika Mondal<small>Thinking</small></div><p></p></div></div>'+
      '<div class="f"><span>'+(i+1)+' / '+NOTES.length+'</span><div>'+(i>0?'<button data-p aria-label="Previous">←</button>':'')+'<button class="nx" data-n>'+(i<NOTES.length-1?'Next':'Done')+'</button></div></div>');
    c.querySelector('p').textContent=n.t;
    var w=Math.min(300,innerWidth-32), x=a.x+40, y=tip==='tl'?a.y:a.y-40;
    if(x+w>innerWidth-16) x=Math.max(16,a.x-w-8);
    c.style.left=x+'px'; c.style.top=Math.max(70,Math.min(y,innerHeight-200))+'px';
    c.onclick=function(e){ e.stopPropagation(); };
    c.querySelector('[data-x]').onclick=function(){ open(-1); };
    c.querySelector('[data-n]').onclick=function(){ open(i<NOTES.length-1?i+1:-1,true); };
    var pv=c.querySelector('[data-p]'); if(pv) pv.onclick=function(){ open(i-1,true); };
    pinsEl.appendChild(c);
  }
  function open(i,go){
    if(cur>-1) visited[cur]=1; cur=i;
    if(i>-1&&go){
      var n=NOTES[i], e=document.querySelector(n.sel);
      if(e&&n.sec){ var r=e.getBoundingClientRect(); if(r.top>innerHeight*.6||r.bottom<200) window.scrollTo({top:scrollY+r.top-70,behavior:'smooth'}); }
      if(e&&n.tip==='tl'&&scrollY>0&&!e.closest('nav')) window.scrollTo({top:0,behavior:'smooth'});
    }
    if(on) draw();
  }
  document.addEventListener('click',function(){ if(on&&cur>-1) open(-1); });

  if(document.body) setTimeout(build,0); else document.addEventListener('DOMContentLoaded',build);
})();
