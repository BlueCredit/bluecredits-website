/* BlueCredit website: the menu button on phones (the nav links open as a panel). */
(function () {
  var nav = document.querySelector('nav'); if (!nav || nav.querySelector('.n-burger')) return;
  var left = nav.querySelector('.n-left'), right = nav.querySelector('.n-right'); if (!left || !right) return;
  var b = document.createElement('button'); b.type = 'button'; b.className = 'n-burger'; b.setAttribute('aria-label', 'Menu'); b.setAttribute('aria-expanded', 'false');
  var OPEN = '<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round"/></svg>', CLOSE = '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg>';
  b.innerHTML = OPEN; right.appendChild(b);
  // the links that sit on the right on a computer go at the end of the phone menu
  [['newsroom.html', 'Newsroom']].forEach(function (x) { if (left.querySelector('.m-extra[href="' + x[0] + '"]')) return; var a = document.createElement('a'); a.href = x[0]; a.className = 'm-extra'; a.textContent = x[1]; a.style.display = 'none'; left.appendChild(a); });
  var set = function (on) { nav.classList.toggle('m-open', on); b.setAttribute('aria-expanded', on ? 'true' : 'false'); b.innerHTML = on ? CLOSE : OPEN; document.documentElement.style.overflow = on ? 'hidden' : ''; };
  b.addEventListener('click', function (e) { e.stopPropagation(); set(!nav.classList.contains('m-open')); });
  left.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
  window.addEventListener('resize', function () { if (window.innerWidth > 960 && nav.classList.contains('m-open')) set(false); });
  var mq = window.matchMedia('(max-width: 960px)'), sync = function () { left.querySelectorAll('.m-extra').forEach(function (a) { a.style.display = mq.matches ? '' : 'none'; }); };
  sync(); mq.addEventListener ? mq.addEventListener('change', sync) : mq.addListener(sync);
})();
