import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BudgetsGroupedByYear } from '../../interfaces/busgets-by-year.model';
import { Budget } from '../../interfaces/budget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private readonly baseUrl = 'http://localhost:8080/api/budgets';

  constructor(private http: HttpClient) { }

  getBudgetByYearAndMonth(year: number, month: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${year}/${month}`);
  }

  getBudgets(): Observable<BudgetsGroupedByYear> {
    return this.http.get<BudgetsGroupedByYear>(`${this.baseUrl}`);
  }

  addBudgetCategory(budgetId: number, request: { category: string, limit: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}/${budgetId}`, request);
  }

  createBudget(request: any): Observable<Budget> {
    return this.http.post<Budget>(this.baseUrl, request);
  }
}
