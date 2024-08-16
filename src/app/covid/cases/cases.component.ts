import { Component, signal, ViewChild } from '@angular/core';
import { Cases } from '../../models/cases.model';
import { CovidService } from '../covid.service';
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-cases',
  standalone: true,
  imports: [
    MatInputModule, 
    MatSelectModule, 
    MatIconModule, 
    CommonModule, 
    MatCardModule, 
    FormsModule, 
    MatButtonModule, 
    MatTableModule
  ],
  templateUrl: './cases.component.html',
  styleUrl: './cases.component.scss'
})

export class CasesComponent {  
  
  @ViewChild(MatTable) table!: MatTable<Cases>;

  public readonly selectedCountry = signal('');
  public dataSource: Cases[] = [];
  private downloadedCountry: string[] = [];
  cases?: Cases;
 
  countryOptions = [
    'Hungary', 
    'France', 
    'Slovakia', 
    'Slovenia', 
    'Austria', 
    'Romania'
  ];

  displayedColumns: string[] = ['confirmed', 'recovered', 'deaths', 'country'];
  
  constructor(
    private readonly casesService: CovidService,
    private readonly matSnackBar: MatSnackBar 
  ) {}

  getCasesData(){
    console.log(this.selectedCountry());
    this.downloadedCountry.push(this.selectedCountry());
    this.casesService.getCases(this.selectedCountry()).subscribe((cases) => {
      this.cases = cases;
      this.dataSource.push(cases);
      this.table.renderRows();
      console.log('Gombra: ' + JSON.stringify(this.dataSource));  
    });
  }

  getData(){
    if (this.casesService.visitCounterIncrase()) {
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

  eraseCountryList(){
    this.downloadedCountry = [];
    this.dataSource = [];
    this.table.renderRows();
  }
}


