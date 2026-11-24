import { expect, test } from '@playwright/test';

type Demo = { servers: Record<string, { siteParts: { published: string[]; parts: { id: string; version: number }[] } }> };

// Plan 06-C: a site part edits its rules, sees the impact and ties, previews in context and publishes with its rules.
test.beforeEach(async ({ page }) => {
  await page.goto('/?sitePart=1');
  await expect(page.locator('#editor-b').getByText('Saved', { exact: true })).toBeVisible();
});

test('rules are edited, a tie blocks publishing, and a higher priority publishes document and rules', async ({ page }) => {
  const b = page.locator('#editor-b');
  await b.getByRole('button', { name: 'Rules' }).click();
  const panel = b.getByRole('region', { name: 'Where «Main header» is used' });
  await expect(panel.getByText(/^Header/)).toBeVisible();
  await expect(panel.getByLabel('Type of rule 1')).toHaveValue('site');

  await panel.getByLabel('Type of rule 1').selectOption('path_prefix');
  await panel.getByLabel('Value of rule 1').fill('cursos');
  await panel.getByLabel('Value of rule 1').press('Tab');
  await panel.getByRole('button', { name: 'Save rules' }).click();
  await expect(panel.getByRole('alert')).toHaveText('Invalid rule at include.0.value (INVALID_VALUE).');

  await panel.getByLabel('Type of rule 1').selectOption('pages');
  await panel.getByLabel('Value of rule 1').selectOption(['blog']);
  await panel.getByRole('button', { name: 'Save rules' }).click();
  await expect(panel.getByRole('alert')).toHaveCount(0);
  expect(await page.evaluate(() => (window as unknown as Demo).servers.b!.siteParts.parts[0]!.version)).toBe(2);

  await panel.getByRole('button', { name: 'Show impact' }).click();
  await expect(panel.getByText('Ties that block publishing')).toBeVisible();
  await expect(panel.getByText('/blog: page-b, other-header')).toBeVisible();

  await b.getByRole('button', { name: 'Publish' }).click();
  await expect(b.getByRole('alert').filter({ hasText: 'Parts of the same kind tie' }).first()).toBeAttached();
  expect(await page.evaluate(() => (window as unknown as Demo).servers.b!.siteParts.published)).toEqual([]);

  await panel.getByLabel('Priority (−100 to 100; highest wins)').fill('5');
  await panel.getByLabel('Priority (−100 to 100; highest wins)').press('Tab');
  await expect(panel.getByText('There are unpublished rules.')).toBeVisible();
  await b.getByRole('button', { name: 'Publish' }).click();
  await expect.poll(() => page.evaluate(() => (window as unknown as Demo).servers.b!.siteParts.published)).toEqual(['page-b']);
  await expect(panel.getByText('There are unpublished rules.')).toHaveCount(0);
});

test('the saved revision is previewed in a chosen page, saying when the rules leave it out', async ({ page }) => {
  const b = page.locator('#editor-b');
  await b.getByRole('button', { name: 'Rules' }).click();
  const panel = b.getByRole('region', { name: 'Where «Main header» is used' });
  await panel.getByLabel('Type of rule 1').selectOption('pages');
  await panel.getByLabel('Value of rule 1').selectOption(['courses']);

  await panel.getByLabel('Preview on').selectOption({ label: '/cursos' });
  await panel.getByRole('button', { name: 'Preview', exact: true }).click();
  const frame = panel.frameLocator('iframe[title="Preview of the part in context"]');
  await expect(frame.getByText('Page courses')).toBeVisible();
  await expect(panel.getByText('With these rules, the part is not used here.')).toHaveCount(0);

  await panel.getByLabel('Preview on').selectOption({ label: '/blog' });
  await panel.getByRole('button', { name: 'Preview', exact: true }).click();
  await expect(panel.getByText('With these rules, the part is not used here.')).toBeVisible();
});
