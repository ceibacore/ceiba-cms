import { expect, test } from '@playwright/test';

// Plan 05-C in the editor: tabs, accordion and carousel hold only their own items, and the canvas shows the
// markup a visitor without JavaScript gets (every panel readable and editable).
test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#editor-b').getByText('Saved', { exact: true })).toBeVisible();
});

test('tabs take tab panels only, and every panel is drawn on the canvas', async ({ page }) => {
  const b = page.locator('#editor-b');
  const canvas = b.frameLocator('iframe[title="Page canvas"]');
  await b.getByRole('treeitem', { name: 'Heading' }).click();
  await b.getByRole('button', { name: 'Insert Tab panel', exact: true }).click();
  await expect(b.getByRole('alert')).toHaveText('That element cannot be placed there.');

  await b.getByRole('button', { name: 'Insert Tabs', exact: true }).click();
  await b.getByLabel('Name for screen readers').fill('Plans');
  for (const title of ['Basic', 'Pro']) {
    await b.getByRole('treeitem', { name: 'Tabs' }).click();
    await b.getByRole('button', { name: 'Insert Tab panel', exact: true }).click();
    await b.getByLabel('Tab title').fill(title);
  }
  await expect(canvas.locator('.cms-tabs[data-cms-label="Plans"] > section.cms-tab-panel > h3')).toHaveText(['Basic', 'Pro']);
  await b.getByRole('button', { name: 'Insert Text Block' }).click();
  await expect(canvas.locator('.cms-tab-panel').nth(1).locator('p')).toHaveText('Paragraph text');
});

test('accordion items stay open on the canvas; the carousel lists its slides side by side', async ({ page }) => {
  const b = page.locator('#editor-b');
  const canvas = b.frameLocator('iframe[title="Page canvas"]');
  await b.getByRole('treeitem', { name: 'Heading' }).click();
  await b.getByRole('button', { name: 'Insert Accordion', exact: true }).click();
  await b.getByRole('button', { name: 'Insert Accordion item', exact: true }).click();
  await b.getByLabel('Title', { exact: true }).fill('Question');
  await b.getByRole('button', { name: 'Insert Text Block' }).click();
  await expect(canvas.locator('details.cms-accordion-item')).toHaveAttribute('open', '');
  await expect(canvas.locator('details summary')).toHaveText('Question');
  await expect(canvas.locator('details .cms-accordion-body p')).toBeVisible();

  await b.getByRole('treeitem', { name: 'Heading' }).click();
  await b.getByRole('button', { name: 'Insert Carousel', exact: true }).click();
  await b.getByLabel('Rotate by itself').check();
  await b.getByLabel('Seconds per slide (3–15)').fill('99');
  for (let i = 0; i < 2; i++) {
    await b.getByRole('treeitem', { name: 'Carousel', exact: true }).click();
    await b.getByRole('button', { name: 'Insert Carousel slide', exact: true }).click();
  }
  const carousel = canvas.locator('.cms-carousel');
  await expect(carousel).toHaveAttribute('data-cms-carousel', '15000');
  await expect(carousel.locator('.cms-carousel-track > .cms-carousel-slide')).toHaveCount(2);
  await expect.poll(() => carousel.locator('.cms-carousel-track').evaluate((el) => getComputedStyle(el).display)).toBe('flex');
});
