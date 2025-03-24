import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const companies = await prisma.company.findMany({
      include: {
        products: true,
        employees: {
          select: {
            name: true
          }
        }
      }
    })
    // if (!companies) return NextResponse.json({ error: "No companies found" }, { status: 404 });
    // const parsedCompanies = companySchema.array().parse(companies);
    return NextResponse.json(companies);
  }catch(e: any){
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}