import { Page, Locator, expect } from '@playwright/test';

/**
 * Generates a random alphanumeric string of the specified length.
 * @param length - The length of the string to generate.
 * @returns A random alphanumeric string.
 */
export function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Formats a date object into a string based on the provided format.
 * @param date - The date object to format.
 * @param format - The desired format (e.g., 'MM/DD/YYYY').
 * @returns A formatted date string.
 */
export function formatDate(date: Date, format: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

/**
 * Verifies the background color of an element.
 * @param element - The Playwright locator for the element.
 * @param expectedColor - The expected background color (e.g., 'rgb(255, 255, 255)').
 */
export async function verifyBackgroundColor(element: Locator, expectedColor: string) {
  const actualColor = await element.evaluate(el => getComputedStyle(el).backgroundColor);
  expect(actualColor).toBe(expectedColor);
}

/**
 * Validates that an element's computed CSS property matches the expected value.
 * @param page - The Playwright page object.
 * @param selector - The CSS selector of the element.
 * @param expectedColor - The expected color value (e.g., 'rgb(255, 0, 0)' or '#fbbf24').
 * @param property - The CSS property to check ('color' or 'background-color').
 */
export async function expectElementColorToBe(
  page: Page,
  selector: string,
  expectedColor: string,
  property: 'color' | 'background-color' = 'color'
): Promise<void> {
  const actualColor = await page.$eval(
    selector,
    (el: Element, property: string) => window.getComputedStyle(el).getPropertyValue(property),
    property
  );
  expect(actualColor.trim()).toBe(expectedColor);
}

/**
 * Extracts the stock number from the stock message.
 * @param page - The Playwright page object.
 * @returns The stock number as an integer.
 */
export async function getStockNumber(page: Page): Promise<number> {
  const stockMessage = page.locator('p', { hasText: 'En Stock:' });
  const stockText = await stockMessage.textContent();
  return parseInt(stockText?.match(/\d+/)?.[0] || '0', 10);
}

/**
 * Adds a specified quantity of products to the cart.
 * @param page - The Playwright page object.
 * @param quantity - The quantity of products to add.
 */
export async function addToCart(page: Page, quantity: number): Promise<void> {
  const quantityInput = page.locator('input#quantity');
  await quantityInput.fill(`${quantity}`);
  const addToCartButton = page.locator('button[aria-label="Agregar al Carrito"]');
  await addToCartButton.click();
}

/**
 * Empties the cart by removing all products.
 * @param page - The Playwright page object.
 */
export async function emptyCart(page: Page): Promise<void> {
  const removeFromCartButton = page.locator('button', { hasText: 'Quitar del Carrito' });
  await removeFromCartButton.click();
}
