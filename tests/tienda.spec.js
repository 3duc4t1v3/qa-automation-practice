
import { test, expect } from '@playwright/test';

test('muestra el nombre y precio del producto', async ({ page }) => {
  await page.setContent(`
    <h1>Esencia aromática de lavanda</h1>
    <p>Precio: $50.000</p>
  `);

  await expect(
    page.getByRole('heading', { name: 'Esencia aromática de lavanda' })
  ).toBeVisible();

  await expect(
    page.getByText('Precio: $50.000')
  ).toBeVisible();
});
