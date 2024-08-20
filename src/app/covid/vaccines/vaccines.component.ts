import { Component, signal, ViewChild } from '@angular/core';
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
import { Vaccines } from '../../models/vaccines.model';


@Component({
  selector: 'app-vaccines',
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
  templateUrl: './vaccines.component.html',
  styleUrl: './vaccines.component.scss'
})

export class VaccinesComponent {  
  
  @ViewChild(MatTable) table_vaccines!: MatTable<Vaccines>;

  public readonly selectedCountry = signal('');
  public dataSource: Vaccines[] = [];
  private downloadedCountry: string[] = [];
  vaccines?: Vaccines;
 
  countryOptions = [
    'Hungary', 
    'France', 
    'Slovakia', 
    'Slovenia', 
    'Austria', 
    'Romania'
  ];

  displayedColumns: string[] = ['administered', 'people_vaccinated', 'country', 'population', 'sq_km_area', 'continent', 'capital_city', 'updated'];
  
  constructor(
    private readonly vaccinesService: CovidService,
    private readonly matSnackBar: MatSnackBar 
  ) {}

  getVaccinesData(){
    this.vaccinesService.getVaccines(this.selectedCountry()).subscribe((vaccines) => {
      this.vaccines = vaccines;
      this.dataSource.push(vaccines);
      this.table_vaccines.renderRows();
      this.vaccinesService.incraseVisitCounter();
      this.downloadedCountry.push(this.selectedCountry());
    });
  }

  getData(){
    if (this.vaccinesService.checkVisitCounter()) {
      if (!this.downloadedCountry.includes(this.selectedCountry())) {
       this.getVaccinesData();
      }
      else {
        this.matSnackBar.open('Ezzel a várossal már letöltésre került az adat!', undefined, {duration: 3000});        
      }
    }
    else {
      this.matSnackBar.open('Elérte a maximális letöltési számot!', undefined, {duration: 3000});
    }
  }

  eraseCountryList(){
    this.downloadedCountry = [];
    this.dataSource = [];
    this.table_vaccines.renderRows();
  }
}


