'use client';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { createProduct } from '@/lib/action/product.action';
import { fetchCategories } from '@/lib/api';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const ProductFormSchema = z.object({
  companyId: z.string(),
  name: z.string().min(3),
  quantity: z
    .string()
    .transform(val => Number(val))
    .pipe(z.number().min(1, 'La quantité doit être supérieure à 0')),
  categories: z.array(z.string()).min(1, 'Choisissez au moins une catégorie'),
});

export type ProductsFormType = z.infer<typeof ProductFormSchema>;

const AddProductForm = ({ id }: { id: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProductsFormType>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      companyId: id,
      name: '',
      quantity: 0,
      categories: [],
    },
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const onSubmit = async (data: ProductsFormType) => {
    try {
      setIsLoading(true);
      const response = await createProduct(data as any);
      if (response && response.success) {
        toast.success('Produit ajouté avec succès');
        form.reset();
        router.push(`/companies/${id}`);
      } else {
        toast.error(response?.message || "Erreur lors de l'enregistrement");
      }
    } catch (e) {
      console.error('Register error:', e);
      toast.error("Une erreur s'est produite lors de l'enregistrement");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 text-marine flex flex-col gap-2"
        >
          {/* Nom du produit */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ml-2">Nom du produit</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nom du produit"
                    {...field}
                    id="name"
                    className="placeholder:text-marine/50 border-marine/20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Quantité */}
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ml-2">Quantité</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="quantity"
                    type="number"
                    min={1}
                    placeholder="Quantité"
                    className="placeholder:text-marine/50 border-marine/20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Catégories (multi-select combobox) */}
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ml-2">Catégories</FormLabel>
                <FormControl>
                  <CategoryCombobox
                    value={field.value}
                    onChange={field.onChange}
                    options={categories?.map((cat: any) => ({
                      id: cat.id,
                      label: cat.name,
                    }))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bouton de soumission */}
          <Button
            className={cn(
              'bg-mangue hover:bg-mangue-hover text-marine',
              isLoading && 'opacity-50 cursor-not-allowed'
            )}
            disabled={isLoading}
            type="submit"
          >
            Ajouter
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddProductForm;

export const CategoryCombobox = ({
  value,
  onChange,
  options,
}: {
  value: string[];
  onChange: (val: string[]) => void;
  options: { id: string; label: string }[];
}) => {
  const [open, setOpen] = useState(false);

  const toggle = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter(item => item !== id));
      setOpen(false);
    } else {
      onChange([...value, id]);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between bg-amande hover:bg-amande-hover hover:text-marine-hover"
        >
          {value.length > 0 && options.length > 0
            ? value
                .map(id => options.find(o => o.id === id)?.label)
                .filter(Boolean)
                .join(', ')
            : 'Choisir les catégories'}

          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50 text-marine" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command className="bg-amande text-marine">
          <CommandInput placeholder="Rechercher une catégorie..." />
          <CommandEmpty>Aucune catégorie</CommandEmpty>
          <CommandGroup className="max-h-60 overflow-y-auto">
            {options?.map(opt => (
              <CommandItem
                key={opt.id}
                onSelect={() => toggle(opt.id)}
                className="flex justify-between text-marine hover:!bg-amande-hover hover:*:text-marine-hover"
              >
                <span>{opt.label}</span>
                {value.includes(opt.id) && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
