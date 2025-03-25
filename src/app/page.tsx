import Footer from '@/components/Footer';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/button';

const Home = async () => {
  return (
    <div className="bg-amande min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center text-center text-marine">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4 ">
          Gérer votre stock <span className="text-feu">en temps réel</span>
          <br />
          n'a jamais été aussi simple
        </h1>
        <p className="text-base text-marine/70  max-w-xl mt-2">
          L'application simple et rapide pour gérer votre stock au quotidien.
        </p>
        <div className="flex gap-4 mt-6">
          <Button className="bg-feu hover:bg-feu-hover" asChild>
            <Link href={'/register'}>Commencer</Link>
          </Button>
          <Button
            variant={'outline'}
            className="border-2 border-marine text-marine hover:text-marine-hover"
            asChild
          >
            <Link href={'/features'}>Découvrir</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
