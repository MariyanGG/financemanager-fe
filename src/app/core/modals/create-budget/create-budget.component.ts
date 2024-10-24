import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExpenseCategory } from '../../interfaces/expense-category';
import { Budget } from '../../interfaces/budget.model';

@Component({
  selector: 'app-create-budget',
  templateUrl: './create-budget.component.html',
  styleUrl: './create-budget.component.scss'
})
export class CreateBudgetComponent {
  months: { [key: number]: string } = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
  };

  budgetForm!: FormGroup;
  monthOptions: any = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateBudgetComponent>
  ) { }

  ngOnInit(): void {
    this.budgetForm = this.fb.group({
      amount: [null, Validators.required],
      month: [null, Validators.required],
      year: [null, Validators.required]
    });

    this.monthOptions = Object.keys(this.months).map(key => ({
      value: parseInt(key, 10),
      name: this.months[parseInt(key, 10)]
    }));
  }

  onSave(): void {
    if (this.budgetForm.valid) {
      this.dialogRef.close(this.budgetForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
