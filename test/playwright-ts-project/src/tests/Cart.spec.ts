import { test, expect } from '@playwright/test';
import { openCartModal, closeCartModal, verifyDefaultEmptyCartMessage, verifyCartTotal, emptyCart } from '@helpers/cartUtils';

test.describe('Cart Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Navega a la página principal antes de cada test
    await page.goto('/');
  });

  test('shows a message when trying to finalize purchase with an empty cart', async ({ page }) => {
    // Abre el modal del carrito
    const cartModal = await openCartModal(page);

    // Verifica que el mensaje por defecto esté visible
    await verifyDefaultEmptyCartMessage(cartModal);

    // Haz clic en el botón "Finalizar Compra"
    const finalizePurchaseButton = cartModal.locator('button', { hasText: 'Finalizar Compra' });
    await finalizePurchaseButton.click();

    // Verifica que el mensaje adicional en rojo esté visible
    const errorEmptyCartMessage = cartModal.locator('p.c_red\\.500', { hasText: 'Tu carrito está vacío. Agrega productos antes de finalizar la compra.' });
    await expect(errorEmptyCartMessage).toBeVisible();

    // Cierra el modal
    await closeCartModal(cartModal);
  });

  test('empties the cart and verifies the total is $0.00', async ({ page }) => {
    // Abre el modal del carrito
    const cartModal = await openCartModal(page);

    // Vacía el carrito
    await emptyCart(cartModal);

    // Verifica que el mensaje por defecto siga visible
    await verifyDefaultEmptyCartMessage(cartModal);

    // Verifica que el total sea $0.00
    await verifyCartTotal(cartModal);

    // Cierra el modal
    await closeCartModal(cartModal);

    const cartIcon = page.locator('button.pos_relative span');
    await expect(cartIcon).not.toBeVisible();
  });
});