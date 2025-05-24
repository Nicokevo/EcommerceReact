import { test } from '@playwright/test';
import { verifyBackgroundColor } from '@helpers/utils';
test('el header cambia de color correctamente', async ({ page }) => {
  await page.goto('/');
  const header = page.locator('header');
  const toggleDarkMode = page.getByTestId('toggle-dark-mode');

  await verifyBackgroundColor(header, 'rgb(255, 255, 255)'); // Modo claro

  await toggleDarkMode.click();
  await page.waitForTimeout(200); // si hay animación

  await verifyBackgroundColor(header, 'rgb(17, 17, 17)'); // Modo oscuro
});
