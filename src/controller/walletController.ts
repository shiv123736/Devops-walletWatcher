import { Request, Response, NextFunction } from "express";
import { addCategoryService, addExpenseService, getCategoriesService, getExpensesService } from "../services/walletService";
import { categorySchema, expenseSchema } from "../Schema/walletSchema";

export const getCategories = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const categories = await getCategoriesService();
        res.status(201).json(categories);
    } catch (error) {
        next(error);
    }
}
    
export const getExpenses = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const expenses = await getExpensesService();
        res.status(201).json(expenses);
    } catch (error) {
        next(error);
    }
}

export const addCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const validation = categorySchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({ errors: validation.error.issues });
            return;
        }
        const result = await addCategoryService(validation.data);
        res.status(201).json({ message: "Category added successfully", category: result });
    } catch (error) {
        next(error);
    }
}

export const addExpense = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const payload = (req.body && (req.body.expense ?? req.body)) as any;
        const normalized = {
            title: payload.Title ?? payload.title,
            amount: payload.Amount ?? payload.amount,
            categoryid: payload.CategoryId ?? payload.categoryid,
        };
        const validation = expenseSchema.safeParse(normalized);
        if (!validation.success) {
            res.status(400).json({ errors: validation.error.issues });
            return;
        }
        const result = await addExpenseService(validation.data);
        res.status(201).json({ message: "Expense added successfully", expense: result });
    } catch (error) {
        next(error);
    }
}