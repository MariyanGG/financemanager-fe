import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BudgetService } from '../../core/service/budget/budget.service';
import { Budget } from '../../core/interfaces/budget.model';
import { ExpenseService } from '../../core/service/expense/expense.service';
import { CategoryExpense } from '../../core/interfaces/category-expense.model';
import { Expense } from '../../core/interfaces/expense.model';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddExpenseDialogComponent } from '../../core/modals/add-expense-dialog/add-expense-dialog.component';
import { AddBudgetCategoryDialogComponent } from '../../core/modals/add-budget-category/add-budget-category';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MONTHS } from '../month-cards/month-cards.component';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {

  budget: Budget = {
    id: 0,
    totalBudget: 0,
    totalSpent: 0,
    remaining: 0,
    month: 0,
    year: 0,
    expenseCategories: []
  };

  displayedColumns: string[] = ['category', 'spent', 'remaining', 'total', 'progress'];
  expenseColumns: string[] = ['date', 'category', 'amount', 'description'];
  upcomingExpensesColumns: string[] = ['date', 'category', 'amount', 'description'];

  upcomingExpenses: Expense[] = [];
  categories: CategoryExpense[] = [];
  recentExpenses: Expense[] = [];

  constructor(
    private budgetService: BudgetService,
    private expenseService: ExpenseService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
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
      console.log(data);
      this.budget = data;
      this.getCategoryExpences();
      this.getRecentExpenses(0, 10);
      this.getUpcomingExpenses();
    });
  }

  getPercentageSpent(a: number, b: number): number {
    return (a / b) * 100;
  }

  getCategoryExpences(): void {
    this.expenseService.getCategoryExpences(this.budget.id).subscribe(data => {
      this.categories = data;
    });
  }

  getRecentExpenses(pageIndex: number = 0, pageSize: number = 10): void {
    this.expenseService.getExpenses(this.budget.id, pageIndex, pageSize, 'expense_date', 'desc')
      .subscribe((data: any) => {
        this.recentExpenses = data.content;
      });
  }

  onPageChange(event: PageEvent) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;

    this.getRecentExpenses(pageIndex, pageSize);
  }

  getUpcomingExpenses(): void {
    this.expenseService.getUpcomingExpences(this.budget.id).subscribe(data => {
      this.upcomingExpenses = data;
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

        this.expenseService.addExpense(this.budget.id, data)
          .subscribe(() => this.loadData(this.budget.year, this.budget.month));

      }
    });
  }

  openAddBudgetCategoryDialog(): void {
    const dialogRef = this.dialog.open(AddBudgetCategoryDialogComponent, {
      width: '40vw',
      minWidth: '25rem',
      maxWidth: '35rem',
      data: {
        budget: this.budget
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.budgetService.addBudgetCategory(this.budget.id, result)
          .subscribe(() => this.loadData(this.budget.year, this.budget.month));
      }
    });
  }

  goToExpenses(): void {
    this.router.navigate([`/budget/${this.budget.year}/${this.budget.month}/expenses`]);
  }

  getMonthName(): string {
    return MONTHS[this.budget.month];
  }
}
