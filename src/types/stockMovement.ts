import { z } from "zod"

export const stockMovementSchema = z.object({
  id: z.string(),
  type: z.string(),
  quantity: z.number(),
  product: z.string(),
  employee: z.string(),
  createdAt: z.date(),
})

export type stockMovementTypr = z.infer<typeof stockMovementSchema>