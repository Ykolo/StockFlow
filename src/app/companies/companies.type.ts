import { z } from "zod"
import { productSchema } from "../../types/product"

export const companySchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  products: z.array(productSchema),
  employees: z.array(z.string()),
})

export type companyType = z.infer<typeof companySchema>