import { Component, signal } from '@angular/core';
import { Cases } from '../../models/cases.model';
import { CovidService } from '../covid.service';
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cases',
  standalone: true,
  imports: [MatInputModule, MatSelectModule, MatIconModule, CommonModule, MatCardModule, FormsModule, MatButtonModule],
  templateUrl: './cases.component.html',
  styleUrl: './cases.component.scss'
})
export class CasesComponent {
  public readonly selectedCountry = signal('');
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

  getCasesData(){
    console.log(this.selectedCountry());
    this.casesService.getCases(this.selectedCountry()).subscribe((cases) => {
      this.cases = cases;
      console.log('Gombra: ' + this.cases);
      });
  }
}
