import { Component } from '@angular/core';
import { LoanService } from '../services/loan.service';

@Component({
  selector: 'app-loan-types',
  templateUrl: './loan-types.component.html',
  styleUrls: ['./loan-types.component.scss']
})
export class LoanTypesComponent {
  loanTypes: any[] = [];

  constructor(private loanService: LoanService) {} 

  ngOnInit() {
    this.loanTypes = this.loanService.getLoanTypes(); // Get loan types from the service
  }
}
