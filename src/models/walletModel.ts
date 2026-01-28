// src/models/walletModel.ts

export interface categoryModel {
    id: number;    
    name: string;
}

export interface expenseModel {
    id: number;       
    title: string;
    amount: number;
    date: Date;       
    categoryid: number; 
}