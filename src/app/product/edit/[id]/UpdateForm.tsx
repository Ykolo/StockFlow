'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { fetchCategories, fetchProductById } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { updateProduct } from '../../../../lib/action/product.action';
import { CategoryCombobox } from '../../add/[id]/AddForm';

const updateFormSchema = z.object({
  name: z.string().min(3),
  quantity: z
    .string()
    .transform(val => Number(val))
    .pipe(z.number().min(1, 'La quantité doit être supérieure à 0')),
  categories: z.array(z.string()).min(1, 'Choisissez au moins une catégorie'),
});
type updateFormType = z.infer<typeof updateFormSchema>;

const UpdateForm = ({ id }: { id: string }) => {
  const { data: product } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
  });
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const form = useForm<updateFormType>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      name: product?.name ?? '',
      quantity: product?.quantity ?? '',
      categories: product?.categories ?? [],
    },
  });
  useEffect(() => {
    if (product && categories) {
      const validCategoryIds = categories?.map((c: any) => c.id);
      const safeCategoryIds = (product.categories ?? []).filter((id: any) =>
        validCategoryIds.includes(id)
      );

      form.reset({
        name: product.name,
        quantity: product.quantity,
        categories: safeCategoryIds,
      });
    }
  }, [product, form, categories]);

  const onSubmit = async (data: updateFormType) => {
    try {
      const response = await updateProduct(product.id, data);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (e: any) {
      console.error(e.message);
    }
  };
  return (
    <Form {...form}>
      <form
        className="space-y-4 text-marine flex flex-col gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du produit</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nom du produit"
                  {...field}
                  className="placeholder:text-marine/50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantité</FormLabel>
              <FormControl>
                <Input
                  placeholder="Quantité"
                  {...field}
                  className="placeholder:text-marine/50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {categories ? (
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catégories</FormLabel>
                <FormControl>
                  <CategoryCombobox
                    value={field.value ?? []}
                    onChange={field.onChange}
                    options={categories.map((cat: any) => ({
                      id: cat.id,
                      label: cat.name,
                    }))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <p>Chargement des catégories...</p>
        )}

        <Button className="bg-feu hover:bg-feu-hover">Modifier</Button>
      </form>
    </Form>
  );
};
export default UpdateForm;
