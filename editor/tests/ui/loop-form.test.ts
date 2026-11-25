import { describe, expect, it } from 'vitest';
import { formToLoop, loopToForm } from '../../src/ui/inspector/advanced/loop';

describe('loop fields', () => {
  it('round-trip a module loop with limits, filters and sort', () => {
    const loop = { source: 'module:courses', variable: 'course', key: 'id', limit: 6, offset: 2,
      filters: { status: 'published', level: '1' }, sort: { column: 'created_at', direction: 'ASC' } };
    expect(formToLoop(loopToForm(loop))).toEqual({ loop });
  });

  it('read missing loops as none and remove them', () => {
    expect(loopToForm(null).sourceType).toBe('none');
    expect(formToLoop(loopToForm(undefined))).toEqual({ loop: null });
  });

  it('refuse free URLs, invalid sources, variables and numbers', () => {
    const base = loopToForm({ source: 'host:marketplace.products' });
    expect(base).toMatchObject({ sourceType: 'host', host: 'marketplace.products' });
    expect(loopToForm({ source: 'api:https://api.test/items' }).sourceType).toBe('none');
    expect(formToLoop({ ...base, host: 'https://evil.test' })).toEqual({ error: 'loop.source' });
    expect(formToLoop({ ...base, sourceType: 'module', module: ' ' })).toEqual({ error: 'loop.source' });
    expect(formToLoop({ ...base, variable: 'a-b' })).toEqual({ error: 'loop.variable' });
    expect(formToLoop({ ...base, limit: '-1' })).toEqual({ error: 'loop.number' });
    expect(formToLoop({ ...base, limit: '' })).toEqual({ loop: { source: 'host:marketplace.products', variable: 'item', key: 'id' } });
  });

  it('repeat over the enclosing query block (plan 07-B)', () => {
    const form = loopToForm({ query: '', variable: 'course' });
    expect(form.sourceType).toBe('query');
    expect(formToLoop(form)).toEqual({ loop: { query: '', variable: 'course' } });
    expect(formToLoop({ ...form, variable: '1x' })).toEqual({ error: 'loop.variable' });
  });
});
