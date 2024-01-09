import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoanTypesComponent } from './loan-types/loan-types.component';
import { LendingLoanFormComponent } from './lending-loan-form/lending-loan-form.component';
import { UserLoanDetailsComponent } from './user-loan-details/user-loan-details.component';
import { FormsModule } from '@angular/forms';
import { LoanService } from './services/loan.service';
import { LocalStorageService } from './services/local-storage.service';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { FormatTextPipe } from './pipes/format-text.pipe';
import { ModalsComponent } from './modals/modals.component';



@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    LoanTypesComponent,
    LendingLoanFormComponent,
    UserLoanDetailsComponent,
    DateFormatPipe,
    FormatTextPipe,
    ModalsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(), 
  ],
  providers: [LocalStorageService,LoanService],
  bootstrap: [AppComponent]
})
export class AppModule { }
