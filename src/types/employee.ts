import { z } from "zod"

export const employeeSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.string(),
  company: z.string(),
  companyId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type employeeType = z.infer<typeof employeeSchema>