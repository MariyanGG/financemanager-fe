import { Expense } from "./expense.model";

export interface CategoryExpense {
    id: number;
    budgetId: number;
    totalAmountSpent: number;
    categoryBudget: number;
    category: string;
    expenses: Expense[];
  }