/* ceiba-cms carousel (plan 05-C): one slide at a time with previous/next; rotation pauses on hover and focus,
   has a pause button, and never starts with prefers-reduced-motion. Without JavaScript the slides scroll. */
(function () {
  if (window.__cmsCarousel) return;
  window.__cmsCarousel = true;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function init(root) {
    var track = root.querySelector(':scope > .cms-carousel-track');
    var slides = track ? Array.prototype.filter.call(track.children, function (s) { return s.classList.contains('cms-carousel-slide'); }) : [];
    if (root.hasAttribute('data-ready') || slides.length < 2) return;
    var labels = (root.getAttribute('data-cms-labels') || '').split('|');
    var interval = parseInt(root.getAttribute('data-cms-carousel') || '0', 10) || 0;
    var playing = interval > 0 && !reduced;
    var index = 0;
    var timer = null;
    var live = document.createElement('div');
    live.className = 'visually-hidden';
    root.setAttribute('aria-roledescription', 'carousel');
    slides.forEach(function (slide, i) {
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', (i + 1) + ' / ' + slides.length);
    });
    function button(text, name) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn btn-light btn-sm ' + name;
      b.textContent = text;
      return b;
    }
    var controls = document.createElement('div');
    controls.className = 'cms-carousel-controls';
    var toggle = interval > 0 ? button('', 'cms-carousel-toggle') : null;
    function show(next, announce) {
      index = (next + slides.length) % slides.length;
      slides.forEach(function (slide, i) { slide.hidden = i !== index; });
      live.textContent = announce ? slides[index].getAttribute('aria-label') : '';
    }
    function stop() { if (timer) clearInterval(timer); timer = null; }
    function start() { stop(); if (playing) timer = setInterval(function () { show(index + 1, false); }, interval); }
    function setPlaying(on) {
      playing = on;
      live.setAttribute('aria-live', on ? 'off' : 'polite');
      if (toggle) toggle.textContent = on ? labels[2] || 'Pause' : labels[3] || 'Play';
      if (on) start(); else stop();
    }
    var prev = button(labels[0] || 'Previous', 'cms-carousel-prev');
    var next = button(labels[1] || 'Next', 'cms-carousel-next');
    prev.addEventListener('click', function () { show(index - 1, true); });
    next.addEventListener('click', function () { show(index + 1, true); });
    if (toggle) toggle.addEventListener('click', function () { setPlaying(!playing); });
    [prev, next, toggle].forEach(function (b) { if (b) controls.appendChild(b); });
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', function (event) { if (!root.contains(event.relatedTarget)) start(); });
    root.appendChild(controls);
    root.appendChild(live);
    root.setAttribute('data-ready', '');
    show(0, false);
    setPlaying(playing);
  }
  function all() { document.querySelectorAll('[data-cms-carousel]').forEach(init); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', all); else all();
})();
