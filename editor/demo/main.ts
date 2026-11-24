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
