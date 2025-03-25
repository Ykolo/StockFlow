'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

const ClientLoginRedirect = () => {
  const router = useRouter();
  useEffect(() => {
    toast('Vous êtes déjà connecté');
    const timeout = setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [router]);
  return null;
};
export default ClientLoginRedirect;
