import { expect, test } from '@playwright/test';

// Plan 03-C: text edited in place on the canvas, plain text only (D-6), one undo step, keyboard entry from the tree.
test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#editor-b').getByText('Saved')).toBeVisible();
});

test('double click edits a heading in place; Enter finishes; one undo restores it', async ({ page }) => {
  const b = page.locator('#editor-b');
  const heading = b.frameLocator('iframe').locator('h1');
  await heading.dblclick();
  await expect(heading).toHaveAttribute('contenteditable', 'plaintext-only');
  await page.keyboard.type(' <b>now</b>');
  await page.keyboard.press('Enter');
  await expect(heading).not.toHaveAttribute('contenteditable');
  await expect(heading).toHaveText('Second page <b>now</b>');
  await expect(heading.locator('b')).toHaveCount(0);
  await expect(b.getByLabel('Text', { exact: true })).toHaveValue('Second page <b>now</b>');
  await b.getByRole('button', { name: 'Undo' }).click();
  await expect(heading).toHaveText('Second page');
});

test('F2 in the structure tree edits the text and Escape returns to the tree', async ({ page }) => {
  const b = page.locator('#editor-b');
  const item = b.getByRole('treeitem', { name: 'Button' });
  await item.focus();
  await page.keyboard.press('F2');
  await page.keyboard.type('!');
  await page.keyboard.press('Escape');
  await expect(item).toBeFocused();
  await expect(b.frameLocator('iframe').getByText('Go!')).toBeVisible();
  await page.keyboard.press('F2');
  await expect(b.frameLocator('iframe').getByText('Go!')).toHaveAttribute('contenteditable', 'plaintext-only');
  await page.keyboard.press('Escape');

  // Containers and unknown components are not edited in place.
  await b.getByRole('treeitem', { name: 'carousel-pro' }).focus();
  await page.keyboard.press('F2');
  await expect(b.frameLocator('iframe').locator('[contenteditable]')).toHaveCount(0);
});

test('a text block keeps line breaks; Ctrl+Enter finishes', async ({ page }) => {
  const b = page.locator('#editor-b');
  await b.getByRole('treeitem', { name: 'Heading' }).click();
  await b.getByRole('button', { name: 'Insert Text Block' }).click();
  await expect(b.getByRole('treeitem', { name: 'Text Block' })).toBeFocused();
  await page.keyboard.press('F2');
  await page.keyboard.press('Control+a');
  await page.keyboard.type('First line');
  await page.keyboard.press('Enter');
  await page.keyboard.type('Second line');
  await page.keyboard.press('Control+Enter');
  await expect(b.getByLabel('Content', { exact: true })).toHaveValue('First line\nSecond line');
});
