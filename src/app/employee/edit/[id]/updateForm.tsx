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
import { fetchEmployeeById } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { updateEmployee } from '../../../../lib/action/employee.action';

const updateFormSchema = z.object({
  name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email'),
  role: z.string().min(2, 'Position is required'),
});

type updateFormType = z.infer<typeof updateFormSchema>;

const UpdateEmployeeForm = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const id = params.id;

  const { data: employee } = useQuery({
    queryKey: ['employee', id],
    queryFn: () => fetchEmployeeById(id),
  });

  const form = useForm<updateFormType>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      name: employee?.name ?? '',
      email: employee?.email ?? '',
      role: employee?.role ?? '',
    },
  });
  useEffect(() => {
    if (employee) {
      form.reset({
        name: employee.name,
        email: employee.email,
        role: employee.role,
      });
    }
  }, [employee, form]);

  const onSubmit = async (data: updateFormType) => {
    try {
      const response = await updateEmployee(id, data);
      if (response.success) {
        toast.success(response.message);
        setTimeout(() => {
          router.push('/companies');
        }, 1000);
      } else {
        toast.error(response.message);
      }
    } catch (e: any) {
      toast.error('An error occurred while updating employee');
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
              <FormLabel className="ml-2">Nom</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nom"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="ml-2">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email"
                  type="email"
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
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="ml-2">Role</FormLabel>
              <FormControl>
                <Input
                  placeholder="Role"
                  {...field}
                  className="placeholder:text-marine/50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Annuler
          </Button>
          <Button type="submit" className="bg-feu hover:bg-feu-hover">
            Modifier
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateEmployeeForm;
