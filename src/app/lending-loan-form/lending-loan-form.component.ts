import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { LoanService } from '../services/loan.service';
import { LocalStorageService } from '../services/local-storage.service';

import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';





@Component({
  selector: 'app-lending-loan-form',
  templateUrl: './lending-loan-form.component.html',
  styleUrls: ['./lending-loan-form.component.scss'],
})

export class LendingLoanFormComponent {
  @ViewChild('loanForm') public loanForm!: NgForm;
  public loanDetails: any = {};
  loanTypes: any[] = [];
  selectedLoan: any;
  isReadOnly: boolean = false;
  loanId: string | null = null; 
  action: any;
  isDeleteModalVisible = false;
  isPreviewModalVisible = false;
 

  constructor(private loanService: LoanService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private el: ElementRef,
    private toastr: ToastrService) { }


  ngOnInit() {
    this.loanTypes = this.loanService.getLoanTypes(); // Get loan types from the service
    this.route.paramMap.subscribe(params => {
      this.action = params.get('action');
      if (this.action === 'detail') { // If action is 'detail', set the form to read-only
        this.isReadOnly = true;
        this.loanId = params.get('id');
        const savedData = this.localStorageService.getFromLocalStorage('user_loan');
        this.loanDetails = savedData.find((obj: any) => obj.id == this.loanId);
      } else if (this.action === 'edit') { // If action is 'edit', set the form to editable mode
        this.isReadOnly = false;
        this.loanId = params.get('id');
        const savedData = this.localStorageService.getFromLocalStorage('user_loan');
        this.loanDetails = savedData.find((obj: any) => obj.id == this.loanId);
      }
    });
  }

  cursorFocus(id: any) {
    const inputElement = this.el.nativeElement.querySelector('#' + id);
    if (this.loanForm.controls[id].invalid) {
      this.renderer.selectRootElement(inputElement).focus();
    }
  }


  updateRateOfInterest() {
    const selectedLoanType = this.loanDetails.loanTypes;
    this.selectedLoan = this.loanTypes.find(type => type.name === selectedLoanType);

    if (this.selectedLoan) {
      this.loanDetails.rateOfInterest = this.selectedLoan.interestRate;
    } else {
      this.loanDetails.rateOfInterest = ''; // Clear the field if loan type is not found
    }
  }


  calculate() {
    const P = parseFloat(this.loanDetails.principalAmount);
    const R = parseFloat(this.loanDetails.rateOfInterest);
    const T = parseFloat(this.loanDetails.timeInMonths);
  
    if (!isNaN(P) && !isNaN(R) && !isNaN(T) && T > 0) {
      this.loanDetails.simpleInterest = ((P * R * T) / 100).toFixed(2);
      this.loanDetails.totalAmount = (parseFloat(this.loanDetails.simpleInterest) + P).toFixed(2);
    }
  }
  

  cancelPreview() {
    // Close the delete confirmation modal
    this.isPreviewModalVisible = false;
  }


  
  onSave(form: NgForm) {
    this.calculate();
    const data = this.localStorageService.getFromLocalStorage('user_loan')
    const user_loan = {
      id: data[data.length - 1] ? data[data.length - 1].id + 1 : 1, // Generate a unique ID for the new entry
      fullName: this.loanDetails.fullName,
      dob: this.loanDetails.dob,
      comments: this.loanDetails.comments,
      mobileNumber: this.loanDetails.mobileNumber,
      principalAmount: this.loanDetails.principalAmount,
      rateOfInterest: this.loanDetails.rateOfInterest,
      timeInMonths: this.loanDetails.timeInMonths,
      simpleInterest: this.loanDetails.simpleInterest,
      calculation: "(" + this.loanDetails.principalAmount + "*" + this.loanDetails.rateOfInterest + "*" + this.loanDetails.timeInMonths + ")/" + 100,
      loanTypes: this.selectedLoan.name,
      totalAmount: this.loanDetails.totalAmount
    };
    this.localStorageService.saveToLocalStorage('user_loan', user_loan);
    this.toastr.success('Form Submitted Successfully', 'Success');
    this.router.navigate(['/user-loan-details']);  // Redirect to the user loan listing screen
  }

  cancel() {
    if (this.loanForm) { // Reset the form to its initial state
      this.loanForm.resetForm();
    }
    this.router.navigate(['/user-loan-details']); // Redirect to the user loan listing screen 
  }

  cancelDelete() {
    // Close the delete confirmation modal
    this.isDeleteModalVisible = false;
  }



  deleteLoan(id: any) {
    const savedData = this.localStorageService.getFromLocalStorage('user_loan');
    this.localStorageService.removeFromLocalStorage('user_loan', savedData.filter((obj: any) => obj.id != this.loanId)) //create a new array that excludes the object with an id equal to tloanId
    this.toastr.success('Form deleted Successfully', 'Deleted');
    this.router.navigate(['/user-loan-details']);
    this.cancelDelete();
  }


  goBack() {
    this.router.navigate(['/user-loan-details']); // Navigate back to the user-loan-details component
  }

  updateLoan(id: any) {
    // this.calculate();
    const savedData = this.localStorageService.getFromLocalStorage('user_loan');
    const user_loan = {
      id: id,
      fullName: this.loanDetails.fullName,
      dob: this.loanDetails.dob,
      comments: this.loanDetails.comments,
      mobileNumber: this.loanDetails.mobileNumber,
      principalAmount: this.loanDetails.principalAmount,
      rateOfInterest: this.loanDetails.rateOfInterest,
      timeInMonths: this.loanDetails.timeInMonths,
      simpleInterest: this.loanDetails.simpleInterest,
      calculation: "(" + this.loanDetails.principalAmount + "*" + this.loanDetails.rateOfInterest + "*" + this.loanDetails.timeInMonths + ")/" + 100,
      loanTypes: this.loanDetails.loanTypes,
      totalAmount: this.loanDetails.totalAmount
    };
    const index = savedData.findIndex((obj: any) => obj.id === id)
    savedData[index] = user_loan;
    this.localStorageService.updateToLocalStorage('user_loan', savedData);
    this.toastr.success('Form Updated Successfully', 'Success');
    this.router.navigate(['/user-loan-details']);
  }



  isDOBValid(): boolean {
    const enteredDateParts = this.loanDetails.dob.split('-');
    const enteredYear = parseInt(enteredDateParts[2], 10); 
    const enteredMonth = parseInt(enteredDateParts[1], 10) - 1; // Month is zero-based
    const enteredDay = parseInt(enteredDateParts[0], 10); //convert the string value into integer
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    
    // Compare the entered date with the current date
    if (enteredYear > currentYear) {
      return false; // Entered year is in the future
    } else if (enteredYear === currentYear) {
      if (enteredMonth > currentMonth) {
        return false; // Entered month is in the future
      } else if (enteredMonth === currentMonth) {
        if (enteredDay > currentDay) {
          return false; // Entered day is in the future
        }
      }
    } 
    return true; // Entered date is not in the future
  }
}