
const test = require("node:test");
const assert = require("node:assert/strict");

function calcularSubtotal(productos) {
  return productos.reduce(
    (total, producto) =>
      total + producto.precio * producto.cantidad,
    0
  );
}

test("calcula el subtotal de dos productos", () => {
  const productos = [
    { nombre: "Esencia de lavanda", precio: 50000, cantidad: 2 },
    { nombre: "Colorante para velas", precio: 20000, cantidad: 3 }
  ];

  const resultadoReal = calcularSubtotal(productos);
  const resultadoEsperado = 160000;

  assert.equal(resultadoReal, resultadoEsperado);
});


function validarCantidad(cantidad) {
  return Number.isInteger(cantidad) &&
    cantidad >= 1 &&
    cantidad <= 10;
}

test("acepta una cantidad válida de 5 unidades", () => {
  assert.equal(validarCantidad(5), true);
});

test("rechaza una cantidad superior al límite", () => {
  assert.equal(validarCantidad(11), false);
});

test("rechaza una cantidad de cero", () => {
  assert.equal(validarCantidad(0), false);
});
