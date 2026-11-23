import { expect, test } from '@playwright/test';

type Demo = { servers: Record<string, { latest(): unknown; templates: { templates: { name: string; nodes: unknown[] }[] } }>; HACKED?: boolean };

// Plan 03-E2: dynamic content (loop, condition), templates and HTML import in the editor.
test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#editor-b').getByText('Saved', { exact: true })).toBeVisible();
});

test('a loop and a condition are set from the inspector and saved', async ({ page }) => {
  const b = page.locator('#editor-b');
  await b.getByRole('treeitem', { name: 'Container' }).click();
  await b.getByText('Advanced: dynamic content').click();
  await b.getByLabel('Repeat with data from').selectOption('module');
  await b.getByLabel('Module (slug)').fill('courses');
  await b.getByLabel('Limit').fill('-3');
  await b.getByRole('button', { name: 'Apply' }).click();
  await expect(b.getByText('Limit and offset must be non-negative integers.')).toBeVisible();
  await b.getByLabel('Limit').fill('6');
  await b.getByLabel('Condition to show it').fill('user.logged');
  await b.getByRole('button', { name: 'Apply' }).click();
  await b.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(b.getByText(/^Revision 2 ·/)).toBeVisible();
  const saved = JSON.stringify(await page.evaluate(() => (window as unknown as Demo).servers.b?.latest()));
  expect(saved).toContain('"loop":{"source":"module:courses","variable":"item","key":"id","limit":6}');
  expect(saved).toContain('"condition":"user.logged"');
});

test('a template is inserted from the palette, and an element is saved as a new one', async ({ page }) => {
  const b = page.locator('#editor-b');
  await b.getByRole('treeitem', { name: 'Button' }).click();
  await b.getByRole('button', { name: 'Insert the template Call to action' }).click();
  await expect(b.frameLocator('iframe').getByText('Ready?')).toBeVisible();

  await b.getByRole('treeitem', { name: 'Heading' }).first().click();
  await b.getByRole('button', { name: 'Save as template' }).click();
  const dialog = b.getByRole('dialog', { name: 'Save as template' });
  await expect(dialog.getByLabel('Name')).toBeFocused();
  await dialog.getByLabel('Name').fill('Big title');
  await dialog.getByRole('button', { name: 'Save template' }).click();
  await expect(dialog).toBeHidden();
  await expect(b.getByRole('button', { name: 'Insert the template Big title' })).toBeVisible();
  const stored = await page.evaluate(() => (window as unknown as Demo).servers.b?.templates.templates.at(-1));
  expect(JSON.stringify(stored)).not.toContain('"id":"title"');
});

test('HTML is imported as elements; scripts never arrive', async ({ page }) => {
  const b = page.locator('#editor-b');
  await b.getByRole('treeitem', { name: 'Button' }).click();
  await b.getByRole('button', { name: 'Import HTML' }).click();
  const dialog = b.getByRole('dialog', { name: 'Import HTML' });
  // h2 is not in this site's catalogue: nothing is inserted and the dialog stays open with the reason.
  await dialog.getByLabel('HTML').fill('<h2>Nope</h2><p>Body</p>');
  await dialog.getByRole('button', { name: 'Import' }).click();
  await expect(b.locator('[aria-live="assertive"]')).toHaveText('That component is not available.');
  await expect(b.frameLocator('iframe').getByText('Body')).toHaveCount(0);
  await dialog.getByLabel('HTML').fill('<h1>Imported</h1><script>parent.HACKED = true</script><p>Body</p>');
  await dialog.getByRole('button', { name: 'Import' }).click();
  await expect(dialog).toBeHidden();
  await expect(b.frameLocator('iframe').getByText('Imported')).toBeVisible();
  await expect(b.frameLocator('iframe').getByText('Body')).toBeVisible();
  await expect(b.locator('[aria-live="polite"]')).toHaveText('Imported with 1 converter warnings.');
  expect(await page.evaluate(() => (window as unknown as Demo).HACKED)).toBeUndefined();
  await b.getByRole('button', { name: 'Undo' }).click();
  await expect(b.frameLocator('iframe').getByText('Body')).toHaveCount(0);
});
