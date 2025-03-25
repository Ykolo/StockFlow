'use client';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { fetchCompanies } from '@/lib/api';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { createEmployee } from '../../lib/action/employee.action';
import { companyType } from '../companies/companies.type';

const RegisterFormSchema = z.object({
  name: z.string().min(3, 'Le nom doit contenir au moins 3 caractères'),
  email: z.string().email("L'email n'est pas valide"),
  password: z
    .string()
    .min(2, 'Le mot de passe doit contenir au moins 2 caractères'),
  companyId: z.string().nonempty("L'entreprise est requise"),
});
type RegisterFormType = z.infer<typeof RegisterFormSchema>;

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: companies } = useQuery({
    queryKey: ['companies'],
    queryFn: fetchCompanies,
  });

  const form = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      companyId: '',
    },
  });

  const onSubmit = async (formData: RegisterFormType) => {
    setIsLoading(true);
    console.log('Starting registration with data:', formData);

    try {
      // Log the stringified data for better debugging
      console.log('Submitting data:', JSON.stringify(formData));

      const response = await createEmployee(formData as any);
      console.log('Response received:', response);

      if (response && response.success) {
        toast.success('Inscription réussie');
        form.reset();
      } else {
        toast.error(response?.message || "Erreur lors de l'enregistrement");
      }
    } catch (e) {
      console.error('Register error:', e);
      toast.error("Une erreur s'est produite lors de l'inscription");
    } finally {
      console.log('Setting loading state to false');
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col text-marine gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="ml-2">Nom</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="name"
                  placeholder="Entrez votre nom "
                  className="placeholder:text-marine/50 border-marine/20"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="ml-2">Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="email"
                  placeholder="exemple@gmail.com"
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
                  {...field}
                  id="password"
                  placeholder="Mot de passe..."
                  className="placeholder:text-marine/50 border-marine/20"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="ml-2">Entreprise</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      role="combobox"
                      className={cn(
                        'justify-between bg-amande hover:bg-amande-hover ',
                        !field.value && 'text-marine/50'
                      )}
                    >
                      {field.value
                        ? companies.find(
                            (company: companyType) => company.id === field.value
                          )?.name
                        : 'Sélectionner une entreprise'}
                      <ChevronsUpDown className="opacity-50 text-marine" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="bg-amande">
                  <Command className="bg-amande text-marine">
                    <CommandInput
                      placeholder="Dans quelle entreprise travaillez vous ?"
                      className="placeholder:text-marine"
                    />
                    <CommandList>
                      <CommandEmpty>Aucune entreprise trouvé</CommandEmpty>
                      <CommandGroup>
                        {companies?.map((company: companyType) => (
                          <CommandItem
                            value={company.name}
                            key={company.id}
                            onSelect={() => {
                              form.setValue('companyId', company.id);
                            }}
                            className="text-marine active:bg-amande hover:bg-amande-hover data-[selected=true]:bg-amande-hover data-[selected=true]:text-marine"
                          >
                            {company.name}
                            <Check
                              className={cn(
                                'ml-auto',
                                company.name === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <Button
          className="bg-feu hover:bg-feu-hover"
          type="submit"
          disabled={isLoading}
          onClick={() =>
            console.log('Button clicked, loading state:', isLoading)
          }
        >
          {isLoading ? 'En cours...' : "S'inscrire"}
        </Button>
      </form>
    </Form>
  );
};
export default RegisterForm;
