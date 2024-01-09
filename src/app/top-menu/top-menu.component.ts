import { Component } from '@angular/core';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent {
 title: string = 'Loan Lending System';
 logo: string = 'assets/img/project-logo.jpeg';
}
