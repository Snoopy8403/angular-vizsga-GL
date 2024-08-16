import { Component, signal } from '@angular/core';
import { Vaccines } from '../../models/vaccines.model';
import { CovidService } from '../covid.service';
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vaccines',
  standalone: true,
  imports: [MatInputModule, MatSelectModule, MatIconModule, CommonModule, MatCardModule, FormsModule, MatButtonModule],
  templateUrl: './vaccines.component.html',
  styleUrl: './vaccines.component.scss'
})
export class VaccinesComponent {
  public readonly selectedCountry = signal('');
  private downloadedCountry = new Array;
  vaccines?: Vaccines;
  
  countryOptions = [
    'Hungary', 
    'France', 
    'Slovakia', 
    'Slovenia', 
    'Austria', 
    'Romania'
  ];

  constructor(
    private readonly covidService: CovidService,
    private readonly matSnackBar: MatSnackBar
  ) {}

  getData(){
    if (this.covidService.visitCounterIncrase()) {
      if (!this.downloadedCountry.includes(this.selectedCountry())) {
       this.getCasesData();
      }
      else {
        this.matSnackBar.open('Ezzel a várossal már letöltésre került az adat!');        
      }
    }
    else {
      this.matSnackBar.open('Elérte a maximális letöltési számot!');
    }
  }

  getCasesData(){
    console.log(this.selectedCountry());
    this.downloadedCountry.push(this.selectedCountry());
    this.covidService.getVaccines(this.selectedCountry()).subscribe((vaccines) => {
      this.vaccines = vaccines;
      });
  }
}
