
import { test, expect } from '@playwright/test';

function validarCantidad(cantidad) {
  return Number.isInteger(cantidad) &&
    cantidad >= 1 &&
    cantidad <= 10;
}

test('acepta la cantidad mínima de 1', async () => {
  expect(validarCantidad(1)).toBe(true);
});

test('acepta la cantidad máxima de 10', async () => {
  expect(validarCantidad(10)).toBe(true);
});

test('rechaza la cantidad 0', async () => {
  expect(validarCantidad(0)).toBe(false);
});

test('rechaza la cantidad 11', async () => {
  expect(validarCantidad(11)).toBe(false);
});

test('rechaza cantidades negativas', async () => {
  expect(validarCantidad(-1)).toBe(false);
});