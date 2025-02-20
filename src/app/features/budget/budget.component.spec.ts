import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetComponent } from './budget.component';

describe('HomeComponent', () => {
  let component: BudgetComponent;
  let fixture: ComponentFixture<BudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
