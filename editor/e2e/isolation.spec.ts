import { expect, test } from '@playwright/test';

type DemoWindow = { events: string[]; servers: Record<string, { current: number }> };

// Plan 03-B: two instances on one page, a canvas that never runs or navigates, values checked before they land.
test('two editors on the same page keep their own selection and session', async ({ page }) => {
  await page.goto('/');
  const a = page.locator('#editor-a');
  const b = page.locator('#editor-b');
  await expect(b.getByText('Saved')).toBeVisible();

  await b.frameLocator('iframe').locator('h1').click();
  await expect(b.getByRole('treeitem', { name: 'Heading' })).toHaveAttribute('aria-selected', 'true');
  await expect(b.getByText('Heading', { exact: true }).last()).toBeVisible();
  await expect(a.getByText('Selecciona un elemento para ver sus propiedades.')).toBeVisible();

  await b.getByRole('button', { name: 'Insert Text Block' }).click();
  await expect(b.getByRole('button', { name: 'Undo' })).toBeEnabled();
  await expect(a.getByRole('button', { name: 'Deshacer' })).toBeDisabled();
});

test('the canvas is sandboxed, never navigates and refuses unsafe URLs', async ({ page }) => {
  await page.goto('/');
  const b = page.locator('#editor-b');
  await expect(b.getByText('Saved')).toBeVisible();
  await expect(b.locator('iframe')).toHaveAttribute('sandbox', 'allow-same-origin');

  const url = page.url();
  await b.frameLocator('iframe').getByText('Go').click();
  expect(page.url()).toBe(url);
  await expect(b.getByRole('treeitem', { name: 'Button' })).toHaveAttribute('aria-selected', 'true');

  const field = b.getByLabel('Url');
  await field.fill('javascript:alert(1)');
  await expect(b.getByText('Use an http, https, mailto or tel address, or a site path.')).toBeVisible();
  await expect(field).toHaveAttribute('aria-invalid', 'true');
  await expect(b.frameLocator('iframe').getByText('Go')).toHaveAttribute('href', 'https://example.com');
  await expect(b.getByRole('button', { name: 'Save' })).toBeDisabled();

  await b.getByRole('treeitem', { name: 'carousel-pro' }).click();
  await expect(b.getByRole('note')).toHaveText('This component is not in the catalogue: it is kept but cannot be edited.');
  const embed = b.frameLocator('iframe').getByText('Embedded HTML (not shown while editing)');
  await expect(embed).toBeVisible();
  await expect(b.frameLocator('iframe').locator('script')).toHaveCount(0);
});

test('events carry ids and state, never page content; removing the element releases it', async ({ page }) => {
  await page.goto('/');
  const b = page.locator('#editor-b');
  await expect(b.getByText('Saved')).toBeVisible();
  await b.getByRole('treeitem', { name: 'Heading' }).click();
  await b.getByLabel('Text', { exact: true }).fill('Secret draft title');
  await b.getByRole('button', { name: 'Save' }).click();
  await expect(b.getByText('Revision 2', { exact: true })).toBeVisible();

  const events = await page.evaluate(() => (window as unknown as DemoWindow).events);
  expect(events).toContain('b:save-success:{"revision":2}');
  expect(events.join('\n')).not.toContain('Secret');

  await page.evaluate(() => document.querySelector('#editor-b')?.remove());
  const left = await page.evaluate(() => (document.querySelector('#editor-a') as HTMLElement & { session: unknown }).session !== null);
  expect(left).toBe(true);
});
