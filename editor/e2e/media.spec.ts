import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

type Demo = { servers: Record<string, { latest: () => { root: unknown[] }; media: { items: { id: string; alt: string }[] } }> };

// Plan 05-A: upload, describe, insert, reuse and replace without breaking references; fake files are refused and a
// file in use is not deleted.
const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAIAAABwJOjsAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAJ0lEQVRIiWMUqTjBMBCAaUBsHbV41OJRi0ctHrV41OJRi0ctHhAAAFH7AXznNjdOAAAAAElFTkSuQmCC', 'base64');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#editor-b').getByText('Saved', { exact: true })).toBeVisible();
});

const insertImage = async (page: Page): Promise<void> => {
  const b = page.locator('#editor-b');
  await b.getByRole('treeitem', { name: 'Heading' }).click();
  await b.getByRole('button', { name: 'Insert Image' }).click();
};

const upload = async (page: Page, name: string, buffer: Buffer, mimeType: string, alt = ''): Promise<void> => {
  const dialog = page.locator('#editor-b').getByRole('dialog', { name: 'Media library' });
  await dialog.getByLabel('File', { exact: true }).setInputFiles({ name, mimeType, buffer });
  await dialog.getByLabel('Alternative text', { exact: true }).last().fill(alt);
  await dialog.getByRole('button', { name: 'Upload file' }).click();
};

test('an uploaded image is described, inserted, reused and replaced through its asset id', async ({ page }) => {
  const b = page.locator('#editor-b');
  await insertImage(page);
  await b.getByRole('button', { name: 'Choose image' }).click();
  const dialog = b.getByRole('dialog', { name: 'Media library' });
  await expect(dialog.getByText('No images.')).toBeVisible();
  await expect(dialog.getByLabel('960 px (recommended)')).toBeChecked();
  await expect(dialog.getByLabel('Convert to WebP')).toBeChecked();
  await dialog.getByLabel('1600 px (recommended)').uncheck();

  await upload(page, 'sea.png', PNG, 'image/png', 'Blue sea');
  await expect(dialog.getByText('Selected: sea.png')).toBeVisible();
  await dialog.getByRole('button', { name: 'Use this image' }).click();
  await expect(dialog).toBeHidden();

  const canvas = b.frameLocator('iframe[title="Page canvas"]');
  await expect(canvas.locator('img')).toHaveAttribute('src', '/demo-media/m1-40.webp');
  await expect(canvas.locator('img')).toHaveAttribute('alt', 'Blue sea');
  const node = async () => (await page.evaluate(() => (window as unknown as Demo).servers.b!.latest().root)) as unknown[];

  await b.getByLabel('Alternative text on this page').fill('The sea at noon');
  await b.getByLabel('Alternative text on this page').press('Tab');
  await expect(canvas.locator('img')).toHaveAttribute('alt', 'The sea at noon');
  await b.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(b.getByText('Saved', { exact: true })).toBeVisible();
  expect(JSON.stringify(await node())).toContain('"src":{"asset":"m1","alt":"The sea at noon"}');

  // Reuse: a second image picks the same file from the library, by its id.
  await insertImage(page);
  await b.getByRole('button', { name: 'Choose image' }).click();
  await dialog.getByRole('button', { name: 'sea.png' }).click();
  await dialog.getByLabel('Alternative text', { exact: true }).first().fill('Calm blue sea');
  await dialog.getByRole('button', { name: 'Save text' }).click();
  await dialog.getByRole('button', { name: 'Use this image' }).click();
  await expect(canvas.locator('img')).toHaveCount(2);
  // The library alt applies where the page sets none; the per-use alt of the first image stays.
  await expect(canvas.locator('img[src="/demo-media/m1-40.webp"][alt="Calm blue sea"]')).toHaveCount(1);
  await expect(canvas.locator('img[src="/demo-media/m1-40.webp"][alt="The sea at noon"]')).toHaveCount(1);

  // Replace: the per-use alt text stays, the asset changes.
  await b.getByRole('treeitem', { name: 'Image' }).last().click();
  await b.getByRole('button', { name: 'Replace' }).click();
  await upload(page, 'forest.png', PNG, 'image/png');
  await dialog.getByRole('button', { name: 'Use this image' }).click();
  await expect(canvas.locator('img[src="/demo-media/m2-40.webp"]')).toHaveAttribute('alt', 'The sea at noon');
  await expect(canvas.locator('img[src="/demo-media/m1-40.webp"]')).toHaveAttribute('alt', 'Calm blue sea');
});

test('fake images and SVG are refused, and a file in use is not deleted', async ({ page }) => {
  const b = page.locator('#editor-b');
  await insertImage(page);
  await b.getByRole('button', { name: 'Choose image' }).click();
  const dialog = b.getByRole('dialog', { name: 'Media library' });

  await upload(page, 'photo.png', Buffer.from('not really an image'), 'image/png');
  await expect(dialog.getByRole('alert')).toHaveText('Only JPEG, PNG, GIF or WebP images are accepted.');
  await upload(page, 'logo.svg', Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"/>'), 'image/svg+xml');
  await expect(dialog.getByRole('alert')).toHaveText('Only JPEG, PNG, GIF or WebP images are accepted.');

  await upload(page, 'used.png', PNG, 'image/png', 'Used');
  await dialog.getByRole('button', { name: 'Use this image' }).click();
  await b.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(b.getByText('Saved', { exact: true })).toBeVisible();

  await b.getByRole('button', { name: 'Replace' }).click();
  await dialog.getByRole('button', { name: 'used.png' }).click();
  await dialog.getByRole('button', { name: 'Delete file' }).click();
  await expect(dialog.getByRole('alert')).toHaveText('Cannot delete: used in «page-b».');
  const items = await page.evaluate(() => (window as unknown as Demo).servers.b!.media.items.length);
  expect(items).toBe(1);
});

test('a background image comes from the library and compiles to url() on the canvas', async ({ page }) => {
  const b = page.locator('#editor-b');
  await b.getByRole('treeitem', { name: 'Container' }).click();
  await b.getByText('Background', { exact: true }).click();
  await b.getByRole('button', { name: 'Choose image' }).click();
  await upload(page, 'bg.png', PNG, 'image/png');
  await b.getByRole('dialog', { name: 'Media library' }).getByRole('button', { name: 'Use this image' }).click();
  await b.getByLabel('Background size').selectOption('cover');
  const hero = b.frameLocator('iframe[title="Page canvas"]').locator('.container').first();
  await expect.poll(() => hero.evaluate((el) => getComputedStyle(el).backgroundImage)).toContain('/demo-media/m1-40.webp');
  await expect.poll(() => hero.evaluate((el) => getComputedStyle(el).backgroundSize)).toBe('cover');
});
