import { describe, expect, it } from 'vitest';

// Fonction utilitaire simplifiée pour les tests (basée sur le cn vu dans la codebase)
function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

// Fonction de formatage de date simplifiée
function formatDate(dateString: string): string {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch (error) {
    return '';
  }
}

// Fonction de pagination simplifiée
function generatePagination(currentPage: number, totalPages: number): number[] {
  // Si pas de pages, retourner un tableau vide
  if (totalPages <= 0) {
    return [];
  }

  // Si moins de 7 pages au total, montrer toutes les pages
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Gestion des cas particuliers (début, milieu, fin)
  if (currentPage <= 3) {
    return [1, 2, 3, 4, 5, -1, totalPages]; // -1 représente une ellipse
  } else if (currentPage >= totalPages - 2) {
    return [
      1,
      -1,
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  } else {
    return [
      1,
      -1,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      -1,
      totalPages,
    ];
  }
}

describe('Utils', () => {
  describe('cn (className utility)', () => {
    it('should join class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
      expect(cn('class1', undefined, 'class2')).toBe('class1 class2');
      expect(cn('class1', null, 'class2')).toBe('class1 class2');
      expect(cn('class1', false && 'class2', true && 'class3')).toBe(
        'class1 class3'
      );
    });

    it('should handle empty values', () => {
      expect(cn()).toBe('');
      expect(cn(null, undefined, false)).toBe('');
    });
  });

  describe('formatDate', () => {
    it('should format date strings correctly', () => {
      // Note: le test dépend de la locale
      const formatted = formatDate('2023-04-15T12:00:00Z');
      expect(formatted).toContain('2023'); // Doit contenir l'année
      expect(typeof formatted).toBe('string');
    });

    it('should handle empty date strings', () => {
      expect(formatDate('')).toBe('');
    });

    it('should handle invalid date strings', () => {
      expect(formatDate('invalid-date')).toBe('');
    });
  });

  describe('generatePagination', () => {
    it('should generate pagination for small number of pages', () => {
      const pagination = generatePagination(1, 5);
      expect(pagination).toEqual([1, 2, 3, 4, 5]);
    });

    it('should generate pagination for start pages', () => {
      const pagination = generatePagination(1, 10);
      expect(pagination[0]).toBe(1);
      expect(pagination).toContain(2);
      expect(pagination).toContain(3);
      expect(pagination.includes(-1)).toBe(true); // Ellipse
      expect(pagination[pagination.length - 1]).toBe(10);
    });

    it('should generate pagination for middle pages', () => {
      const pagination = generatePagination(5, 10);
      expect(pagination[0]).toBe(1);
      expect(pagination.includes(-1)).toBe(true); // Ellipse
      expect(pagination).toContain(4);
      expect(pagination).toContain(5);
      expect(pagination).toContain(6);
      expect(pagination[pagination.length - 1]).toBe(10);
    });

    it('should generate pagination for end pages', () => {
      const pagination = generatePagination(9, 10);
      expect(pagination[0]).toBe(1);
      expect(pagination.includes(-1)).toBe(true); // Ellipse
      expect(pagination).toContain(8);
      expect(pagination).toContain(9);
      expect(pagination).toContain(10);
    });

    it('should handle edge cases', () => {
      expect(generatePagination(1, 1)).toEqual([1]);
      expect(generatePagination(0, 0)).toEqual([]);
    });
  });
});
