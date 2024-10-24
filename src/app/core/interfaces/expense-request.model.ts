export interface ExpenseRequest {
    amount: number;
    categoryId: number;
    description: string;
    dueDate?: string;
}
