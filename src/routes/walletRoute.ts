import { Router } from "express";
import { addCategory, addExpense, getCategories, getExpenses } from "../controller/walletController";

const router = Router();

router.get('/categories', getCategories);
router.get('/expenses', getExpenses);
router.post('/categories', addCategory);
router.post('/expenses', addExpense);

export default router;