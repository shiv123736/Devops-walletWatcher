
export interface categoryModel {
    Id: number;
    Name: string;
};

export interface expenseModel {
    Id: number;
    Title: string;
    Amount: number;
    Date: Date;
    CategoryId: number;
};