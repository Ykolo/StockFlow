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

export const deleteEmployee = async (id: string) => {
  try {
    if (!id) {
      return { success: false, message: 'Employee ID is required' };
    }

    const employee = await prisma.employee.findUnique({
      where: {
        id: id,
      },
    });

    if (!employee) {
      return { success: false, message: 'Employee not found' };
    }

    const response = await prisma.employee.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
      message: 'Employee deleted successfully',
      data: response,
    };
  } catch (e: any) {
    console.error('Delete employee error:', e.message);
    return { success: false, message: e.message };
  }
};

export const updateEmployee = async (id: string, data: any) => {
  try {
    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        role: data.role,
      },
    });

    return {
      success: true,
      message: 'Employee updated successfully',
      data: updatedEmployee,
    };
  } catch (error: any) {
    console.error('Update employee error:', error);
    return {
      success: false,
      message: error.message || 'An unexpected error occurred',
    };
  }
};
