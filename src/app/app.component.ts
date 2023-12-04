import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { users } from './db/users.json';
import { User } from './interfaces/user.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, UserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public form = new FormGroup({
    onlyActive: new FormControl(),
  });
  public initialusers: User[] = users;
  public useresFiltered: User[] = [];

  ngOnInit(): void {
    this.useresFiltered = this.initialusers;

    this.form.get('onlyActive')?.valueChanges.subscribe((value) => {
      this.useresFiltered = this.onlyActive(this.initialusers, value);
    });
  }

  isActive(user: User): void {
    user.active = !user.active;
    // Actualiza lista de usuarios filtrados después de cambiar el estado el checkbox
    this.useresFiltered = this.onlyActive(
      this.initialusers,
      this.form.get('onlyActive')?.value === true
    );
  }
  onlyActive(userss: User[], search?: boolean): User[] {
    if (search === false) return users;
    return userss.filter((user) => user.active);
  }
}
