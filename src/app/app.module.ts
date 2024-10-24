import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './features/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './features/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './core/service/login/auth.service';
import { RequestInterceptor } from './core/interceptors/request-interceptor';
import { HeaderComponent } from './shared/header/header.component';
import { BudgetComponent } from './features/budget/budget.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddExpenseDialogComponent } from './core/modals/add-expense-dialog/add-expense-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddBudgetCategoryDialogComponent } from './core/modals/add-budget-category/add-budget-category';
import { AllExpensesComponent } from './features/all-expenses/all-expenses.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MonthCardsComponent } from './features/month-cards/month-cards.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { CreateBudgetComponent } from './core/modals/create-budget/create-budget.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    BudgetComponent,
    AddExpenseDialogComponent,
    AddBudgetCategoryDialogComponent,
    AllExpensesComponent,
    MonthCardsComponent,
    ConfirmDialogComponent,
    CreateBudgetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatProgressBarModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatPaginator,
    MatTooltipModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatMenuModule,
    MatSnackBarModule
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
