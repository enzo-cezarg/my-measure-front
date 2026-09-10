import type { KeyboardEvent } from 'react';

const TECLAS_PERMITIDAS = [
  'Backspace',
  'Delete',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Tab',
  'Home',
  'End',
];

export function bloquearNaoNumerico(e: KeyboardEvent<HTMLInputElement>) {
  const isTeclaControle = TECLAS_PERMITIDAS.includes(e.key);
  const isDigito = /^[0-9]$/.test(e.key);
  const isPonto = e.key === '.' && !e.currentTarget.value.includes('.');

  const isAtalho = (e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase());

  if (!isTeclaControle && !isDigito && !isPonto && !isAtalho) {
    e.preventDefault();
  }
}