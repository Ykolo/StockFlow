import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ClientLoginRedirect from '../../components/ClientLoginRedirect';
import { fetchUser } from '../../lib/api';
import RegisterForm from './RegisterForm';

const Register = async () => {
  const user = await fetchUser();

  return (
    <div className="bg-amande min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center">
        <Card className="bg-amande w-full max-w-md border-2 border-marine">
          {!user.error && <ClientLoginRedirect />}
          <CardHeader>
            <CardTitle className="text-marine text-2xl text-center">
              Créer un compte
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
