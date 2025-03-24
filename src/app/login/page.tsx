import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import Navbar from '../../components/Navbar';
import { Button } from '../../components/ui/button';
import { logout } from '../../lib/action/auth.action';
import { fetchUser } from '../../lib/api';
import LoginForm from './LoginForm';

const Login = async () => {
  const result = await fetchUser();
  console.log(result);

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result) {
        toast.success('Vous avez été déconnecté');
      }
    } catch (e: any) {
      console.error(e.message);
      toast.error('Erreur lors de la déconnexion');
    }
  };
  return (
    <div className="bg-amande min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center">
        <Card className="bg-amande w-full max-w-md border-2 border-marine">
          {result ? (
            <CardContent className="text-marine">
              <p>Vous êtes déjà connecté</p>
              <p>
                Vous pouvez vous déconnecter en cliquant sur le bouton
                ci-dessous
              </p>
              <Button onClick={handleLogout}>Déconnexion</Button>
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
