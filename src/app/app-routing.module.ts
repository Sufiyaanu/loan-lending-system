import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoanDetailsComponent } from './user-loan-details/user-loan-details.component';
import { LendingLoanFormComponent } from './lending-loan-form/lending-loan-form.component';
import { LoanTypesComponent } from './loan-types/loan-types.component';

const routes: Routes = [
  { path: '', component: LoanTypesComponent },
  { path: 'loan-types', component: LoanTypesComponent },
  { path: 'lend-loan', component: LendingLoanFormComponent },
  { path: 'user-loan-details', component: UserLoanDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
