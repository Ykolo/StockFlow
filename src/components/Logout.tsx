'use client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { logout } from '../lib/action/auth.action';
import { Button } from './ui/button';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result) {
        toast.success('Vous avez été déconnecté');
        router.push('/');
      }
    } catch (e: any) {
      console.error(e.message);
      toast.error(`Erreur lors de la déconnexion ${e.message}`);
    }
  };
  return (
    <Button variant={'outline'} onClick={handleLogout}>
      Déconnexion
    </Button>
  );
};
export default LogoutButton;
