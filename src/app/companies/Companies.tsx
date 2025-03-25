'use client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { fetchCompanies } from '../../lib/api';
import { companyType } from './companies.type';

const Companies = () => {
  const { data } = useQuery({
    queryKey: ['companies'],
    queryFn: fetchCompanies,
  });

  return (
    <div className="flex flex-col gap-4">
      {data?.map((company: companyType) => (
        <Link href={`/companies/${company.id}`} key={company.id}>
          <Card
            key={company.id}
            className="bg-marine w-full max-w-md border-2 border-marine text-amande"
          >
            <CardHeader>
              <CardTitle>{company.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Nombre de produits : {company.products.length}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
export default Companies;
