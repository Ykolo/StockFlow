import { describe, expect, it } from 'vitest';

// Simuler des fonctions d'authentification basées sur ce que j'ai vu dans la codebase
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password: string): boolean {
  return password.length >= 8;
}

function validateLoginForm(data: { email: string; password: string }) {
  const errors: Record<string, string> = {};

  if (!data.email) {
    errors.email = "L'email est requis";
  } else if (!validateEmail(data.email)) {
    errors.email = "Format d'email invalide";
  }

  if (!data.password) {
    errors.password = 'Le mot de passe est requis';
  } else if (!validatePassword(data.password)) {
    errors.password = 'Le mot de passe doit contenir au moins 8 caractères';
  }

  return errors;
}

describe('Auth Utils', () => {
  describe('validateEmail', () => {
    it('should validate correct email formats', () => {
      expect(validateEmail('user@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.com')).toBe(true);
      expect(validateEmail('user+tag@example.com')).toBe(true);
    });

    it('should reject incorrect email formats', () => {
      expect(validateEmail('user@')).toBe(false);
      expect(validateEmail('user@domain')).toBe(false);
      expect(validateEmail('user.domain.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should validate passwords with 8+ characters', () => {
      expect(validatePassword('password123')).toBe(true);
      expect(validatePassword('12345678')).toBe(true);
      expect(validatePassword('P@ssw0rd!')).toBe(true);
    });

    it('should reject passwords with less than 8 characters', () => {
      expect(validatePassword('pass')).toBe(false);
      expect(validatePassword('1234567')).toBe(false);
      expect(validatePassword('')).toBe(false);
    });
  });

  describe('validateLoginForm', () => {
    it('should return no errors for valid form data', () => {
      const formData = {
        email: 'user@example.com',
        password: 'password123',
      };

      const errors = validateLoginForm(formData);
      expect(Object.keys(errors).length).toBe(0);
    });

    it('should return errors for empty form data', () => {
      const formData = {
        email: '',
        password: '',
      };

      const errors = validateLoginForm(formData);
      expect(errors.email).toBeDefined();
      expect(errors.password).toBeDefined();
    });

    it('should return error for invalid email format', () => {
      const formData = {
        email: 'invalid-email',
        password: 'password123',
      };

      const errors = validateLoginForm(formData);
      expect(errors.email).toBeDefined();
      expect(errors.password).toBeUndefined();
    });

    it('should return error for short password', () => {
      const formData = {
        email: 'user@example.com',
        password: 'short',
      };

      const errors = validateLoginForm(formData);
      expect(errors.email).toBeUndefined();
      expect(errors.password).toBeDefined();
    });
  });
});
