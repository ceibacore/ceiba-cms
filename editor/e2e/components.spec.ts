import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

// Plan 05-B: content components are drawn on the canvas like the server views (fixtures/components), escaped,
// and every control is reachable with the keyboard.
const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAIAAACFwKtZAAAAHUlEQVR4nGMQWfKPLohh1OJRi0ctHrV41OIhZzEAt3/BRVqoeVgAAAAASUVORK5CYII=', 'base64');

const editor = (page: Page): Locator => page.locator('#editor-b');
const canvas = (page: Page) => editor(page).frameLocator('iframe[title="Page canvas"]');

const insert = async (page: Page, label: string): Promise<void> => {
  await editor(page).getByRole('treeitem', { name: 'Heading' }).click();
  await editor(page).getByRole('button', { name: `Insert ${label}`, exact: true }).click();
};

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(editor(page).getByText('Saved', { exact: true })).toBeVisible();
});

test('divider, spacer, list and quote draw escaped, semantic markup', async ({ page }) => {
  const b = editor(page);
  await insert(page, 'Divider');
  await b.getByLabel('Line', { exact: true }).selectOption('dashed');
  await expect(canvas(page).locator('hr.cms-divider.my-4')).toHaveAttribute('style', 'border-top-style:dashed');
  await insert(page, 'Spacer');
  await b.getByLabel('Height (px)').fill('64');
  await expect(canvas(page).locator('.cms-spacer')).toHaveAttribute('style', 'height:64px');
  await expect(canvas(page).locator('.cms-spacer')).toHaveAttribute('aria-hidden', 'true');

  await insert(page, 'List');
  const items = b.getByLabel('Items (one per line)');
  await expect(items).toHaveValue('First item\nSecond item');
  await items.fill('One\n\n<b>Two</b>\nThree');
  await items.press('Tab');
  await b.getByLabel('Numbered').check();
  await expect(canvas(page).locator('ol.cms-list > li')).toHaveText(['One', '<b>Two</b>', 'Three']);
  await expect(canvas(page).locator('ol.cms-list b')).toHaveCount(0);

  await insert(page, 'Quote');
  await b.getByLabel('Quote', { exact: true }).fill('Learn\n<script>parent.HACKED=1</script>');
  await b.getByLabel('Author').fill('Ada');
  const quote = canvas(page).locator('figure.cms-quote');
  await expect(quote.locator('blockquote.blockquote p')).toContainText('<script>');
  await expect(quote.locator('figcaption.blockquote-footer')).toHaveText('Ada');
  expect(await page.evaluate(() => (window as unknown as { HACKED?: number }).HACKED)).toBeUndefined();
});

test('a video only becomes a play button: nothing is loaded from YouTube or Vimeo on the canvas', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', (r) => requests.push(r.url()));
  const b = editor(page);
  await insert(page, 'Video');
  await expect(canvas(page).getByText('video: nothing to show yet')).toBeVisible();
  await b.getByLabel('YouTube or Vimeo link').fill('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  await b.getByLabel('Title', { exact: true }).fill('Launch');
  const frame = canvas(page).locator('.cms-video-frame');
  await expect(frame).toHaveAttribute('data-cms-video', 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0');
  await expect(canvas(page).locator('.cms-video-play')).toHaveText('Play video: Launch');
  await expect(canvas(page).locator('figure.cms-video figcaption a')).toHaveAttribute('href', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  await expect(canvas(page).locator('iframe')).toHaveCount(0);
  expect(requests.filter((u) => /youtube|vimeo|ytimg/.test(u))).toEqual([]);
});

test('a gallery is built and reordered with the keyboard, and a card holds other elements', async ({ page }) => {
  const b = editor(page);
  await insert(page, 'Gallery');
  const dialog = b.getByRole('dialog', { name: 'Media library' });
  for (const [name, caption] of [['first.png', 'First'], ['second.png', 'Second']] as const) {
    await b.getByRole('button', { name: 'Add image' }).focus();
    await page.keyboard.press('Enter');
    await dialog.getByLabel('File', { exact: true }).setInputFiles({ name, mimeType: 'image/png', buffer: PNG });
    await dialog.getByRole('button', { name: 'Upload file' }).click();
    await dialog.getByRole('button', { name: 'Use this image' }).click();
    const fields = b.getByLabel('Caption');
    await fields.last().fill(caption);
    await fields.last().press('Tab');
  }
  const figures = canvas(page).locator('.cms-gallery figure');
  await expect(figures.locator('figcaption')).toHaveText(['First', 'Second']);
  await b.getByRole('button', { name: 'Move image 1 down' }).focus();
  await page.keyboard.press('Enter');
  await expect(figures.locator('figcaption')).toHaveText(['Second', 'First']);
  await b.getByLabel('Columns', { exact: true }).selectOption('2');
  await expect(figures.first()).toHaveClass('col-6 col-md-6 m-0');
  await b.getByRole('button', { name: 'Remove image 2' }).click();
  await expect(figures).toHaveCount(1);

  await insert(page, 'Card');
  await b.getByLabel('Link text').fill('More');
  await b.getByLabel('Link', { exact: true }).fill('javascript:alert(1)');
  await expect(b.getByRole('alert').filter({ hasText: 'Use an http, https' })).toBeVisible();
  await b.getByLabel('Link', { exact: true }).fill('/more');
  await b.getByRole('button', { name: 'Insert Text Block' }).click();
  await expect(canvas(page).locator('.card .card-body > p:not(.card-text)')).toHaveText('Paragraph text');
  await expect(canvas(page).locator('.card .card-body > :last-child')).toHaveText('More');
});
