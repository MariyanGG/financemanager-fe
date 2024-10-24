import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthCardsComponent } from './month-cards.component';

describe('MonthCardsComponent', () => {
  let component: MonthCardsComponent;
  let fixture: ComponentFixture<MonthCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
