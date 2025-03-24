import { z } from "zod"

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.number(),
  company: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type productType = z.infer<typeof productSchema>