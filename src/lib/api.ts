'use server';
import { headers } from 'next/headers';

export const fetchCompanies = async () => {
  try {
    const response = await fetch(`${process.env.LOCAL_URL}/api/companies`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const fetchUser = async () => {
  const headersList = await headers();
  const cookieHeader = headersList.get('cookie');
  try {
    const response = await fetch(`${process.env.LOCAL_URL}/api/auth/user`, {
      headers: {
        cookie: cookieHeader || '',
      },
    });
    const data = await response.json();
    return data;
  } catch (e: any) {
    console.error(e.message);
    return { error: e.message };
  }
};

export const fetchComapnyById = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.LOCAL_URL}/api/companies/${id}`
    );
    const data = await response.json();
    return data;
  } catch (e: any) {
    console.error(e.message);
    return { error: e.message };
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${process.env.LOCAL_URL}/api/categories`);
    const data = await response.json();
    return data;
  } catch (e: any) {
    console.error(e.message);
  }
};

export const fetchProductById = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.LOCAL_URL}/api/products/${id}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};
