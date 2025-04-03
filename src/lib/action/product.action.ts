'use server';

import { ProductsFormType } from '../../app/product/add/[id]/AddForm';
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

export const createProduct = async (data: ProductsFormType) => {
  try {
    const response = await prisma.product.create({
      data: {
        name: data.name,
        quantity: data.quantity,
        companyId: data.companyId,
      },
    });
    await prisma.productCategory.createMany({
      data: data.categories.map(c => ({
        productId: response.id,
        categoryId: c,
      })),
    });
    return { success: true, message: 'Product created', data: response };
  } catch (e: any) {
    console.error(e.message);
  }
};

export const updateProduct = async (id: string, data: any) => {
  try {
    const updated = await prisma.$transaction([
      prisma.productCategory.deleteMany({
        where: { productId: id },
      }),

      ...data.categories.map((categoryId: string) =>
        prisma.productCategory.create({
          data: {
            productId: id,
            categoryId,
          },
        })
      ),

      prisma.product.update({
        where: { id },
        data: {
          name: data.name,
          quantity: Number(data.quantity),
        },
      }),
    ]);

    return {
      success: true,
      product: updated[updated.length - 1],
      message: 'Produit modifié avec succès',
    };
  } catch (error: any) {
    console.error('[updateProduct]', error);
    return {
      success: false,
      message: error?.message || 'Erreur lors de la mise à jour du produit',
    };
  }
};
