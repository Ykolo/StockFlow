'use server';
import { employeeType } from '@/types/employee';
import argon2 from 'argon2';
import { prisma } from '../prisma';

export const createEmployee = async (employee: employeeType) => {
  try {
    const existingEmployee = await prisma.employee.findMany({
      where: {
        email: employee.email,
      },
    });
    if (existingEmployee.length > 0) {
      return { success: false, message: "L'email est déjà utilisé" };
    }
    const hashedPassword = await argon2.hash(employee.password);
    const newEmployee = await prisma.employee.create({
      data: {
        name: employee.name,
        email: employee.email,
        password: hashedPassword,
        role: 'EMPLOYEE',
        company: {
          connect: {
            id: employee.companyId,
          },
        },
      },
    });
    return { success: true, message: 'Employee created', data: newEmployee };
  } catch (e) {
    console.error('Create employee error:', e);
  }
};
