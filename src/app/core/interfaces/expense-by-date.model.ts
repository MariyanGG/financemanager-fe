import { Expense } from "./expense.model";

export interface ExpensesGroupedByDate {
    [date: string]: Expense[];
}