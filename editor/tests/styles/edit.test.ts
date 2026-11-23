import { describe, expect, it } from 'vitest';
import { BASE, createHttpTransport, effectiveValue, setClasses, setDeclaration } from '../../src/core';
import type { DesignDocument, NodeStyles } from '../../src/core';

const design: DesignDocument = {
  breakpoints: [{ id: 'sm', minWidth: 576 }, { id: 'md', minWidth: 768 }, { id: 'lg', minWidth: 992 }],
  tokens: { 'color.brand': { type: 'color', value: '#f00' } },
  classes: { hero: { styles: { base: { padding: '4rem', color: { token: 'color.brand' } }, breakpoints: { md: { padding: '6rem' } } } },
    card: { styles: { base: { padding: '1rem' } } } },
};
const md = { breakpoint: 'md', state: null };

describe('style editing', () => {
  it('sets and removes declarations; removing prunes empty blocks so the value is inherited again', () => {
    let styles: NodeStyles | null = setDeclaration(undefined, BASE, 'padding', '1rem');
    styles = setDeclaration(styles ?? undefined, md, 'padding', '2rem');
    styles = setDeclaration(styles ?? undefined, { breakpoint: null, state: 'hover' }, 'color', { token: 'color.brand' });
    expect(styles).toEqual({ base: { padding: '1rem' }, breakpoints: { md: { padding: '2rem' } }, states: { hover: { color: { token: 'color.brand' } } } });
    styles = setDeclaration(styles ?? undefined, md, 'padding', null);
    styles = setDeclaration(styles ?? undefined, { breakpoint: null, state: 'hover' }, 'color', null);
    expect(styles).toEqual({ base: { padding: '1rem' } });
    expect(setDeclaration(styles ?? undefined, BASE, 'padding', null)).toBeNull();
    expect(setClasses({ classes: ['hero'] }, [])).toBeNull();
    expect(setClasses(undefined, ['hero', 'card'])).toEqual({ classes: ['hero', 'card'] });
  });

  it('reports the effective value and where it comes from (node beats class, smaller widths cascade up)', () => {
    const styles: NodeStyles = { classes: ['card', 'hero'], base: { margin: '0 auto' }, breakpoints: { sm: { margin: '1rem' } } };
    expect(effectiveValue(styles, design, BASE, 'margin')).toEqual({ value: '0 auto', origin: 'own', from: 'base' });
    expect(effectiveValue(styles, design, md, 'margin')).toEqual({ value: '1rem', origin: 'inherited', from: 'sm' });
    expect(effectiveValue(styles, design, md, 'padding')).toEqual({ value: '6rem', origin: 'class', from: 'hero' });
    expect(effectiveValue(styles, design, BASE, 'padding')).toEqual({ value: '4rem', origin: 'class', from: 'hero' });
    expect(effectiveValue({ classes: ['card'] }, design, BASE, 'padding')).toEqual({ value: '1rem', origin: 'class', from: 'card' });
    expect(effectiveValue(styles, design, { breakpoint: null, state: 'hover' }, 'margin')).toEqual({ value: '0 auto', origin: 'inherited', from: 'base' });
    expect(effectiveValue(undefined, design, md, 'width')).toBeNull();
  });

  it('the HTTP transport loads, saves and publishes the site design', async () => {
    const calls: [string, RequestInit][] = [];
    const reply = (data: unknown) => createHttpTransport({ baseUrl: '/b', fetch: (async (url: string, init?: RequestInit) => {
      calls.push([url, init ?? {}]);
      return new Response(JSON.stringify({ success: true, data }), { status: 200 });
    }) as typeof fetch });
    expect(await reply({ revision: 3, publishedRevision: 2, design }).loadDesign?.()).toEqual({ revision: 3, publishedRevision: 2, design });
    expect(await reply({ revision: 4 }).saveDesign?.(design, 3)).toEqual({ revision: 4 });
    expect(await reply({ revision: 4 }).publishDesign?.(4)).toEqual({ revision: 4 });
    expect(await reply({ pages: [{ pageId: 'p', title: 'Home' }] }).designUsages?.('token', 'color.brand')).toEqual([{ pageId: 'p', title: 'Home' }]);
    expect(calls.map(([url, init]) => [init.method ?? 'GET', url])).toEqual([
      ['GET', '/b/design'], ['PUT', '/b/design'], ['POST', '/b/design/publish'], ['GET', '/b/design/usages?token=color.brand'],
    ]);
    expect((calls[1]?.[1].headers as Record<string, string>)['If-Match']).toBe('"3"');
  });
});
