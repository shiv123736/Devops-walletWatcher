
import { categoryModel, expenseModel} from "../models/walletModel";
import prisma from "../utils/prisma";

export const getCategoriesService = async () => {
    return await prisma.category.findMany({
        orderBy: {
            id: 'asc',
        },
    });
}

export const getExpensesService = async () => {
    return await prisma.expense.findMany({
        orderBy: {
            id: 'asc',
        },
        include: {
            category: true,
        },
    });
}   


export const addCategoryService = async (category: Omit<categoryModel, 'id'>): Promise<categoryModel> => {
    return await prisma.category.create({
        data: {
            name: category.name,
        },
    });
}

export const addExpenseService = async (expense: Omit<expenseModel, 'id'| 'date'>): Promise<expenseModel> => {
    // 1. Create (Input and DB now match perfectly!)
    const savedData = await prisma.expense.create({
        data: {
            title: expense.title,
            amount: expense.amount,
            categoryid: expense.categoryid, 
        },
    });
    return savedData;
}


