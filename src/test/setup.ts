import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'vitest';

// Étend les assertions de Vitest avec les matchers de jest-dom
expect.extend(matchers);

// Nettoie automatiquement après chaque test
afterEach(() => {
  cleanup();
});
