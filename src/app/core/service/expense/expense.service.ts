import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryExpense } from '../../interfaces/category-expense.model';
import { Expense } from '../../interfaces/expense.model';
import { ExpensesGroupedByDate } from '../../interfaces/expense-by-date.model';

const budgetPlaceholder: string = '{budgetId}';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private readonly baseUrl = 'http://localhost:8080/api/budgets/{budgetId}/expenses';

  constructor(private http: HttpClient) { }

  getCategoryExpences(budgetId: number): Observable<CategoryExpense[]> {
    return this.http.get<CategoryExpense[]>(`${this.baseUrl.replace(budgetPlaceholder, budgetId.toString())}/categories`);
  }

  getExpenses(budgetId: number, page: number, size: number, sortBy: string, sortDirection: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDirection', sortDirection);

    return this.http.get(`${this.baseUrl.replace(budgetPlaceholder, budgetId.toString())}/pagination`, { params });
  }

  getUpcomingExpences(budgetId: number): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.baseUrl.replace(budgetPlaceholder, budgetId.toString())}/upcoming`);
  }

  addExpense(budgetId: number, request: { amount: number, categoryId: number, description: string }): Observable<Expense[]> {
    return this.http.post<Expense[]>(`${this.baseUrl.replace(budgetPlaceholder, budgetId.toString())}`, request);
  }

  getExpensesByDate(budgetId: number): Observable<ExpensesGroupedByDate> {
    return this.http.get<ExpensesGroupedByDate>(`${this.baseUrl.replace(budgetPlaceholder, budgetId.toString())}/categories/dated`);
  }

  deleteExpense(budgetId: number, expenseId: number): Observable<ExpensesGroupedByDate> {
    return this.http.delete<ExpensesGroupedByDate>(`${this.baseUrl.replace(budgetPlaceholder, budgetId.toString())}/${expenseId}`);
  }
}
