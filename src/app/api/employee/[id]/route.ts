import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = await params;
    const response = await prisma.employee.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        companyId: true,
      },
    });
    return NextResponse.json(response);
  } catch (e: any) {
    console.error(e.message);
    return NextResponse.json(e.message);
  }
};
