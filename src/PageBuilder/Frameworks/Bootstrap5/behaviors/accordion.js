/* ceiba-cms accordion (plan 05-C): <details> items; with data-cms-single only one stays open. */
(function () {
  if (window.__cmsAccordion) return;
  window.__cmsAccordion = true;
  document.addEventListener('toggle', function (event) {
    var item = event.target;
    if (!(item instanceof HTMLDetailsElement) || !item.open || !item.classList.contains('cms-accordion-item')) return;
    var root = item.parentElement;
    if (!root || root.getAttribute('data-cms-single') !== '1') return;
    Array.prototype.forEach.call(root.children, function (other) {
      if (other !== item && other instanceof HTMLDetailsElement) other.open = false;
    });
  }, true);
})();
