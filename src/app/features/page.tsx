import { Separator } from '@radix-ui/react-separator';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { Badge } from '../../components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';

const FeaturesPage = () => {
  return (
    <div className="bg-amande min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col gap-4 px-6 py-10 space-y-16 text-marine">
        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            Pourquoi choisir StockFlow ?
          </h1>
          <p className="text-lg text-marine/80">
            Gérer un stock devient rapidement complexe. StockFlow vous simplifie
            la tâche grâce à une interface moderne, une mise à jour en temps
            réel et un tableau de bord intuitif.
          </p>
        </section>

        {/* Fonctionnalités */}
        <section id="features" className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Fonctionnalités clés
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Authentification sécurisée', icon: '🔐' },
              { title: 'Gestion des employés', icon: '👥' },
              { title: 'CRUD produits', icon: '📦' },
              { title: 'Suivi des mouvements', icon: '🔄' },
              { title: 'Dashboard synthétique', icon: '📊' },
            ].map((f, i) => (
              <Card key={i} className="bg-white text-marine">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {f.icon} {f.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-marine/80">
                    Fonctionnalité essentielle pour une gestion moderne et
                    fluide du stock.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stack technique */}
        <section className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Technologies utilisées
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'React',
              'Next.js',
              'TypeScript',
              'Zod',
              'Tailwind CSS',
              'ShadCN',
              'PostgreSQL',
              'Prisma',
              'Tanstack Query',
              'Zustand',
              'Vitest',
            ].map((tech, i) => (
              <Badge
                key={i}
                className="bg-mangue text-marine px-4 py-2 text-sm hover:bg-mangue/80"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </section>

        {/* Sécurité */}
        <section className="text-center max-w-3xl mx-auto">
          <Separator className="my-8" />
          <h2 className="text-xl font-semibold mb-2">Sécurité et fiabilité</h2>
          <p className="text-[#1e3d59]/80">
            Vos données sont protégées. Les mots de passe sont chiffrés, et les
            accès à l'application sont sécurisés via des tokens.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};
export default FeaturesPage;
