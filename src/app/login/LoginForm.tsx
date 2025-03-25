'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { login } from '../../lib/action/auth.action';

const LoginFormSchema = z.object({
  login: z.string().min(3, 'Le login doit contenir au moins 3 caractères'),
  password: z
    .string()
    .min(3, 'Le mot de passe doit contenir au moins 3 caractères'),
});
type LoginFormType = z.infer<typeof LoginFormSchema>;

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const onSubmit = async (formData: LoginFormType) => {
    setIsLoading(true);
    try {
      const result = await login(formData.login, formData.password);
      if (result && result.success) {
        toast.success('Authentification réussie');
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        toast.error(result?.message || "Erreur lors de l'authentification");
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 text-marine"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="ml-2">Login</FormLabel>
              <FormControl>
                <Input
                  id="login"
                  placeholder="exemple@gmail.com"
                  {...field}
                  className="placeholder:text-marine/50 border-marine/20"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="ml-2">Mot de passe</FormLabel>
              <FormControl>
                <Input
                  id="password"
                  placeholder="Mot de passe..."
                  {...field}
                  className="placeholder:text-marine/50 border-marine/20"
                  type="password"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-feu hover:bg-feu-hover"
          disabled={isLoading}
        >
          {isLoading ? 'Chargement...' : 'Connexion'}
        </Button>
      </form>
    </Form>
  );
};
export default LoginForm;
