import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const SECRET_KEY = process.env.JWT_SECRET;

export const GET = async () => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('authToken');
  if (!authToken || !authToken.value) {
    return NextResponse.json({ error: 'No token found' }, { status: 401 });
  }
  const token = authToken.value;
  try {
    const decoded = jwt.verify(token, SECRET_KEY as string);
    return NextResponse.json(decoded);
  } catch (e: any) {
    console.error(e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
};
