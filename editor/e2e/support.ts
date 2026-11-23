import type { Locator, Page } from '@playwright/test';

/** Centre of an element (also inside the canvas iframe), in page coordinates. */
export const point = async (locator: Locator, yRatio = 0.5): Promise<{ x: number; y: number }> => {
  const box = await locator.boundingBox();
  if (!box) throw new Error('element not visible');
  return { x: box.x + box.width / 2, y: box.y + box.height * yRatio };
};

/**
 * Real mouse input through the Chrome DevTools protocol. Playwright's page.mouse cannot be used for drags here:
 * with a button pressed it evaluates its own script in every frame to detect native drags, and the canvas frame
 * forbids scripts (sandbox without allow-scripts), so the call never returns.
 */
export const cdpMouse = async (page: Page) => {
  const cdp = await page.context().newCDPSession(page);
  let at = { x: 0, y: 0 };
  let buttons = 0;
  const send = (type: 'mouseMoved' | 'mousePressed' | 'mouseReleased', extra: Record<string, unknown> = {}) =>
    cdp.send('Input.dispatchMouseEvent', { type, x: at.x, y: at.y, button: 'left', buttons, clickCount: 1, ...extra });
  return {
    async move(x: number, y: number, steps = 1): Promise<void> {
      const from = at;
      for (let i = 1; i <= steps; i++) {
        at = { x: from.x + ((x - from.x) * i) / steps, y: from.y + ((y - from.y) * i) / steps };
        await send('mouseMoved', { button: buttons ? 'left' : 'none' });
      }
    },
    async down(): Promise<void> {
      buttons = 1;
      await send('mousePressed');
    },
    async up(): Promise<void> {
      buttons = 0;
      await send('mouseReleased');
    },
  };
};

export type Mouse = Awaited<ReturnType<typeof cdpMouse>>;

/** Presses on `from`, travels in steps to `to` (so pointermove fires), and leaves the button down. */
export const dragTo = async (mouse: Mouse, from: { x: number; y: number }, to: { x: number; y: number }): Promise<void> => {
  await mouse.move(from.x, from.y);
  await mouse.down();
  await mouse.move(from.x + 8, from.y + 8, 2);
  await mouse.move(to.x, to.y, 8);
};

export const treeOrder = (editor: Locator): Promise<string[]> => editor.getByRole('treeitem').allInnerTexts();
