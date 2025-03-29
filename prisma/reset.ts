import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Suppression des données...');

  // Supprimer dans l'ordre des dépendances
  await prisma.productCategory.deleteMany(); // ← lier les produits aux catégories
  await prisma.product.deleteMany();
  await prisma.employee.deleteMany(); // ← si tu as des employés liés aux entreprises
  await prisma.category.deleteMany();
  await prisma.company.deleteMany();

  console.log('✅ Toutes les entités ont été supprimées avec succès.');
}

main()
  .catch(error => {
    console.error('❌ Erreur pendant la suppression :', error);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
