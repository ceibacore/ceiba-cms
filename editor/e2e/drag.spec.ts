import { expect, test } from '@playwright/test';
import { cdpMouse, dragTo, point, treeOrder } from './support';

// Plan 03-C: drag between containers with a drop indicator, Escape to cancel, invalid moves blocked.
test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#editor-b').getByText('Saved')).toBeVisible();
  // Mouse drags use page coordinates: the editor must be inside the viewport.
  await page.locator('#editor-b').evaluate((element) => element.scrollIntoView({ block: 'start' }));
});

test('a node is dragged below another one', async ({ page }) => {
  const b = page.locator('#editor-b');
  const canvas = b.frameLocator('iframe');
  const mouse = await cdpMouse(page);
  await dragTo(mouse, await point(canvas.locator('h1')), await point(canvas.getByText('Go'), 0.9));
  await expect(canvas.locator('#ceiba-drop-indicator')).toHaveAttribute('data-refused', 'false');
  await mouse.up();
  expect(await treeOrder(b)).toEqual(['Container', 'Button', 'Heading', 'carousel-pro', 'Raw HTML / Embed']);
  await expect(canvas.locator('#ceiba-drop-indicator')).toHaveCount(0);
  await expect(b.locator('[aria-live="polite"]')).toHaveText('Element moved');
  await b.getByRole('button', { name: 'Undo' }).click();
  expect(await treeOrder(b)).toEqual(['Container', 'Heading', 'Button', 'carousel-pro', 'Raw HTML / Embed']);
});

test('Escape cancels a drag and nothing moves', async ({ page }) => {
  const b = page.locator('#editor-b');
  const canvas = b.frameLocator('iframe');
  const mouse = await cdpMouse(page);
  await dragTo(mouse, await point(canvas.locator('h1')), await point(canvas.getByText('Go'), 0.9));
  await page.keyboard.press('Escape');
  await mouse.up();
  expect(await treeOrder(b)).toEqual(['Container', 'Heading', 'Button', 'carousel-pro', 'Raw HTML / Embed']);
  await expect(b.locator('[aria-live="polite"]')).toHaveText('Drag cancelled');
  await expect(b.getByRole('button', { name: 'Undo' })).toBeDisabled();
});

test('a drop the catalogue does not allow is refused', async ({ page }) => {
  const b = page.locator('#editor-b');
  const canvas = b.frameLocator('iframe');
  // A grid row only lives inside a container, section or div: not at the root (empty area below the content).
  const mouse = await cdpMouse(page);
  const row = b.getByRole('button', { name: 'Insert Grid Row' });
  await row.scrollIntoViewIfNeeded();
  await dragTo(mouse, await point(row), await point(canvas.locator('body'), 0.95));
  await expect(canvas.locator('#ceiba-drop-indicator')).toHaveAttribute('data-refused', 'true');
  await mouse.up();
  await expect(b.locator('[aria-live="assertive"]')).toHaveText('That element cannot be placed there.');
  expect(await treeOrder(b)).toEqual(['Container', 'Heading', 'Button', 'carousel-pro', 'Raw HTML / Embed']);
});

test('a component is dragged from the palette into a container', async ({ page }) => {
  const b = page.locator('#editor-b');
  const canvas = b.frameLocator('iframe');
  const mouse = await cdpMouse(page);
  const text = b.getByRole('button', { name: 'Insert Text Block' });
  await text.scrollIntoViewIfNeeded();
  await dragTo(mouse, await point(text), await point(canvas.locator('h1'), 0.1));
  await expect(canvas.locator('#ceiba-drop-indicator')).toHaveAttribute('data-zone', 'before');
  await mouse.up();
  expect(await treeOrder(b)).toEqual(['Container', 'Text Block', 'Heading', 'Button', 'carousel-pro', 'Raw HTML / Embed']);
  await expect(canvas.getByText('Paragraph text')).toBeVisible();
  // The click that ends the drag must not insert a second copy.
  await expect(b.getByRole('treeitem', { name: 'Text Block' })).toHaveCount(1);
});
