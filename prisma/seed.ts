import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Créer les entreprises
  const companyNames = ['Carrefour', 'Leclerc', 'Intermarché'];
  for (const name of companyNames) {
    await prisma.company.create({ data: { name } });
  }
  const companies = await prisma.company.findMany();

  // 2. Créer les catégories
  const categoryNames = [
    'Informatique',
    'Bureautique',
    'Électroménager',
    'Multimédia',
    'Téléphonie',
  ];
  for (const name of categoryNames) {
    await prisma.category.create({ data: { name } });
  }
  const categories = await prisma.category.findMany();

  // 3. Liste des produits avec leurs catégories
  const productCatalog: {
    name: string;
    categories: string[];
  }[] = [
    { name: 'Ordinateur portable', categories: ['Informatique'] },
    { name: 'Imprimante laser', categories: ['Informatique', 'Bureautique'] },
    { name: 'Réfrigérateur', categories: ['Électroménager'] },
    { name: 'Télévision LED', categories: ['Multimédia'] },
    { name: 'Clé USB 64 Go', categories: ['Informatique'] },
    { name: 'Smartphone Android', categories: ['Téléphonie', 'Multimédia'] },
    { name: 'Scanner A4', categories: ['Bureautique'] },
    { name: 'Micro-ondes', categories: ['Électroménager'] },
    { name: 'Routeur Wi-Fi', categories: ['Informatique'] },
    { name: 'Enceinte Bluetooth', categories: ['Multimédia'] },
    { name: 'Casque audio', categories: ['Multimédia'] },
    { name: 'Machine à laver', categories: ['Électroménager'] },
    { name: 'Tablette tactile', categories: ['Téléphonie', 'Informatique'] },
    { name: 'Clavier mécanique', categories: ['Informatique'] },
    { name: 'Lampe LED USB', categories: ['Bureautique'] },
  ];

  // 4. Créer les produits pour chaque entreprise et les lier aux catégories
  for (const company of companies) {
    for (const item of productCatalog) {
      const product = await prisma.product.create({
        data: {
          name: item.name,
          quantity: Math.floor(Math.random() * 46) + 5, // entre 5 et 50
          companyId: company.id,
        },
      });

      // Lier aux catégories
      for (const catName of item.categories) {
        const category = categories.find(c => c.name === catName);
        if (category) {
          await prisma.productCategory.create({
            data: {
              productId: product.id,
              categoryId: category.id,
            },
          });
        }
      }
    }
  }

  console.log('✅ Données seed insérées avec succès !');
}

main()
  .catch(e => {
    console.error('❌ Erreur dans le seed :', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
