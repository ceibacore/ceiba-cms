import '../src/ui/index';
import type { CeibaPageBuilder } from '../src/ui/index';
import { MemoryServer } from './memory-server';

// Two editors on one plain HTML page: they must not share selection, history or sessions (plan 03-B).
const editor = ['pages.read', 'pages.update'];
const publisher = [...editor, 'pages.publish'];
const servers = {
  a: new MemoryServer('page-a', [], editor),
  b: new MemoryServer('page-b', [
    { id: 'hero', type: 'container', props: { fluid: false }, children: [
      { id: 'title', type: 'heading', props: { text: 'Second page', level: 1 }, children: [] },
      { id: 'cta', type: 'button', props: { label: 'Go', url: 'https://example.com' }, children: [] },
      { id: 'legacy', type: 'carousel-pro', props: { speed: 300 }, children: [] },
      { id: 'embed', type: 'html', props: { content: '<script>parent.HACKED = true</script>' }, children: [] },
    ] },
  ], publisher),
};
// ?dynamic=1 gives editor b a query block (plan 07-C): a card per course, pages and a visitor filter.
if (new URLSearchParams(location.search).get('dynamic') === '1') {
  const b = servers.b.revisions.get(1)!;
  b.root = [{ id: 'list', type: 'query', props: { id: 'courses', source: 'host:courses', page_size: 2, pagination: true,
    url_params: [{ param: 'level', target: 'filter', field: 'level', op: 'eq' }] }, children: [
    { id: 'filter', type: 'query_filter', props: { param: 'level', kind: 'select', label: 'Level' }, children: [] },
    { id: 'item', type: 'container', props: { fluid: false }, loop: { query: '', variable: 'course' }, children: [
      { id: 'name', type: 'heading', props: { text: 'Course', level: 3 }, bindings: { text: { field: 'title' } }, children: [] },
      { id: 'go', type: 'button', props: { label: 'From {{ course.price }}', url: '#' }, bindings: { url: { field: 'url', fallback: '/courses' } }, children: [] },
    ] },
    { id: 'none', type: 'query_state', props: { show: 'empty' }, children: [{ id: 'none-text', type: 'text', props: { content: 'No courses' }, children: [] }] },
    { id: 'pages', type: 'pagination', props: {}, children: [] },
  ] }];
}
// ?autosave=ms turns autosave on with that quiet time (off by default so the other tests stay deterministic).
const autosaveMs = Number(new URLSearchParams(location.search).get('autosave'));
// ?sitePart=1 opens editor b as a site part (plan 06-C).
const sitePart = new URLSearchParams(location.search).get('sitePart') === '1';
const events: string[] = [];
Object.assign(window, { servers, events });

for (const [key, server] of Object.entries(servers)) {
  const element = document.querySelector<CeibaPageBuilder>(`#editor-${key}`);
  if (!element) continue;
  for (const name of ['ready', 'selection-change', 'dirty-change', 'save-success', 'save-error', 'conflict', 'publish-success']) {
    element.addEventListener(name, (event) => events.push(`${key}:${name}:${JSON.stringify((event as CustomEvent).detail)}`));
  }
  element.config = {
    pageId: `page-${key}`, transport: server.transport(), locale: key === 'a' ? 'es' : 'en', sitePart: sitePart && key === 'b',
    autosave: autosaveMs > 0 ? { idleMs: autosaveMs, maxWaitMs: autosaveMs * 5 } : false,
  };
}
