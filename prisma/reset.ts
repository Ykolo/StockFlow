import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Suppression des données...');

  // Ordre inverse des dépendances à respecter
  await prisma.category.deleteMany();
  await prisma.productCategory.deleteMany();
  await prisma.product.deleteMany();
  await prisma.employee.deleteMany();
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
