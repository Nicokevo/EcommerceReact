import { test, expect } from '@playwright/test';
import { getStockNumber, addToCart, emptyCart } from '../helpers/utils';

test.describe('Product Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the "Best Sellers" category
    await page.goto('/category/best_sellers');
    const firstProductDetailsButton = page.locator('button[aria-label="Ver Detalles"]').first();
    await firstProductDetailsButton.click();
  });

  test('validates the stock message and adjusts to the maximum stock', async ({ page }) => {
    // Extract the stock number from the stock message
    const stockNumber = await getStockNumber(page);
    expect(stockNumber).toBeGreaterThan(0);

    // Attempt to add more products than available stock
    await addToCart(page, 999);

    // Verify the "maximum stock reached" message is visible
    const maxStockMessage = page.locator('p', { hasText: 'Alcanzo al maximo de stock' });
    await expect(maxStockMessage).toBeVisible();
  });

  test('validates that the cart displays the correct number of products', async ({ page }) => {
    // Extract the stock number and add products to the cart
    const stockNumber = await getStockNumber(page);
    await addToCart(page, stockNumber);

    // Verify the cart icon displays the correct number of products
    const cartIcon = page.locator('button.pos_relative span');
    await expect(cartIcon).toHaveText(`${stockNumber}`);
  });

  test('empties the cart and validates it is empty', async ({ page }) => {
    // Add products to the cart and then empty it
    const stockNumber = await getStockNumber(page);
    await addToCart(page, stockNumber);
    await emptyCart(page);

    // Verify the cart icon is no longer visible
    const cartIcon = page.locator('button.pos_relative span');
    await expect(cartIcon).not.toBeVisible();
  });
});