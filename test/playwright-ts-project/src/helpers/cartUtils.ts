import { Page, Locator, expect } from '@playwright/test';

/**
 * Abre el modal del carrito desde el header.
 * @param page - La página de Playwright.
 * @returns El modal del carrito como un Locator.
 */
export async function openCartModal(page: Page): Promise<Locator> {
  const cartButton = page.locator('nav button.pos_relative');
  await cartButton.click();
  const cartModal = page.locator('div.pos_fixed.right_0.top_0.w_400px');
  await cartModal.waitFor({ state: 'visible' });
  return cartModal;
}

/**
 * Cierra el modal del carrito.
 * @param cartModal - El modal del carrito.
 */
export async function closeCartModal(cartModal: Locator): Promise<void> {
  const closeModalButton = cartModal.locator('button.bg-c_transparent');
  await closeModalButton.click();
}

/**
 * Verifica que el mensaje por defecto del carrito vacío esté visible.
 * @param cartModal - El modal del carrito.
 */
export async function verifyDefaultEmptyCartMessage(cartModal: Locator): Promise<void> {
  const defaultEmptyCartMessage = cartModal.locator('p.fs_1\\.1rem', { hasText: 'Tu carrito está vacío.' });
  await expect(defaultEmptyCartMessage).toBeVisible();
}

/**
 * Verifica que el total del carrito sea $0.00.
 * @param cartModal - El modal del carrito.
 */
export async function verifyCartTotal(cartModal: Locator): Promise<void> {
  const totalAmount = cartModal.locator('span.fs_1\\.3rem.fw_700', { hasText: '$0.00' });
  await expect(totalAmount).toBeVisible();
}

/**
 * Vacía el carrito haciendo clic en el botón "Vaciar Carrito".
 * @param cartModal - El modal del carrito.
 */
export async function emptyCart(cartModal: Locator): Promise<void> {
  const emptyCartButton = cartModal.locator('button', { hasText: 'Vaciar Carrito' });
  await emptyCartButton.click();
}