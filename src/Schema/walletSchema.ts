import  { z } from 'zod';

export const categorySchema = z.object({
    name: z.string().min(3).max(100),
});

export const expenseSchema = z.object({
    title: z.string().min(1).max(200),
    amount: z.number().nonnegative(),
    categoryid: z.number(),
});

export type categoryModel = z.infer<typeof categorySchema>;
export type expenseModel = z.infer<typeof expenseSchema>;