import { Expense } from './expense.model';

export interface BudgetCategoryExpense {
    id: number;
    category: string;
    limit: number;
    expenses: Expense[];
}
