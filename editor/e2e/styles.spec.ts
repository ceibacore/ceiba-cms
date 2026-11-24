import { expect, test } from '@playwright/test';

// Plan 04-C: styles per width and state from the inspector; the canvas width applies the site breakpoints.
test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#editor-b').getByText('Saved', { exact: true })).toBeVisible();
});

const paddingTop = (page: import('@playwright/test').Page) =>
  page.locator('#editor-b').frameLocator('iframe[title="Page canvas"]').locator('h1').evaluate((el) => getComputedStyle(el).paddingTop);

test('a style set on base and overridden at md shows at each canvas width; removing it inherits again', async ({ page }) => {
  const b = page.locator('#editor-b');
  await b.getByRole('treeitem', { name: 'Heading' }).click();
  await b.getByText('Spacing').click();
  const padding = b.getByLabel('Padding', { exact: true });
  await padding.fill('8px');
  await padding.press('Tab');
  await expect.poll(() => paddingTop(page)).toBe('8px');

  await b.getByRole('radio', { name: 'md · 768px' }).click();
  await expect(b.getByText('Inherited from base')).toBeVisible();
  await padding.fill('24px');
  await padding.press('Tab');
  await expect.poll(() => paddingTop(page)).toBe('24px');
  await b.getByRole('radio', { name: 'Phone (base)' }).click();
  await expect.poll(() => paddingTop(page)).toBe('8px');

  await b.getByRole('radio', { name: 'md · 768px' }).click();
  await b.getByRole('button', { name: 'Remove Padding at this width' }).click();
  await expect.poll(() => paddingTop(page)).toBe('8px');

  await b.getByRole('button', { name: 'Save', exact: true }).click();
  const saved = JSON.stringify(await page.evaluate(() => (window as unknown as { servers: { b: { latest(): unknown } } }).servers.b.latest()));
  expect(saved).toContain('"styles":{"base":{"padding":"8px"}}');
});

test('unsafe values are refused; tokens and site classes apply', async ({ page }) => {
  const b = page.locator('#editor-b');
  await b.getByRole('treeitem', { name: 'Heading' }).click();
  await b.getByText('Typography', { exact: true }).click();
  const color = b.getByLabel('Color', { exact: true });
  await color.fill('red;}body{display:none');
  await color.press('Tab');
  await expect(b.getByText('Value not allowed for this property.')).toBeVisible();

  await b.getByLabel('Token · Color').selectOption('color.brand');
  const heading = b.frameLocator('iframe[title="Page canvas"]').locator('h1');
  await expect.poll(() => heading.evaluate((el) => getComputedStyle(el).color)).toBe('rgb(185, 28, 28)');

  await b.getByLabel('Site classes').selectOption('hero');
  await expect(heading).toHaveClass(/cms-c-hero/);
  await expect.poll(() => heading.evaluate((el) => getComputedStyle(el).paddingTop)).toBe('48px');
  await b.getByRole('button', { name: 'Remove the class Hero' }).click();
  await expect(heading).not.toHaveClass(/cms-c-hero/);
});
