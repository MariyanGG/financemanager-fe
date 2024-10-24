import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { BudgetComponent } from './features/budget/budget.component';
import { AllExpensesComponent } from './features/all-expenses/all-expenses.component';
import { MonthCardsComponent } from './features/month-cards/month-cards.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'budget', component: BudgetComponent },
  { path: 'budget/:year/:month', component: BudgetComponent },
  { path: 'budgets', component: MonthCardsComponent },
  { path: 'budget/:year/:month/expenses', component: AllExpensesComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
