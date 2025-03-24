import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET || "";

export const middleware = async (request: NextRequest) => {
  const token = request.cookies.get('auth_token')?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  try{
    jwt.verify(token, SECRET_KEY);
    return NextResponse.next();
  }catch(e){
    return NextResponse.redirect(new URL("/", request.url));
  }
};
export const config={
  matcher: ["/dashboard"]
}