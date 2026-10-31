
import { test, expect } from '@playwright/test';

test('rechaza la cantidad 0 y no agrega el producto', async ({ page }) => {
  await page.setContent(`
    <h1>Tienda de velas</h1>

    <label for="cantidad">Cantidad:</label>
    <input id="cantidad" type="number" min="1" max="10" value="1">

    <button id="agregar">Agregar al carrito</button>

    <p id="mensaje"></p>
    <p id="subtotal">$0</p>

    <script>
      document.querySelector('#agregar').addEventListener('click', () => {
        const cantidad = Number(
          document.querySelector('#cantidad').value
        );

        const mensaje = document.querySelector('#mensaje');
        const subtotal = document.querySelector('#subtotal');

        if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > 10) {
          mensaje.textContent = 'Cantidad inválida';
          return;
        }

        mensaje.textContent = 'Producto agregado';
        subtotal.textContent =
          '$' + (cantidad * 50000).toLocaleString('es-CO');
      });
    </script>
  `);

  await page.getByLabel('Cantidad:').fill('0');
  await page.getByRole('button', { name: 'Agregar al carrito' }).click();

  await expect(page.locator('#mensaje'))
    .toHaveText('Cantidad inválida');

  await expect(page.locator('#subtotal'))
    .toHaveText('$0');
});

test('agrega el producto con una cantidad válida', async ({ page }) => {
  await page.setContent(`
    <label for="cantidad">Cantidad:</label>
    <input id="cantidad" type="number" min="1" max="10" value="1">

    <button id="agregar">Agregar al carrito</button>

    <p id="mensaje"></p>
    <p id="subtotal">$0</p>

    <script>
      document.querySelector('#agregar').addEventListener('click', () => {
        const cantidad = Number(
          document.querySelector('#cantidad').value
        );

        if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > 11) {
          document.querySelector('#mensaje').textContent = 'Cantidad inválida';
          return;
        }

        document.querySelector('#mensaje').textContent = 'Producto agregado';
        document.querySelector('#subtotal').textContent =
          '$' + (cantidad * 50000).toLocaleString('es-CO');
      });
    </script>
  `);

  await page.getByLabel('Cantidad:').fill('2');
  await page.getByRole('button', { name: 'Agregar al carrito' }).click();

  await expect(page.locator('#mensaje'))
    .toHaveText('Producto agregado');

  await expect(page.locator('#subtotal'))
    .toHaveText('$100.000');
});

test('rechaza la cantidad 11', async ({ page }) => {
  await page.setContent(`
    <label for="cantidad">Cantidad:</label>
    <input id="cantidad" type="number" min="1" max="10" value="1">

    <button id="agregar">Agregar al carrito</button>
    <p id="mensaje"></p>
    <p id="subtotal">$0</p>

    <script>
      document.querySelector('#agregar').addEventListener('click', () => {
        const cantidad = Number(
          document.querySelector('#cantidad').value
        );

        if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > 10) {
          document.querySelector('#mensaje').textContent = 'Cantidad inválida';
          return;
        }

        document.querySelector('#mensaje').textContent = 'Producto agregado';
        document.querySelector('#subtotal').textContent =
          '$' + (cantidad * 50000).toLocaleString('es-CO');
      });
    </script>
  `);

  await page.getByLabel('Cantidad:').fill('11');
  await page.getByRole('button', { name: 'Agregar al carrito' }).click();

  await expect(page.locator('#mensaje'))
    .toHaveText('Cantidad inválida');

  await expect(page.locator('#subtotal'))
    .toHaveText('$0');
});