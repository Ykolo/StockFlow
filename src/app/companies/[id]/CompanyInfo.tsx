'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { deleteProduct } from '@/lib/action/product.action';
import { fetchComapnyById, fetchUser } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CompanyInfoProps {
  id: string;
}
const CompanyInfo = ({ id: id }: CompanyInfoProps) => {
  const [productPage, setProductPage] = useState(1);
  const [employeePage, setEmployeePage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const router = useRouter();

  const PAGE_SIZE = 10;

  const { data: company, isLoading: isLoadingCompany } = useQuery({
    queryKey: ['company', id],
    queryFn: () => fetchComapnyById(id),
  });
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  });

  const paginatedProducts = company?.products
    ? company.products.slice(
        (productPage - 1) * PAGE_SIZE,
        productPage * PAGE_SIZE
      )
    : [];
  const productsPageCount = company?.products
    ? Math.ceil(company.products.length / PAGE_SIZE)
    : 1;

  const paginatedEmployees = company?.employees
    ? company.employees.slice(
        (employeePage - 1) * PAGE_SIZE,
        employeePage * PAGE_SIZE
      )
    : [];
  const employeesPageCount = company?.employees
    ? Math.ceil(company.employees.length / PAGE_SIZE)
    : 1;

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id);
    window.location.reload();
  };

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
          <div className="flex">
            <h1 className="font-bold text-2xl">Liste des produits</h1>
            <Button
              className="ml-auto bg-mangue hover:bg-mangue-hover text-marine"
              asChild
            >
              <Link href={`/product/add/${id}`}>Ajouter un produit</Link>
            </Button>
          </div>
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
              {paginatedProducts.map((product: any, index: number) => (
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
                        <Button variant={'outline'} asChild>
                          <Link href={`/product/edit/${product.id}`}>
                            Modifier
                          </Link>
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant={'destructive'}
                          className="bg-feu hover:bg-feu-hover"
                          onClick={() => {
                            setOpen(true);
                            setSelectedId(product.id);
                          }}
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
          {company.products.length > PAGE_SIZE && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setProductPage(prev => Math.max(prev - 1, 1))
                    }
                    className={
                      productPage === 1
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-default'
                    }
                  />
                </PaginationItem>
                <PaginationItem className="cursor-default px-4 text-sm">
                  Page {productPage} sur {productsPageCount}
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setProductPage(prev =>
                        Math.min(prev + 1, productsPageCount)
                      )
                    }
                    className={
                      productPage === productsPageCount
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-default'
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}

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
              {paginatedEmployees.map((employee: any, index: number) => (
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
          {company.employees.length > PAGE_SIZE && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setEmployeePage(prev => Math.max(prev - 1, 1))
                    }
                    className={
                      employeePage === 1
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-default'
                    }
                  />
                </PaginationItem>
                <PaginationItem className="cursor-default px-4 text-sm">
                  Page {employeePage} sur {employeesPageCount}
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setEmployeePage(prev =>
                        Math.min(prev + 1, employeesPageCount)
                      )
                    }
                    className={
                      employeePage === employeesPageCount
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-default'
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-full max-w-sm bg-amande text-marine">
              <DialogHeader>
                <DialogTitle>Supprimer le produit ?</DialogTitle>
              </DialogHeader>
              <p>Etes vous sur de vouloir supprimer ce produit ?</p>
              <DialogFooter>
                <Button
                  variant={'outline'}
                  onClick={() => setOpen(false)}
                  className="border-marine/50"
                >
                  Annuler
                </Button>
                <Button
                  variant={'destructive'}
                  onClick={() => handleDeleteProduct(selectedId)}
                  className="bg-feu hover:bg-feu-hover"
                >
                  Supprimer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};
export default CompanyInfo;
