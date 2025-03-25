import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import LogoutButton from '../../components/Logout';
import Navbar from '../../components/Navbar';
import { Button } from '../../components/ui/button';
import { fetchUser } from '../../lib/api';
import LoginForm from './LoginForm';

const Login = async () => {
  const user = await fetchUser();

  return (
    <div className="bg-amande min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center">
        <Card className="bg-amande w-full max-w-md border-2 border-marine">
          {!user.error ? (
            <CardContent className="text-marine">
              <p>Vous êtes déjà connecté</p>
              <p>
                Vous pouvez vous déconnecter en cliquant sur le bouton
                ci-dessous
              </p>
              <div className="flex gap-4 justify-end mt-8">
                <Button variant={'outline'} asChild>
                  <Link href={'/dashboard'}>Dashboard</Link>
                </Button>
                <LogoutButton />
              </div>
            </CardContent>
          ) : (
            <>
              <CardHeader>
                <CardTitle className="text-marine text-2xl text-center">
                  Connexion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LoginForm />
              </CardContent>
            </>
          )}
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
