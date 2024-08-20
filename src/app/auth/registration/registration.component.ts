import { Component, DestroyRef, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { catchError, finalize, tap } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, MatSnackBarModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  public readonly email = signal('');
  public readonly username = signal('');
  public readonly password = signal('');
  public readonly passwordCheck = signal('');

  constructor(
    private readonly authService: AuthService,
    private readonly routerService: Router,
    private readonly matSnackBar: MatSnackBar,
    private readonly destroyRef: DestroyRef 
  ) {}

  registration() {
    if (this.email() && this.password() && (this.password() === this.passwordCheck()) ) 
      {
        this.authService.registration(
        {
          email: this.email(),
          username: this.username(),
          password: this.password()
        }
        ).pipe(
          tap(() => this.routerService.navigate(['/login'])),
          catchError((e) => {
            this.matSnackBar.open('Registráció hiba', undefined, {duration: 3000});
            return e;
          }),
          takeUntilDestroyed(this.destroyRef)
      ).subscribe();   
    }
  }
}
