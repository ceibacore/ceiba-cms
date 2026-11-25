import { expect, test } from '@playwright/test';

type Demo = { servers: Record<string, { data: { down: boolean }; latest: () => { root: { props: Record<string, unknown> }[] } }> };

// Plan 07-C: a query block previews real data as a visitor sees it, its filters are typed, and a failing source
// shows the error state; bound values are safe (a javascript: link falls back).
test.beforeEach(async ({ page }) => {
  await page.goto('/?dynamic=1');
  await expect(page.locator('#editor-b').getByText('Saved', { exact: true })).toBeVisible();
});

test('the template shows the first result, safely, with pages and a visitor filter', async ({ page }) => {
  const canvas = page.locator('#editor-b').frameLocator('iframe[title="Page canvas"]');
  await expect(canvas.locator('h3')).toHaveText('PHP from scratch');
  await expect(canvas.locator('a.btn')).toHaveAttribute('href', '/courses');
  await expect(canvas.locator('a.btn')).toHaveText('From 1500');
  await expect(canvas.locator('[data-cms-query="courses"]')).toHaveAttribute('data-cms-state', 'results');
  await expect(canvas.locator('nav .page-item')).toHaveCount(4);
  await expect(canvas.locator('select[name="level"] option')).toHaveText(['—', 'basic', 'advanced']);
});

test('a typed filter changes the preview, a failing source shows its error, and nothing private is offered', async ({ page }) => {
  const b = page.locator('#editor-b');
  await b.getByRole('treeitem', { name: 'Query' }).first().click();
  const panel = b.getByRole('region', { name: 'Query' });
  await expect(panel.getByRole('status')).toHaveText('3 results (as a visitor sees them)');
  await expect(panel.getByLabel('Source')).toHaveValue('host:courses');

  const filters = panel.getByRole('group', { name: 'Filters', exact: true });
  await filters.getByRole('button', { name: 'Add' }).click();
  await expect(filters.getByLabel('Field').locator('option')).not.toContainText(['secret']);
  await filters.getByLabel('Field').selectOption('level');
  await filters.getByLabel('Value').selectOption('advanced');
  await panel.getByRole('button', { name: 'Apply' }).click();
  await expect(panel.getByRole('status')).toHaveText('2 results (as a visitor sees them)');
  await expect(b.frameLocator('iframe[title="Page canvas"]').locator('h3')).toHaveText('UX research');
  await b.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(b.getByText('Saved', { exact: true })).toBeVisible();
  expect(await page.evaluate(() => (window as unknown as Demo).servers.b!.latest().root[0]!.props.filters))
    .toEqual([{ field: 'level', op: 'eq', value: 'advanced' }]);

  await page.evaluate(() => { (window as unknown as Demo).servers.b!.data.down = true; });
  await panel.getByLabel('Items per page').fill('1');
  await panel.getByRole('button', { name: 'Apply' }).click();
  await expect(panel.getByRole('status')).toContainText('The source did not answer or the query is invalid');
  await expect(b.frameLocator('iframe[title="Page canvas"]').locator('[data-cms-query="courses"]')).toHaveAttribute('data-cms-state', 'error');
});
