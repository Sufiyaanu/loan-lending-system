import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LendingLoanFormComponent } from './lending-loan-form.component';

describe('LendingLoanFormComponent', () => {
  let component: LendingLoanFormComponent;
  let fixture: ComponentFixture<LendingLoanFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LendingLoanFormComponent]
    });
    fixture = TestBed.createComponent(LendingLoanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
