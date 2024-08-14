import { Component } from '@angular/core';
import { Cases } from './cases.model';
import { CovidService } from '../covid.service';
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cases',
  standalone: true,
  imports: [MatInputModule, MatSelectModule, MatIconModule, CommonModule],
  templateUrl: './cases.component.html',
  styleUrl: './cases.component.scss'
})
export class CasesComponent {
  cases?: Cases;
  countryOptions = [
    'Hungary', 
    'France', 
    'Slovakia', 
    'Slovenia', 
    'Austria', 
    'Romania'
  ];

  constructor(
    private readonly casesService: CovidService
  ) {}

  ngOnInit(): void {
    this.casesService.getCases().subscribe((cases) => {
    this.cases = cases;
    console.log(this.cases);
    });
  }

  getCasesData(){
    this.casesService.getCases().subscribe((cases) => {
      this.cases = cases;
      console.log('Gombra: ' + this.cases);
      });
  }
}
