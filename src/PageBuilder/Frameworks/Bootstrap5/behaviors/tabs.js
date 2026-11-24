/* ceiba-cms tabs (plan 05-C): WAI-ARIA tabs over sections that are readable without JavaScript. */
(function () {
  if (window.__cmsTabs) return;
  window.__cmsTabs = true;
  var count = 0;
  function init(root) {
    if (root.hasAttribute('data-ready')) return;
    var panels = Array.prototype.filter.call(root.children, function (c) { return c.classList.contains('cms-tab-panel'); });
    if (panels.length === 0) return;
    var list = document.createElement('div');
    list.setAttribute('role', 'tablist');
    list.className = 'nav nav-tabs mb-3';
    if (root.getAttribute('data-cms-label')) list.setAttribute('aria-label', root.getAttribute('data-cms-label'));
    var tabs = panels.map(function (panel) {
      var id = 'cms-tabs-' + (++count);
      var heading = panel.querySelector(':scope > .cms-tab-title');
      var tab = document.createElement('button');
      tab.type = 'button';
      tab.className = 'nav-link';
      tab.id = id + '-tab';
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', id);
      tab.textContent = heading ? heading.textContent : id;
      if (heading) heading.hidden = true;
      panel.id = id;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', tab.id);
      panel.tabIndex = 0;
      list.appendChild(tab);
      return tab;
    });
    function select(index, focus) {
      tabs.forEach(function (tab, i) {
        var on = i === index;
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
        tab.tabIndex = on ? 0 : -1;
        tab.classList.toggle('active', on);
        panels[i].hidden = !on;
      });
      if (focus) tabs[index].focus();
    }
    list.addEventListener('click', function (event) {
      var index = tabs.indexOf(event.target.closest('[role="tab"]'));
      if (index >= 0) select(index, false);
    });
    list.addEventListener('keydown', function (event) {
      var index = tabs.indexOf(document.activeElement);
      var last = tabs.length - 1;
      var next = { ArrowRight: index === last ? 0 : index + 1, ArrowLeft: index === 0 ? last : index - 1, Home: 0, End: last }[event.key];
      if (index < 0 || next === undefined) return;
      event.preventDefault();
      select(next, true);
    });
    root.insertBefore(list, root.firstChild);
    root.setAttribute('data-ready', '');
    select(0, false);
  }
  function all() { document.querySelectorAll('[data-cms-tabs]').forEach(init); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', all); else all();
})();
