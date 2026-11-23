import { expect, test } from '@playwright/test';

type Demo = { servers: Record<string, { design: { revision: number; published: number | null } }> };

// Plan 04-D: site tokens, classes and breakpoints edited, saved as a draft and published; tokens in use are kept.
test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#editor-b').getByText('Saved', { exact: true })).toBeVisible();
});

test('a token change shows on the canvas at once, then is saved and published', async ({ page }) => {
  const b = page.locator('#editor-b');
  await b.getByRole('treeitem', { name: 'Heading' }).click();
  await b.getByText('Typography').click();
  await b.getByLabel('Token · Color').selectOption('color.brand');
  const heading = b.frameLocator('iframe[title="Page canvas"]').locator('h1');
  await expect.poll(() => heading.evaluate((el) => getComputedStyle(el).color)).toBe('rgb(185, 28, 28)');

  await b.getByRole('button', { name: 'Site design' }).click();
  const panel = b.getByRole('region', { name: 'Site design' });
  await panel.getByLabel('Value · color.brand').fill('nope;');
  await panel.getByLabel('Value · color.brand').press('Tab');
  await expect(panel.getByRole('alert')).toHaveText('Invalid value for this type.');
  await panel.getByLabel('Value · color.brand').fill('#1d4ed8');
  await panel.getByLabel('Value · color.brand').press('Tab');
  await expect.poll(() => heading.evaluate((el) => getComputedStyle(el).color)).toBe('rgb(29, 78, 216)');

  await panel.getByRole('button', { name: 'Save draft' }).click();
  await expect(panel.getByText('Revision 2 · Published: 1')).toBeVisible();
  await panel.getByRole('button', { name: 'Publish design' }).click();
  await expect(panel.getByText('Revision 2 · Published: 2')).toBeVisible();
  const store = await page.evaluate(() => (window as unknown as Demo).servers.b?.design);
  expect([store?.revision, store?.published]).toEqual([2, 2]);
});

test('a token used by the page cannot be deleted; a new class gets styles and unordered breakpoints are refused', async ({ page }) => {
  const b = page.locator('#editor-b');
  await b.getByRole('treeitem', { name: 'Heading' }).click();
  await b.getByText('Typography').click();
  await b.getByLabel('Token · Color').selectOption('color.brand');
  await b.getByRole('button', { name: 'Save', exact: true }).click();

  await b.getByRole('button', { name: 'Site design' }).click();
  const panel = b.getByRole('region', { name: 'Site design' });
  await panel.getByRole('button', { name: 'Delete color.brand' }).click();
  await expect(panel.getByRole('alert')).toContainText('color.brand is in use and cannot be deleted');
  await panel.getByRole('button', { name: 'Delete space.lg' }).click();
  await expect(panel.getByRole('alert')).toContainText('space.lg is in use and cannot be deleted: class Hero');

  await panel.getByRole('tab', { name: 'Classes' }).click();
  await panel.getByLabel('Identifier').fill('card');
  await panel.getByLabel('Name', { exact: true }).fill('Card');
  await panel.getByRole('button', { name: 'Add' }).click();
  await expect(panel.getByText('Styles of the class Card')).toBeVisible();

  await panel.getByRole('tab', { name: 'Breakpoints' }).click();
  await panel.getByLabel('Minimum width (px)').first().fill('900');
  await panel.getByLabel('Minimum width (px)').first().press('Tab');
  await expect(panel.getByText('design.breakpoints')).toBeVisible();
  await expect(panel.getByRole('button', { name: 'Save draft' })).toBeDisabled();
  await panel.getByRole('button', { name: 'Discard and reload' }).click();
  await expect(panel.getByRole('button', { name: 'Save draft' })).toBeDisabled();
  await expect(panel.getByLabel('Minimum width (px)').first()).toHaveValue('576');
});
