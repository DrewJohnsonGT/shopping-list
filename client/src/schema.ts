import { z } from 'zod';

export const ItemSchema = z.object({
  checked: z.boolean().nullable(),
  createdAt: z.coerce.date(),
  description: z.string(),
  id: z.number().int(),
  name: z.string(),
  quantity: z.number().int(),
  updatedAt: z.coerce.date(),
});

export type Item = z.infer<typeof ItemSchema>;

export const ItemPartialSchema = ItemSchema.partial();

export type ItemPartial = z.infer<typeof ItemPartialSchema>;
