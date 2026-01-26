import { Request, Response } from "express";
import { addCategoryService, addExpenseService, getCategoriesService, getExpensesService } from "../services/walletService";


export const getCategories = async (_req: Request, res: Response): Promise<void> => {
    try {
        const categories = await getCategoriesService();
        res.status(201).json(categories);
    } catch (_error) {
        console.error("Error fetching categories:", _error);
        res.status(500).send("Internal Server Error");
    }
}

export const getExpenses = async (_req: Request, res: Response): Promise<void> => {
    try {
        const expenses = await getExpensesService();
        res.status(201).json(expenses);
    } catch (_error) {
        console.error("Error fetching expenses:", _error);
        res.status(500).send("Internal Server Error");
    }
}

export const addCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name} = req.body;
        await addCategoryService(name);
        res.status(201).send("Category added successfully");
    } catch (_error) {
        console.error("Error adding category:", _error);
        res.status(500).send("Internal Server Error");
    }
}

export const addExpense = async (req: Request, res: Response): Promise<void> => {
    try {
        const { expense } = req.body;
        await addExpenseService(expense);
        res.status(201).send("Expense added successfully");
    } catch (_error) {
        console.error("Error adding expense:", _error);
        res.status(500).send("Internal Server Error");
    }
}