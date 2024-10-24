import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExpenseCategory } from '../../interfaces/expense-category';
import { Budget } from '../../interfaces/budget.model';

@Component({
  selector: 'app-add-expense-dialog',
  templateUrl: './add-expense-dialog.component.html',
  styleUrls: ['./add-expense-dialog.component.scss']
})
export class AddExpenseDialogComponent implements OnInit {
  expenseForm!: FormGroup;
  categories: any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      budget: Budget,
      isFutureExpense: boolean
    }
  ) { }

  ngOnInit(): void {
    const allCategoryKeys = Object.keys(ExpenseCategory);
    const existingCategories = this.data.budget.expenseCategories.map(ec => ec.category);
    this.categories = allCategoryKeys
      .filter(key => existingCategories.includes(key))
      .map(key => ExpenseCategory[key as keyof typeof ExpenseCategory]);
    this.expenseForm = this.fb.group({
      amount: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required],
      expenseDate: [new Date(), Validators.required],
      ...(this.data.isFutureExpense ? { dueDate: [null] } : {})
    });
  }

  getEnumKey(value: string): string | undefined {
    const entry = Object.entries(ExpenseCategory).find(([key, val]) => val === value);
    return entry ? entry[0] : undefined;
  }

  onSave(): void {
    if (this.expenseForm.valid) {
      const selectedCategoryValue = this.expenseForm.value.category;
      const selectedCategoryKey = this.getEnumKey(selectedCategoryValue);
      const formData = {
        ...this.expenseForm.value,
        category: selectedCategoryKey
      };

      this.dialogRef.close(formData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
