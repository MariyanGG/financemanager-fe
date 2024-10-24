import { BudgetCategoryExpense } from "./budget-expense-category.model";

export interface Expense {
    id: number;
    amount: number;
    description: string;
    dueDate: string;
    budgetCategoryExpense?: BudgetCategoryExpense;
    createdDate: string;
}
