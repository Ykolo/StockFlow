import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const response = await prisma.category.findMany({});
    return NextResponse.json(response);
  } catch (e: any) {
    console.error(e.message);
    return NextResponse.json(e.message);
  }
};
