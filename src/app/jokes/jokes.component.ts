import { Component } from '@angular/core';
import { Jokes } from './jokes.model';
import { JokesService } from './jokes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jokes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jokes.component.html',
  styleUrl: './jokes.component.scss'
})
export class JokesComponent {
  jokes?: Jokes;

  constructor(
    private readonly jokesService: JokesService
  ) {}

  ngOnInit(): void {
    this.jokesService.getJokes().subscribe((jokes) => {
    this.jokes = jokes;
    console.log(this.jokes);
    });
  }
}
