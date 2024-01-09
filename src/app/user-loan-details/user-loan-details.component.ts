import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-loan-details',
  templateUrl: './user-loan-details.component.html',
  styleUrls: ['./user-loan-details.component.scss']
})
export class UserLoanDetailsComponent implements OnInit {

  userLoans: any[] = [];
  sortedUserLoans: any[] = []; // Store the sorted data here
  isAscendingSort: boolean = true; // Indicates the current sort direction


  constructor(private localStorageService: LocalStorageService, private router: Router) { }

  ngOnInit() {
    // Fetch data from local storage
    this.userLoans = this.localStorageService.getFromLocalStorage('user_loan') || [];

  }

  goToDetailView(userLoan: any) {
    // Navigate to the detail view and pass the userLoan data
    this.router.navigate(['/lend-loan', { id: userLoan.id, action: 'detail' }]);
  }

  goToEditView(userLoan: any) {
    this.router.navigate(['/lend-loan', { id: userLoan.id, action: 'edit' }]);
  }

  sortByFullName() {
    this.isAscendingSort = !this.isAscendingSort; // Toggle sort direction

    // sorts an array in place and accepts a comparison function as an argument.
    this.sortedUserLoans = this.userLoans.sort((a, b) => {
      const nameA = a.fullName.toLowerCase();
      const nameB = b.fullName.toLowerCase();
      // comparison is case-insensitive

      if (nameA < nameB) return this.isAscendingSort ? -1 : 1;
      if (nameA > nameB) return this.isAscendingSort ? 1 : -1;

      return 0; // Names are equal
    });
  }
}
