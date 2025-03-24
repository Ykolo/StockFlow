import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Création des entreprises
  const companies = await prisma.company.createMany({
    data: [
      { name: 'TechCorp' },
      { name: 'LogiStock' },
      { name: 'DistribPlus' },
    ],
  });

  // 2. On récupère les entreprises insérées avec leurs IDs
  const allCompanies = await prisma.company.findMany();

  // 3. Création des produits pour chaque entreprise
  for (const company of allCompanies) {
    await prisma.product.createMany({
      data: [
        {
          name: 'Souris sans fil',
          quantity: 25,
          companyId: company.id,
        },
        {
          name: 'Clavier mécanique',
          quantity: 15,
          companyId: company.id,
        },
        {
          name: 'Écran 24 pouces',
          quantity: 10,
          companyId: company.id,
        },
      ],
    });
  }

  console.log('✅ Entreprises et produits créés avec succès');
}

main()
  .catch((e) => {
    console.error('❌ Erreur dans le seed :', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
