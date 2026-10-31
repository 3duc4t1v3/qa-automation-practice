
import { test, expect } from '@playwright/test';

test('calcula correctamente el subtotal del carrito', async ({ page }) => {
  await page.setContent(`
    <h1>Carrito de compras</h1>

    <p>Esencia de lavanda: $50.000 x 2</p>
    <p>Colorante para velas: $20.000 x 3</p>

    <p id="subtotal"></p>

    <script>
      const productos = [
        { precio: 50000, cantidad: 2 },
        { precio: 20000, cantidad: 3 }
      ];

      const subtotal = productos.reduce(
        (total, producto) =>
          total + producto.precio * producto.cantidad,
        0
      );

      document.querySelector('#subtotal').textContent =
        '$' + subtotal.toLocaleString('es-CO');
    </script>
  `);

  await expect(page.locator('#subtotal'))
    .toHaveText('$160.000');
});
