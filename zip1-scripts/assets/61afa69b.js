(function(){
  var modalParent = function(){ try { return window.parent !== window && typeof window.parent.__closeDeck === 'function' ? window.parent : null; } catch(e){ return null; } };
  document.addEventListener('click', function(e){
    var t = e.target; if (t && t.nodeType !== 1) t = t.parentElement;
    var a = t && t.closest && t.closest('a[href]'); if(!a) return;
    var href = a.getAttribute('href');
    if (!/\.dc\.html(#.*)?$/i.test(href) && !/^index\.html/i.test(href)) return;
    var home = /^(Portfolio|index)/i.test(href);
    e.preventDefault(); e.stopPropagation();
    var mp = modalParent();
    if (mp && home) { mp.__closeDeck(); return; }
    var url = new URL(home ? 'Portfolio.dc.html' : href, location.href).href;
    if (mp) { try { mp.location.href = url; return; } catch(err){} }
    window.location.href = url;
  }, true);
})();
