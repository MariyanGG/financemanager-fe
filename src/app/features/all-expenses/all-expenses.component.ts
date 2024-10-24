import { Component } from '@angular/core';
import { BudgetService } from '../../core/service/budget/budget.service';
import { ExpenseService } from '../../core/service/expense/expense.service';
import { Expense } from '../../core/interfaces/expense.model';
import { Budget } from '../../core/interfaces/budget.model';
import { ExpensesGroupedByDate } from '../../core/interfaces/expense-by-date.model';
import { AddExpenseDialogComponent } from '../../core/modals/add-expense-dialog/add-expense-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-all-expenses',
  templateUrl: './all-expenses.component.html',
  styleUrl: './all-expenses.component.scss'
})
export class AllExpensesComponent {
  budget: Budget = {
    id: 0,
    totalBudget: 0,
    totalSpent: 0,
    remaining: 0,
    month: 0,
    year: 0,
    expenseCategories: []
  };

  expensesGroupedByDate: { [date: string]: Expense[] } = {};
  expenseDates: string[] = [];

  upcomingExpensesColumns: string[] = ['date', 'category', 'amount', 'description'];
  upcomingExpenses: Expense[] = [];

  constructor(
    private expenseService: ExpenseService,
    private budgetService: BudgetService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const yearParam = this.route.snapshot.paramMap.get('year');
    const monthParam = this.route.snapshot.paramMap.get('month');

    const year = yearParam ? parseInt(yearParam, 10) : new Date().getFullYear();
    const month = monthParam ? parseInt(monthParam, 10) : new Date().getMonth() + 1;
    this.loadData(year, month);
  }

  loadData(year: number, month: number): void {
    this.budgetService.getBudgetByYearAndMonth(year, month).subscribe(data => {
      console.log(data)
      this.budget = data;
      this.getExpensesByDate();
    });
  }

  getExpensesByDate() {
    this.expenseService.getExpensesByDate(this.budget.id).subscribe((data: ExpensesGroupedByDate) => {
      this.expensesGroupedByDate = data;
      this.expenseDates = Object.keys(this.expensesGroupedByDate);
    });
  }

  openAddExpenseDialog(isFutureExpense: boolean): void {
    const dialogRef = this.dialog.open(AddExpenseDialogComponent, {
      width: '40vw',
      minWidth: '25rem',
      maxWidth: '35rem',
      data: {
        budget: this.budget,
        isFutureExpense
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const selectedCategoryLabel: string = result.category;
        const selectedCategory = this.budget.expenseCategories.find(
          (cat: any) => cat.category === result.category
        );

        const data = {
          ...result,
          categoryId: selectedCategory ? selectedCategory.id : null
        };

        delete data.category;

        this.expenseService.addExpense(this.budget.id, data).subscribe();
        this.loadData(this.budget.year, this.budget.month);
      }
    });
  }

  getUpcomingExpenses(): void {
    this.expenseService.getUpcomingExpences(this.budget.id).subscribe(data => {
      this.upcomingExpenses = data;
    });
  }

  deleteExpense(expenseId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.expenseService.deleteExpense(this.budget.id, expenseId).subscribe({
          next: () => {
            this.snackBar.open('Expense deleted successfully', 'Close', { duration: 2000 });
            this.getExpensesByDate();
          },
          error: () => {
            this.snackBar.open('Failed to delete expense', 'Close', { duration: 2000 });
          }
        });
      }
    });
  }
}
