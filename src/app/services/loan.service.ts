import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  public loanTypes: any[] = [
    { name: "personal loans", interestRate: 8.78 },
    { name: "home loans", interestRate: 4.7 },
    { name: "student loans", interestRate: 5.53 },
    { name: "auto loans", interestRate: 6.23 },
    { name: "gold loans", interestRate: 7.17 },
    { name: "medical loans", interestRate: 4.0 },
    { name: "property loans", interestRate: 5.5 },
    { name: "educational loans", interestRate: 6.0 },
    { name: "business loans", interestRate: 8.5 },
    { name: "term loans", interestRate: 4.0 },
    { name: "marriage loans", interestRate: 5.5 },
    { name: "agricultural loans", interestRate: 6.0 },
    { name: "hand loans", interestRate: 8.5 },
    { name: "secured loans", interestRate: 4.0 },
    { name: "unsecured loans", interestRate: 5.5 },
    { name: "auto loans", interestRate: 6.0 },
  ];

  getLoanTypes() {
    return this.loanTypes;
  }

  constructor() { }
}
