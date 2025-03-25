'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { fetchComapnyById, fetchUser } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Button } from '../../../components/ui/button';

interface CompanyInfoProps {
  id: string;
}
const CompanyInfo = ({ id: id }: CompanyInfoProps) => {
  const { data: company, isLoading: isLoadingCompany } = useQuery({
    queryKey: ['company', id],
    queryFn: () => fetchComapnyById(id),
  });
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  });
  useEffect(() => {
    setTimeout(() => {
      console.log(company);
      console.log(user);
    }, 2000);
  }, [user]);
  if (isLoadingCompany) {
    return (
      <div className="flex justify-center items-center flex-1">
        <p className="text-center text-4xl text-marine">Loading...</p>
      </div>
    );
  }
  return (
    <div className="flex flex-1 justify-center items-center">
      <Card className="flex flex-col w-full max-w-4xl border-2 border-marine bg-amande text-marine my-10">
        <CardHeader>
          <CardTitle className="text-4xl">{company.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <h1 className="font-bold text-2xl">Liste des produits</h1>
          <Table className="mt-4">
            <TableCaption>Liste des produits</TableCaption>
            <TableHeader>
              <TableRow className="hover:bg-marine/90 bg-marine">
                <TableHead className="text-amande">Produits: </TableHead>
                <TableHead className="text-amande">Quantité: </TableHead>
                <TableHead className="text-amande">Catégories: </TableHead>
                {user && user.name && (
                  <>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                  </>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {company?.products.map((product: any, index: number) => (
                <TableRow key={index} className="hover:bg-marine/5 w-full">
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell className="whitespace-normal">
                    {product.categories.map((pc: any, index: number) => (
                      <span
                        key={index}
                        className="bg-marine text-white text-xs px-2 py-1 rounded-full mr-1"
                      >
                        {pc.category.name}
                      </span>
                    ))}
                  </TableCell>
                  {user && user.name && (
                    <>
                      <TableCell>
                        <Button variant={'outline'}>Modifier</Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant={'destructive'}
                          className="bg-feu hover:bg-feu-hover"
                        >
                          Supprimer
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <h1 className="text-marine text-2xl mt-10 font-bold">
            Liste des employés
          </h1>
          <Table className="mt-4">
            <TableCaption>Liste des employés</TableCaption>
            <TableHeader>
              <TableRow className="hover:bg-marine/90 bg-marine">
                <TableHead className="text-amande">Nom: </TableHead>
                <TableHead className="text-amande">Email: </TableHead>
                <TableHead className="text-amande">Role: </TableHead>
                {user && user.role == 'PATRON' && <TableHead></TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {company?.employees.map((employee: any, index: number) => (
                <TableRow key={index} className="hover:bg-marine/5">
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  {user && user.role == 'PATRON' && (
                    <>
                      <TableCell className="flex justify-end gap-4">
                        <Button variant={'outline'}>Modifier</Button>
                        <Button
                          variant={'destructive'}
                          className="bg-feu hover:bg-feu-hover"
                        >
                          Supprimer
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
export default CompanyInfo;
