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

  it('refuse invalid sources, variables and numbers', () => {
    const base = loopToForm({ source: 'api:https://api.test/items' });
    expect(formToLoop({ ...base, api: 'javascript:alert(1)' })).toEqual({ error: 'loop.source' });
    expect(formToLoop({ ...base, sourceType: 'module', module: ' ' })).toEqual({ error: 'loop.source' });
    expect(formToLoop({ ...base, variable: 'a-b' })).toEqual({ error: 'loop.variable' });
    expect(formToLoop({ ...base, limit: '-1' })).toEqual({ error: 'loop.number' });
    expect(formToLoop({ ...base, limit: '' })).toEqual({ loop: { source: 'api:https://api.test/items', variable: 'item', key: 'id' } });
  });
});
