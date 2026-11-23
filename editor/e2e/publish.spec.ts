import { expect, test } from '@playwright/test';

type Demo = { servers: Record<string, { current: number; published: number | null; saveElsewhere(): void;
  latest(): { root: unknown[] } }>; events: string[]; HACKED?: boolean };
const demo = (page: import('@playwright/test').Page) => page.evaluate(() => window as unknown as Demo);

// Plan 03-D: publish what was saved, according to the permissions; see the loaded and published revisions.
test('a publisher saves with Ctrl+S and publishes the saved revision', async ({ page }) => {
  await page.goto('/');
  const b = page.locator('#editor-b');
  await expect(b.locator('[data-publication]')).toHaveText('Published');
  const publish = b.getByRole('button', { name: 'Publish' });
  await expect(publish).toBeDisabled();

  await b.getByRole('treeitem', { name: 'Heading' }).click();
  const field = b.getByLabel('Text', { exact: true });
  await field.fill('Launch day');
  await expect(b.locator('[data-publication]')).toHaveText('Published: revision 1 · there are unpublished changes');
  await expect(publish).toBeDisabled();
  await field.press('Control+s');
  await expect(b.getByText(/^Revision 2 ·/)).toBeVisible();
  await expect(publish).toBeEnabled();
  await publish.click();
  await expect(b.locator('[data-publication]')).toHaveText('Published');
  expect(await page.evaluate(() => (window as unknown as Demo).servers.b?.published)).toBe(2);
  expect(await page.evaluate(() => (window as unknown as Demo).events)).toContain('b:publish-success:{"revision":2}');
});

test('without the permission there is no publish button', async ({ page }) => {
  await page.goto('/');
  const a = page.locator('#editor-a');
  await expect(a.getByText('Guardado')).toBeVisible();
  await expect(a.getByRole('button', { name: 'Publicar' })).toHaveCount(0);
});

test('a conflict asks what to do: keep mine overwrites, server version reloads', async ({ page }) => {
  await page.goto('/');
  const b = page.locator('#editor-b');
  await expect(b.getByText('Saved', { exact: true })).toBeVisible();
  await b.getByRole('treeitem', { name: 'Button' }).click();
  await page.keyboard.press('Delete');
  await page.evaluate(() => (window as unknown as Demo).servers.b?.saveElsewhere());
  await b.getByRole('button', { name: 'Save' }).click();

  const dialog = b.getByRole('alertdialog', { name: 'Someone else saved this page' });
  await expect(dialog).toBeFocused();
  await expect(dialog).toContainText('The server has revision 2 and you started from 1.');
  await expect(b.getByRole('button', { name: 'Save' })).toBeDisabled();
  await dialog.getByRole('button', { name: 'Use the server version' }).click();
  await expect(dialog).toHaveCount(0);
  await expect(b.getByRole('treeitem', { name: 'Button' })).toBeVisible();
  await expect(b.getByRole('treeitem', { name: 'Text Block' })).toBeVisible();

  await b.getByRole('treeitem', { name: 'Text Block' }).click();
  await page.keyboard.press('Delete');
  await page.evaluate(() => (window as unknown as Demo).servers.b?.saveElsewhere());
  await b.getByRole('button', { name: 'Save' }).click();
  await b.getByRole('button', { name: 'Keep my changes' }).click();
  await expect(b.getByText(/^Revision 4 ·/)).toBeVisible();
  const saved = await page.evaluate(() => JSON.stringify((window as unknown as Demo).servers.b?.latest()));
  expect(saved).not.toContain('Saved elsewhere');
});

test('the server view draws the saved revision and runs none of its scripts', async ({ page }) => {
  await page.goto('/');
  const b = page.locator('#editor-b');
  await expect(b.getByText('Saved', { exact: true })).toBeVisible();
  await b.getByRole('button', { name: 'Server view' }).click();
  await expect(b.getByText('Revision 1 drawn by the server')).toBeVisible();
  const frame = b.getByTitle('Server view');
  await expect(frame).toHaveAttribute('sandbox', '');
  await expect(b.frameLocator('iframe[title="Server view"]').locator('h1')).toHaveText('Second page');
  expect(await page.evaluate(() => (window as unknown as Demo).HACKED)).toBeUndefined();
  await b.getByRole('button', { name: 'Back to the canvas' }).click();
  await expect(b.getByTitle('Page canvas')).toBeVisible();
});

test('autosave keeps the draft without pressing Save', async ({ page }) => {
  await page.goto('/?autosave=300');
  const b = page.locator('#editor-b');
  await expect(b.getByText('Saved', { exact: true })).toBeVisible();
  await b.getByRole('treeitem', { name: 'Heading' }).click();
  await b.getByLabel('Text', { exact: true }).fill('Saved on its own');
  await expect(b.getByText(/^Revision 2 ·/)).toBeVisible();
  await expect(b.getByText('Saved', { exact: true })).toBeVisible();
  const latest = await page.evaluate(() => JSON.stringify((window as unknown as Demo).servers.b?.latest()));
  expect(latest).toContain('Saved on its own');
});
