import Link from 'next/link';
import Footer from '../../components/Footer';
import LogoutButton from '../../components/Logout';
import Navbar from '../../components/Navbar';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { fetchUser } from '../../lib/api';

const DashboardPage = async () => {
  const user = await fetchUser();
  console.log(user);
  return (
    <div className="flex flex-col bg-amande min-h-screen">
      <Navbar />
      <main className="flex-1 flex flex-col justify-center items-center">
        <Card className="bg-amande w-full max-w-md border-2 border-marine">
          {user ? (
            <CardContent className="flex flex-col text-marine">
              <h1>Bonjour {user.name}</h1>
              <p>Vous êtes connecté en tant que {user.email}</p>
              <LogoutButton />
            </CardContent>
          ) : (
            <>
              <CardContent className="flex flex-col text-marine">
                <p>Veuillez d'abord vous connecter ou créer un compte</p>
                <div className="flex justify-end gap-4">
                  <Button asChild className="text-marine" variant={'outline'}>
                    <Link href="/login">Connexion</Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-mangue hover:bg-mangue-hover text-marine"
                  >
                    <Link href={'/signup'}>Inscription</Link>
                  </Button>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
