'use server';

import { prisma } from '../prisma';

export const deleteProduct = async (id: string) => {
  try {
    const isProductExist = await prisma.product.findUnique({
      where: { id },
    });
    if (!isProductExist) {
      return { success: false, message: 'Product not found' };
    }
    const response = await prisma.product.delete({
      where: { id },
    });
    return { success: true, message: 'Product deleted', data: response };
  } catch (e: any) {
    console.error(e.message);
    return { success: false, message: e.message };
  }
};
