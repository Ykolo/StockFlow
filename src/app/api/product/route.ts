import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = await prisma.product.findMany()
    return NextResponse.json(response);
  }catch(e: any){
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}