import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../core/service/budget/budget.service';
import { BudgetsGroupedByYear } from '../../core/interfaces/busgets-by-year.model';
import { Budget } from '../../core/interfaces/budget.model';
import { BudgetCategoryExpense } from '../../core/interfaces/budget-expense-category.model';
import { ExpenseService } from '../../core/service/expense/expense.service';
import { CategoryExpense } from '../../core/interfaces/category-expense.model';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateBudgetComponent } from '../../core/modals/create-budget/create-budget.component';

export const MONTHS: { [key: number]: string } = {
  1: 'Януари',
  2: 'Февруари',
  3: 'Март',
  4: 'Април',
  5: 'Май',
  6: 'Юни',
  7: 'Юли',
  8: 'Август',
  9: 'Септември',
  10: 'Октомври',
  11: 'Ноември',
  12: 'Декември'
};

const MONTHS_TO_NUMB: { [key: string]: number } = {
  'JANUARY': 1,
  'FEBRUARY': 2,
  'MARCH': 3,
  'APRIL': 4,
  'MAY': 5,
  'JUNE': 6,
  'JULY': 7,
  'AUGUST': 8,
  'SEPTEMBER': 9,
  'OCTOBER': 10,
  'NOVEMBER': 11,
  'DECEMBER': 12
};

@Component({
  selector: 'app-month-cards',
  templateUrl: './month-cards.component.html',
  styleUrls: ['./month-cards.component.scss']
})
export class MonthCardsComponent implements OnInit {
  budgetsByYear: { [year: string]: any[] } = {};
  displayedColumns: string[] = ['category', 'budget', 'expenses'];

  constructor(
    private budgetService: BudgetService,
    private expenseService: ExpenseService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getBudgets();
  }

  private getBudgets() {
    this.budgetService.getBudgets().subscribe((data: BudgetsGroupedByYear) => {
      Object.keys(data).forEach(year => {
        this.budgetsByYear[year] = [];

        const budgetObservables = data[year].map((budget: Budget) => {
          return this.expenseService.getCategoryExpences(budget.id).pipe(
            map((categoryBudgets: CategoryExpense[]) => {
              const combinedCategories = budget.expenseCategories.map((category: BudgetCategoryExpense) => {
                const totalSpent = categoryBudgets
                  .filter(cb => cb.category === category.category)
                  .reduce((sum, cb) => sum + cb.totalAmountSpent, 0);

                return {
                  category: category.category,
                  budget: category.limit,
                  spentAmount: totalSpent
                };
              });

              const sortedCategories = combinedCategories
                .sort((a, b) => b.spentAmount - a.spentAmount);

              return {
                name: MONTHS[budget.month],
                budget: budget.totalBudget,
                expenses: budget.totalSpent,
                monthNumber: budget.month,
                tableData: sortedCategories.map((category) => ({
                  category: category.category,
                  budget: category.budget,
                  expenses: category.spentAmount
                }))
              };
            })
          );
        });

        forkJoin(budgetObservables).subscribe(monthlyBudgets => {
          monthlyBudgets.sort((a, b) => a.monthNumber - b.monthNumber);

          this.budgetsByYear[year] = monthlyBudgets;
        });
      });
    });
  }

  sortDescendingByKey = (a: { key: string }, b: { key: string }): number => {
    return parseInt(b.key) - parseInt(a.key);
  }

  navigateToBudget(year: string, month: string): void {
    const monthIndex = Object.keys(MONTHS).find(key => MONTHS[+key] === month);

    if (monthIndex) {
      this.router.navigate([`/budget/${year}/${monthIndex}`]);
    }
  }

  createBudget(): void {
    const dialogRef = this.dialog.open(CreateBudgetComponent, {
      width: '40vw',
      minWidth: '25rem',
      maxWidth: '35rem'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.budgetService.createBudget(result).subscribe((budget: Budget) => {
          console.log(budget)
          const month = MONTHS_TO_NUMB[budget.month];
          this.router.navigate([`/budget/${budget.year}/${month}`]);
        })
      }
    });
  }
}
