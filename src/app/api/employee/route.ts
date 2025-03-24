import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export const GET = async () => {
  try{
    const response = await prisma.employee.findMany()
    return NextResponse.json(response);
  }catch(e: any){
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
