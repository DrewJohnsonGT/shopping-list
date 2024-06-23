import type { Prisma } from '@prisma/client';
import { z } from 'zod';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  'ReadUncommitted',
  'ReadCommitted',
  'RepeatableRead',
  'Serializable',
]);

export const ItemScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'description',
  'quantity',
  'checked',
]);

export const SortOrderSchema = z.enum(['asc', 'desc']);

export const QueryModeSchema = z.enum(['default', 'insensitive']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// ITEM SCHEMA
/////////////////////////////////////////

export const ItemSchema = z.object({
  checked: z.boolean(),
  description: z.string(),
  id: z.number().int(),
  name: z.string(),
  quantity: z.number().int(),
});

export type Item = z.infer<typeof ItemSchema>;

/////////////////////////////////////////
// ITEM PARTIAL SCHEMA
/////////////////////////////////////////

export const ItemPartialSchema = ItemSchema.partial();

export type ItemPartial = z.infer<typeof ItemPartialSchema>;

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// ITEM
//------------------------------------------------------

export const ItemSelectSchema: z.ZodType<Prisma.ItemSelect> = z
  .object({
    checked: z.boolean().optional(),
    description: z.boolean().optional(),
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    quantity: z.boolean().optional(),
  })
  .strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const ItemWhereInputSchema: z.ZodType<Prisma.ItemWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ItemWhereInputSchema),
        z.lazy(() => ItemWhereInputSchema).array(),
      ])
      .optional(),
    checked: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
    description: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    NOT: z
      .union([
        z.lazy(() => ItemWhereInputSchema),
        z.lazy(() => ItemWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ItemWhereInputSchema)
      .array()
      .optional(),
    quantity: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  })
  .strict();

