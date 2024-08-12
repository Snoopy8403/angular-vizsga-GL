import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JokesComponent } from './jokes/jokes.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JokesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-vizsga-GL';
}
