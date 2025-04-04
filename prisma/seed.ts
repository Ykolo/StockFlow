import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  // 1. Créer les entreprises (enseignes françaises)
  const companyNames = [
    'Carrefour',
    'Leclerc',
    'Intermarché',
    'Auchan',
    'Monoprix',
  ];

  for (const name of companyNames) {
    await prisma.company.create({ data: { name } });
  }

  const companies = await prisma.company.findMany();

  // 2. Créer un employé admin (patron)
  const hashedPassword = await argon2.hash('admin');
  await prisma.employee.create({
    data: {
      name: 'Admin',
      email: 'admin@admin.com',
      password: hashedPassword,
      role: 'PATRON',
      companyId: companies[0].id,
    },
  });

  // 3. Créer les catégories
  const categoryNames = [
    'Informatique',
    'Bureautique',
    'Électroménager',
    'Multimédia',
    'Téléphonie',
    'Jeux vidéo',
    'Mobilier',
    'Papeterie',
    'Image et Son',
    'Réseau',
    'Accessoires',
  ];

  for (const name of categoryNames) {
    await prisma.category.create({ data: { name } });
  }

  const categories = await prisma.category.findMany();

  // 4. Nouveau catalogue de produits (50+ produits)
  const productCatalog: {
    name: string;
    categories: string[];
  }[] = [
    { name: 'Ordinateur portable', categories: ['Informatique'] },
    { name: 'Imprimante laser', categories: ['Informatique', 'Bureautique'] },
    { name: 'Réfrigérateur', categories: ['Électroménager'] },
    { name: 'Télévision LED', categories: ['Multimédia', 'Image et Son'] },
    { name: 'Clé USB 64 Go', categories: ['Informatique', 'Accessoires'] },
    { name: 'Smartphone Android', categories: ['Téléphonie', 'Multimédia'] },
    { name: 'Scanner A4', categories: ['Bureautique'] },
    { name: 'Micro-ondes', categories: ['Électroménager'] },
    { name: 'Routeur Wi-Fi', categories: ['Informatique', 'Réseau'] },
    { name: 'Enceinte Bluetooth', categories: ['Multimédia', 'Accessoires'] },
    { name: 'Casque audio', categories: ['Multimédia', 'Image et Son'] },
    { name: 'Machine à laver', categories: ['Électroménager'] },
    { name: 'Tablette tactile', categories: ['Téléphonie', 'Informatique'] },
    { name: 'Clavier mécanique', categories: ['Informatique', 'Accessoires'] },
    { name: 'Lampe LED USB', categories: ['Bureautique'] },
    { name: 'Disque dur externe 1To', categories: ['Informatique'] },
    { name: 'Fauteuil de bureau ergonomique', categories: ['Mobilier'] },
    { name: 'Jeu vidéo PS5', categories: ['Jeux vidéo'] },
    { name: 'Caméra de surveillance', categories: ['Multimédia', 'Réseau'] },
    { name: 'Chargeur sans fil', categories: ['Accessoires', 'Téléphonie'] },
    { name: 'Carnet A5', categories: ['Papeterie'] },
    { name: 'Stylo plume', categories: ['Papeterie'] },
    { name: 'Bureau en bois', categories: ['Mobilier'] },
    { name: 'Imprimante photo', categories: ['Multimédia', 'Bureautique'] },
    { name: 'Répéteur Wi-Fi', categories: ['Réseau'] },
    { name: 'Webcam HD', categories: ['Multimédia'] },
    { name: 'Ventilateur USB', categories: ['Accessoires'] },
    { name: 'Projecteur LED', categories: ['Image et Son'] },
    {
      name: 'Écouteurs intra-auriculaires',
      categories: ['Accessoires', 'Multimédia'],
    },
    { name: 'Switch réseau 8 ports', categories: ['Réseau'] },
    { name: 'Souris sans fil', categories: ['Accessoires', 'Informatique'] },
    { name: 'Tapis de souris RGB', categories: ['Accessoires'] },
    { name: 'Support pour ordinateur portable', categories: ['Mobilier'] },
    { name: 'Chaise gaming', categories: ['Mobilier'] },
    { name: 'Lecteur DVD externe', categories: ['Informatique'] },
    { name: 'Station de charge multiple', categories: ['Accessoires'] },
    { name: 'Lampe de bureau réglable', categories: ['Bureautique'] },
    { name: 'Plastifieuse A4', categories: ['Bureautique'] },
    { name: 'Tableau blanc magnétique', categories: ['Bureautique'] },
    { name: 'Boîte de classement A4', categories: ['Papeterie'] },
    { name: 'Trousse scolaire', categories: ['Papeterie'] },
    { name: 'Téléphone sans fil DECT', categories: ['Téléphonie'] },
    { name: 'Caméscope HD', categories: ['Multimédia'] },
    { name: 'Console de jeu portable', categories: ['Jeux vidéo'] },
    { name: 'Chaise pliante', categories: ['Mobilier'] },
    { name: 'Carte SD 128 Go', categories: ['Accessoires'] },
    { name: 'Support mural TV', categories: ['Image et Son'] },
    { name: 'Écran PC 27 pouces', categories: ['Informatique'] },
    { name: 'Mini projecteur portable', categories: ['Image et Son'] },
    { name: 'Multiprise parafoudre', categories: ['Accessoires'] },
    { name: 'Pochettes plastiques perforées', categories: ['Papeterie'] },
  ];

  // 5. Créer les produits de façon aléatoire, uniques par entreprise
  for (const company of companies) {
    const numProducts = Math.floor(Math.random() * 6) + 15; // entre 15 et 20
    const shuffled = [...productCatalog].sort(() => 0.5 - Math.random());
    const selectedProducts = shuffled.slice(0, numProducts);

    for (const item of selectedProducts) {
      const product = await prisma.product.create({
        data: {
          name: item.name,
          quantity: Math.floor(Math.random() * 46) + 5, // entre 5 et 50
          companyId: company.id,
        },
      });

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
