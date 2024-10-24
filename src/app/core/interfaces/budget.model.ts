import { BudgetCategoryExpense } from './budget-expense-category.model';

export interface Budget {
    id: number;
    totalBudget: number;
    totalSpent: number;
    remaining: number;
    month: number;
    year: number;
    expenseCategories: BudgetCategoryExpense[];
}
