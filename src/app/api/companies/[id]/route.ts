import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = await params;
    const response = await prisma.company.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        employees: {
          select: {
            name: true,
            email: true,
            role: true,
          },
        },
        products: {
          select: {
            id: true,
            name: true,
            quantity: true,
            categories: {
              select: {
                category: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!response) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }
    // const parsedResponse = companySchema.parse(response);
    return NextResponse.json(response);
  } catch (e: any) {
    console.error(e.message);
    return NextResponse.json(e.message);
  }
};
