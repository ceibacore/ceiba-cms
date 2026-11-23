import { expect, test } from '@playwright/test';

// Plan 03-B acceptance: build, reorder, edit, undo and save a page without the mouse.
test('a page is created, edited and saved with the keyboard only', async ({ page }) => {
  await page.goto('/');
  const editor = page.locator('#editor-a');
  const tree = editor.getByRole('tree');
  const canvas = editor.frameLocator('iframe');
  await expect(editor.getByText('Guardado')).toBeVisible();

  await editor.getByRole('button', { name: 'Insertar Container' }).focus();
  await page.keyboard.press('Enter');
  await expect(editor.getByRole('treeitem', { name: 'Container' })).toBeFocused();

  await editor.getByRole('button', { name: 'Insertar Heading' }).focus();
  await page.keyboard.press('Enter');
  await editor.getByRole('button', { name: 'Insertar Text Block' }).focus();
  await page.keyboard.press('Enter');
  const text = editor.getByRole('treeitem', { name: 'Text Block' });
  await expect(text).toBeFocused();
  await expect(text).toHaveAttribute('aria-level', '2');

  // Alt+ArrowUp moves the text above the heading; Ctrl+Z puts it back.
  await page.keyboard.press('Alt+ArrowUp');
  await expect(tree.getByRole('treeitem').nth(1)).toHaveText('Text Block');
  await expect(text).toBeFocused();
  await page.keyboard.press('Control+z');
  await expect(tree.getByRole('treeitem').nth(1)).toHaveText('Heading');

  // Arrow keys select the heading; its text is edited in the inspector.
  await tree.getByRole('treeitem', { name: 'Text Block' }).focus();
  await page.keyboard.press('ArrowUp');
  await expect(editor.getByRole('treeitem', { name: 'Heading' })).toHaveAttribute('aria-selected', 'true');
  const title = editor.getByLabel('Text', { exact: true });
  await title.focus();
  await page.keyboard.press('Control+a');
  await page.keyboard.type('Hola mundo');
  await expect(canvas.locator('h2')).toHaveText('Hola mundo');

  // Typing in a field is one undo step of the editor (the toolbar button), not one per key.
  await editor.getByRole('button', { name: 'Deshacer' }).focus();
  await page.keyboard.press('Enter');
  await expect(canvas.locator('h2')).toHaveText('Title');
  await editor.getByRole('button', { name: 'Rehacer' }).focus();
  await page.keyboard.press('Enter');
  await expect(canvas.locator('h2')).toHaveText('Hola mundo');

  await editor.getByRole('button', { name: 'Guardar' }).focus();
  await page.keyboard.press('Enter');
  await expect(editor.getByText('Revisión 2', { exact: true })).toBeVisible();
  const saved = await page.evaluate(() => (window as unknown as { servers: { a: { latest(): unknown } } }).servers.a.latest());
  expect(JSON.stringify(saved)).toContain('"text":"Hola mundo"');
  expect((saved as { root: { type: string; children: { type: string }[] }[] }).root[0]?.children.map((c) => c.type))
    .toEqual(['heading', 'text']);

  // Delete removes the selected node and keeps focus in the tree.
  await editor.getByRole('treeitem', { name: 'Text Block' }).focus();
  await page.keyboard.press('Delete');
  await expect(editor.getByRole('treeitem')).toHaveCount(2);
  await expect(editor.getByRole('treeitem', { name: 'Heading' })).toBeFocused();
  await expect(editor.getByRole('alert').filter({ hasText: /./ })).toHaveCount(0);
});

test('a refused move is announced and changes nothing', async ({ page }) => {
  await page.goto('/');
  const editor = page.locator('#editor-b');
  await expect(editor.getByText('Saved')).toBeVisible();
  const button = editor.getByRole('treeitem', { name: 'Button' });
  await button.click();
  await page.keyboard.press('Alt+ArrowRight');
  await expect(editor.locator('[aria-live="assertive"]')).toHaveText('That element cannot be placed there.');
  await expect(button).toHaveAttribute('aria-level', '2');
});
