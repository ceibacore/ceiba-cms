import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

// Plan 05-C: the public markup (fixtures/components, as the Bootstrap 5 views give it) with the module's
// behaviour scripts: WAI-ARIA keyboard patterns, content readable without JavaScript, reduced motion respected.
const root = fileURLToPath(new URL('../../', import.meta.url));
const script = (name: string): string => readFileSync(`${root}src/PageBuilder/Frameworks/Bootstrap5/behaviors/${name}`, 'utf8');
const css = `${script('components.css')} .visually-hidden{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}`;
const fixture = (name: string, i = 0): string =>
  (JSON.parse(readFileSync(`${root}fixtures/components/${name}.json`, 'utf8')) as { cases: { html: string }[] }).cases[i]!.html;

const TABS = '<div class="cms-tabs" data-cms-tabs="1" data-cms-label="Plans">'
  + ['Basic', 'Pro', 'Team'].map((t) => `<section class="cms-tab-panel"><h3 class="cms-tab-title">${t}</h3><p>${t} plan</p></section>`).join('') + '</div>';
const SLIDES = (interval: number): string => `<div class="cms-carousel" role="region" aria-label="News" data-cms-carousel="${interval}" `
  + 'data-cms-labels="Anterior|Siguiente|Pausa|Reproducir"><div class="cms-carousel-track">'
  + [1, 2, 3].map((n) => `<div class="cms-carousel-slide"><p>Slide ${n}</p></div>`).join('') + '</div></div>';

const load = async (page: Page, html: string, scripts: string[]): Promise<void> => {
  await page.setContent(`<!doctype html><html lang="en"><head><style>${css}</style></head><body>${html}<a href="#">after</a></body></html>`);
  for (const name of scripts) await page.addScriptTag({ content: script(name) });
};

test('without JavaScript every panel, item and slide can be read', async ({ page }) => {
  await load(page, TABS + fixture('10-accordion') + SLIDES(3000), []);
  for (const text of ['Basic plan', 'Pro plan', 'Team plan', 'Slide 1', 'Slide 2', 'Slide 3']) {
    await expect(page.getByText(text)).toBeAttached();
  }
  await expect(page.getByRole('heading', { name: 'Pro' })).toBeVisible();
  await expect(page.locator('details').first()).toHaveAttribute('open', '');
});

test('tabs follow the WAI-ARIA pattern: arrows, Home and End move and select, Tab goes to the panel', async ({ page }) => {
  await load(page, TABS, ['tabs.js']);
  const list = page.getByRole('tablist', { name: 'Plans' });
  const tabs = list.getByRole('tab');
  await expect(tabs).toHaveText(['Basic', 'Pro', 'Team']);
  await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel', { name: 'Basic' })).toBeVisible();
  await expect(page.getByText('Pro plan')).toBeHidden();

  await tabs.first().focus();
  await page.keyboard.press('ArrowRight');
  await expect(tabs.nth(1)).toBeFocused();
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel', { name: 'Pro' })).toBeVisible();
  await page.keyboard.press('End');
  await expect(tabs.nth(2)).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(tabs.first()).toBeFocused();
  await page.keyboard.press('ArrowLeft');
  await expect(tabs.nth(2)).toHaveAttribute('tabindex', '0');
  await expect(tabs.first()).toHaveAttribute('tabindex', '-1');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('tabpanel', { name: 'Team' })).toBeFocused();
});

test('the accordion opens with the keyboard and keeps one item open when asked', async ({ page }) => {
  await load(page, fixture('10-accordion'), ['accordion.js']);
  const [first, second] = [page.locator('details').first(), page.locator('details').nth(1)];
  await page.getByText('Q2').focus();
  await page.keyboard.press('Enter');
  await expect(second).toHaveAttribute('open', '');
  await expect(first).not.toHaveAttribute('open');
  await page.keyboard.press('Space');
  await expect(second).not.toHaveAttribute('open');
});

test('the carousel shows one slide, moves with its buttons, pauses on focus and has a pause button', async ({ page }) => {
  await page.clock.install();
  await load(page, SLIDES(3000), ['carousel.js']);
  const region = page.getByRole('region', { name: 'News' });
  await expect(region).toHaveAttribute('aria-roledescription', 'carousel');
  await expect(page.getByText('Slide 1')).toBeVisible();
  await expect(page.getByText('Slide 2')).toBeHidden();
  await page.clock.runFor(3100);
  await expect(page.getByText('Slide 2')).toBeVisible();

  await page.getByRole('button', { name: 'Siguiente' }).focus();
  await page.clock.runFor(10000);
  await expect(page.getByText('Slide 2')).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page.getByText('Slide 3')).toBeVisible();
  await expect(region.locator('[aria-live="polite"], [aria-live="off"]')).toHaveCount(1);
  await page.getByRole('button', { name: 'Pausa' }).click();
  await expect(page.getByRole('button', { name: 'Reproducir' })).toBeVisible();
  await expect(region.locator('[aria-live="polite"]')).toHaveText('3 / 3');
  await page.getByRole('button', { name: 'Anterior' }).click();
  await expect(page.getByText('Slide 2')).toBeVisible();
  await expect(page.getByRole('group', { name: '2 / 3' })).toBeVisible();
});

test('with prefers-reduced-motion the carousel never rotates by itself', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.clock.install();
  await load(page, SLIDES(3000), ['carousel.js']);
  await page.clock.runFor(20000);
  await expect(page.getByText('Slide 1')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Reproducir' })).toBeVisible();
});
