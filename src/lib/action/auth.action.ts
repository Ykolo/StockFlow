"use server";

import { cookies } from "next/headers";
import { generateToken } from "../jwt";
import { prisma } from "../prisma";

const setAuthToken = async (token: string) => {
  const cookieStore = await cookies()
  cookieStore.set("authToken", token, {
    maxAge: 1000 * 60 * 60 * 24 * 7, 
    path: "/" })
}
export const login = async (email: string, password: string) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        email: email
      }
    })
    if (!employee) {
      return { success: false, message: "Email incorrect" }
    }
    if (employee.password !== password) {
      return { success: false, message: "Mot de passe incorrect" }
    }
    const token = generateToken({id: employee.id, email: employee.email, role: employee.role, password: employee.password})
    await setAuthToken(token)
    return { success: true, message: "Authentification réussie", data: employee, token: token }
  } catch (e: any) {
    console.error(e.message);
  }
}

export const logout = async () => {
  try {
    const cookieStore = await cookies()
    cookieStore.set("authToken", "", {expires: new Date(0)})
    return { success: true, message: "Déconnexion réussie" }
  } catch (e: any) {
    console.error(e.message);
  }
  
};