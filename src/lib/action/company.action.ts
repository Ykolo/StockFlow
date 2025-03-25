import { companySchema } from '../../types/company';
import { prisma } from '../prisma';

export const getCompanyById = async (id: string) => {
  try {
    const response = await prisma.company.findUnique({
      where: {
        id: id,
      },
    });
    const parsedResponse = companySchema.parse(response);
    return parsedResponse;
  } catch (e: any) {
    console.error(e.message);
    return `Error: ${e.message}`;
  }
};
