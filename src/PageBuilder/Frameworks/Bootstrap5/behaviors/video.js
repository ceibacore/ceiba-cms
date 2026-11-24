/* ceiba-cms video (plan 05 D-2): the player is created only when the visitor presses play. */
(function () {
  if (window.__cmsVideo) return;
  window.__cmsVideo = true;
  var allowed = /^https:\/\/(www\.youtube-nocookie\.com\/embed\/[A-Za-z0-9_-]{11}|player\.vimeo\.com\/video\/[0-9]{6,12})\?/;
  document.addEventListener('click', function (event) {
    var button = event.target instanceof Element ? event.target.closest('.cms-video-play') : null;
    var box = button && button.closest('[data-cms-video]');
    if (!box || !allowed.test(box.getAttribute('data-cms-video') || '')) return;
    var frame = document.createElement('iframe');
    frame.src = box.getAttribute('data-cms-video');
    frame.title = box.getAttribute('data-cms-video-title') || '';
    frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    box.replaceChildren(frame);
    box.style.backgroundImage = '';
    frame.focus();
  });
})();
