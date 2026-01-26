import pool from "../config/db";
import { categoryModel, expenseModel} from "../models/walletModel";


export const getCategoriesService = async () => {
    const result =  await pool.query<categoryModel>('SELECT * FROM Category ORDER BY id ASC;');
    return result.rows;
}

export const getExpensesService = async () => {
    const result =  await pool.query<expenseModel>(
        `SELECT 
        e.Id,
        e.Title, 
        e.Amount, 
        e.Date, 
        c.Name AS Category_Name
        FROM Expense e
        JOIN Category c ON e.CategoryId = c.Id;`
    );
    return result.rows;
}   


export const addCategoryService = async (category: categoryModel): Promise<void> => {
    const query = 'INSERT INTO Category (Name) VALUES ($1);';
    const values = [category];
    console.log("Executing Query:", query, "with values:", values);
    await pool.query(query, values);
}

export const addExpenseService = async (expense: expenseModel): Promise<void> => {
    const query = 'INSERT INTO Expense (Title, Amount, CategoryId) VALUES ($1, $2, $3);';
    const values = [expense.Title, expense.Amount, expense.CategoryId];
    await pool.query(query, values);
}