export const ItemOrderByWithRelationInputSchema: z.ZodType<Prisma.ItemOrderByWithRelationInput> =
  z
    .object({
      checked: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      quantity: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ItemWhereUniqueInputSchema: z.ZodType<Prisma.ItemWhereUniqueInput> =
  z
    .object({
      id: z.number().int(),
    })
    .and(
      z
        .object({
          AND: z
            .union([
              z.lazy(() => ItemWhereInputSchema),
              z.lazy(() => ItemWhereInputSchema).array(),
            ])
            .optional(),
          checked: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
          description: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          id: z.number().int().optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          NOT: z
            .union([
              z.lazy(() => ItemWhereInputSchema),
              z.lazy(() => ItemWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => ItemWhereInputSchema)
            .array()
            .optional(),
          quantity: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
        })
        .strict(),
    );

export const ItemOrderByWithAggregationInputSchema: z.ZodType<Prisma.ItemOrderByWithAggregationInput> =
  z
    .object({
      _avg: z.lazy(() => ItemAvgOrderByAggregateInputSchema).optional(),
      _count: z.lazy(() => ItemCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => ItemMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => ItemMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => ItemSumOrderByAggregateInputSchema).optional(),
      checked: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      quantity: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ItemScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ItemScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ItemScalarWhereWithAggregatesInputSchema),
          z.lazy(() => ItemScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      checked: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
      description: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ItemScalarWhereWithAggregatesInputSchema),
          z.lazy(() => ItemScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ItemScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      quantity: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
    })
    .strict();

export const ItemCreateInputSchema: z.ZodType<Prisma.ItemCreateInput> = z
  .object({
    checked: z.boolean(),
    description: z.string(),
    name: z.string(),
    quantity: z.number().int(),
  })
  .strict();

export const ItemUncheckedCreateInputSchema: z.ZodType<Prisma.ItemUncheckedCreateInput> =
  z
    .object({
      checked: z.boolean(),
      description: z.string(),
      id: z.number().int().optional(),
      name: z.string(),
      quantity: z.number().int(),
    })
    .strict();

export const ItemUpdateInputSchema: z.ZodType<Prisma.ItemUpdateInput> = z
  .object({
    checked: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    description: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    quantity: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  })
  .strict();

export const ItemUncheckedUpdateInputSchema: z.ZodType<Prisma.ItemUncheckedUpdateInput> =
  z
    .object({
      checked: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      quantity: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ItemCreateManyInputSchema: z.ZodType<Prisma.ItemCreateManyInput> =
  z
    .object({
      checked: z.boolean(),
      description: z.string(),
      id: z.number().int().optional(),
      name: z.string(),
      quantity: z.number().int(),
    })
    .strict();

export const ItemUpdateManyMutationInputSchema: z.ZodType<Prisma.ItemUpdateManyMutationInput> =
  z
    .object({
      checked: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      quantity: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ItemUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ItemUncheckedUpdateManyInput> =
  z
    .object({
      checked: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      quantity: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z
  .object({
    equals: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    in: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
    notIn: z.number().array().optional(),
  })
  .strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z
  .object({
    contains: z.string().optional(),
    endsWith: z.string().optional(),
    equals: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    in: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
    notIn: z.string().array().optional(),
    startsWith: z.string().optional(),
  })
  .strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z
  .object({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)])
      .optional(),
  })
  .strict();

export const ItemCountOrderByAggregateInputSchema: z.ZodType<Prisma.ItemCountOrderByAggregateInput> =
  z
    .object({
      checked: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      quantity: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ItemAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ItemAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      quantity: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ItemMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ItemMaxOrderByAggregateInput> =
  z
    .object({
      checked: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      quantity: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ItemMinOrderByAggregateInputSchema: z.ZodType<Prisma.ItemMinOrderByAggregateInput> =
  z
    .object({
      checked: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      quantity: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ItemSumOrderByAggregateInputSchema: z.ZodType<Prisma.ItemSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      quantity: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> =
  z
    .object({
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedIntFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntFilterSchema).optional(),
      equals: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      in: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
        .optional(),
      notIn: z.number().array().optional(),
    })
    .strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
  z
    .object({
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      contains: z.string().optional(),
      endsWith: z.string().optional(),
      equals: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      in: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      notIn: z.string().array().optional(),
      startsWith: z.string().optional(),
    })
    .strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> =
  z
    .object({
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedBoolFilterSchema).optional(),
      _min: z.lazy(() => NestedBoolFilterSchema).optional(),
      equals: z.boolean().optional(),
      not: z
        .union([
          z.boolean(),
          z.lazy(() => NestedBoolWithAggregatesFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional(),
    })
    .strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> =
  z
    .object({
      decrement: z.number().optional(),
      divide: z.number().optional(),
      increment: z.number().optional(),
      multiply: z.number().optional(),
      set: z.number().optional(),
    })
    .strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> =
  z
    .object({
      set: z.boolean().optional(),
    })
    .strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z
  .object({
    equals: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    in: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
    notIn: z.number().array().optional(),
  })
  .strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z
  .object({
    contains: z.string().optional(),
    endsWith: z.string().optional(),
    equals: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    in: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
    notIn: z.string().array().optional(),
    startsWith: z.string().optional(),
  })
  .strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z
  .object({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> =
  z
    .object({
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedIntFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntFilterSchema).optional(),
      equals: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      in: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
        .optional(),
      notIn: z.number().array().optional(),
    })
    .strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z
  .object({
    equals: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    in: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedFloatFilterSchema)])
      .optional(),
    notIn: z.number().array().optional(),
  })
  .strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
  z
    .object({
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      contains: z.string().optional(),
      endsWith: z.string().optional(),
      equals: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      in: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      notIn: z.string().array().optional(),
      startsWith: z.string().optional(),
    })
    .strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> =
  z
    .object({
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedBoolFilterSchema).optional(),
      _min: z.lazy(() => NestedBoolFilterSchema).optional(),
      equals: z.boolean().optional(),
      not: z
        .union([
          z.boolean(),
          z.lazy(() => NestedBoolWithAggregatesFilterSchema),
        ])
        .optional(),
    })
    .strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const ItemFindFirstArgsSchema: z.ZodType<Prisma.ItemFindFirstArgs> = z
  .object({
    cursor: ItemWhereUniqueInputSchema.optional(),
    distinct: z
      .union([ItemScalarFieldEnumSchema, ItemScalarFieldEnumSchema.array()])
      .optional(),
    orderBy: z
      .union([
        ItemOrderByWithRelationInputSchema.array(),
        ItemOrderByWithRelationInputSchema,
      ])
      .optional(),
    select: ItemSelectSchema.optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: ItemWhereInputSchema.optional(),
  })
  .strict();

export const ItemFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ItemFindFirstOrThrowArgs> =
  z
    .object({
      cursor: ItemWhereUniqueInputSchema.optional(),
      distinct: z
        .union([ItemScalarFieldEnumSchema, ItemScalarFieldEnumSchema.array()])
        .optional(),
      orderBy: z
        .union([
          ItemOrderByWithRelationInputSchema.array(),
          ItemOrderByWithRelationInputSchema,
        ])
        .optional(),
      select: ItemSelectSchema.optional(),
      skip: z.number().optional(),
      take: z.number().optional(),
      where: ItemWhereInputSchema.optional(),
    })
    .strict();

export const ItemFindManyArgsSchema: z.ZodType<Prisma.ItemFindManyArgs> = z
  .object({
    cursor: ItemWhereUniqueInputSchema.optional(),
    distinct: z
      .union([ItemScalarFieldEnumSchema, ItemScalarFieldEnumSchema.array()])
      .optional(),
    orderBy: z
      .union([
        ItemOrderByWithRelationInputSchema.array(),
        ItemOrderByWithRelationInputSchema,
      ])
      .optional(),
    select: ItemSelectSchema.optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: ItemWhereInputSchema.optional(),
  })
  .strict();

export const ItemAggregateArgsSchema: z.ZodType<Prisma.ItemAggregateArgs> = z
  .object({
    cursor: ItemWhereUniqueInputSchema.optional(),
    orderBy: z
      .union([
        ItemOrderByWithRelationInputSchema.array(),
        ItemOrderByWithRelationInputSchema,
      ])
      .optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: ItemWhereInputSchema.optional(),
  })
  .strict();

export const ItemGroupByArgsSchema: z.ZodType<Prisma.ItemGroupByArgs> = z
  .object({
    by: ItemScalarFieldEnumSchema.array(),
    having: ItemScalarWhereWithAggregatesInputSchema.optional(),
    orderBy: z
      .union([
        ItemOrderByWithAggregationInputSchema.array(),
        ItemOrderByWithAggregationInputSchema,
      ])
      .optional(),
    skip: z.number().optional(),
    take: z.number().optional(),
    where: ItemWhereInputSchema.optional(),
  })
  .strict();

export const ItemFindUniqueArgsSchema: z.ZodType<Prisma.ItemFindUniqueArgs> = z
  .object({
    select: ItemSelectSchema.optional(),
    where: ItemWhereUniqueInputSchema,
  })
  .strict();

export const ItemFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ItemFindUniqueOrThrowArgs> =
  z
    .object({
      select: ItemSelectSchema.optional(),
      where: ItemWhereUniqueInputSchema,
    })
    .strict();

export const ItemCreateArgsSchema: z.ZodType<Prisma.ItemCreateArgs> = z
  .object({
    data: z.union([ItemCreateInputSchema, ItemUncheckedCreateInputSchema]),
    select: ItemSelectSchema.optional(),
  })
  .strict();

export const ItemUpsertArgsSchema: z.ZodType<Prisma.ItemUpsertArgs> = z
  .object({
    create: z.union([ItemCreateInputSchema, ItemUncheckedCreateInputSchema]),
    select: ItemSelectSchema.optional(),
    update: z.union([ItemUpdateInputSchema, ItemUncheckedUpdateInputSchema]),
    where: ItemWhereUniqueInputSchema,
  })
  .strict();

export const ItemCreateManyArgsSchema: z.ZodType<Prisma.ItemCreateManyArgs> = z
  .object({
    data: z.union([
      ItemCreateManyInputSchema,
      ItemCreateManyInputSchema.array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const ItemCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ItemCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        ItemCreateManyInputSchema,
        ItemCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ItemDeleteArgsSchema: z.ZodType<Prisma.ItemDeleteArgs> = z
  .object({
    select: ItemSelectSchema.optional(),
    where: ItemWhereUniqueInputSchema,
  })
  .strict();

export const ItemUpdateArgsSchema: z.ZodType<Prisma.ItemUpdateArgs> = z
  .object({
    data: z.union([ItemUpdateInputSchema, ItemUncheckedUpdateInputSchema]),
    select: ItemSelectSchema.optional(),
    where: ItemWhereUniqueInputSchema,
  })
  .strict();

export const ItemUpdateManyArgsSchema: z.ZodType<Prisma.ItemUpdateManyArgs> = z
  .object({
    data: z.union([
      ItemUpdateManyMutationInputSchema,
      ItemUncheckedUpdateManyInputSchema,
    ]),
    where: ItemWhereInputSchema.optional(),
  })
  .strict();

export const ItemDeleteManyArgsSchema: z.ZodType<Prisma.ItemDeleteManyArgs> = z
  .object({
    where: ItemWhereInputSchema.optional(),
  })
  .strict();
