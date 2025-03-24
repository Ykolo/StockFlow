import { z } from "zod"

export const companySchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type companyType = z.infer<typeof companySchema>