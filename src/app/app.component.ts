import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { SORT_OPTIONS } from '../filter-options/sortOptions';
import { USER_ROLES } from '../filter-options/userRole';
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
  public initialUsers: User[] = users;
  public useresFiltered: User[] = [];

  public form = new FormGroup({
    search: new FormControl(),
    onlyActive: new FormControl(),
    sortBy: new FormControl('0'),
  });

  ngOnInit(): void {
    this.useresFiltered = this.initialUsers;
  }
  constructor() {
    this.form.valueChanges.subscribe((formValues) => {
      const { onlyActive, search, sortBy } = formValues;

      const sortB = sortBy || '0';
      const sortByToInteger = parseInt(sortB);

      this.filterUsers(onlyActive, search, sortByToInteger);
    });
  }

  filterUsers(onlyActive?: boolean, search?: string, sortBy?: number): void {
    const searchTerm = search || '';
    const sortByy = sortBy || 0;

    let filteredUsers = this.onlyActive(this.initialUsers, onlyActive);
    filteredUsers = this.searchByName(filteredUsers, searchTerm);
    filteredUsers = this.filterBySort(filteredUsers, sortByy);

    this.useresFiltered = filteredUsers;
  }

  onlyActive(userss: User[], search?: boolean): User[] {
    if (!search) return userss;
    return userss.filter((user) => user.active);
  }
  searchByName(users: User[], search: string): User[] {
    if (!search) return [...users];
    const normalizedSearch = search.toLowerCase();

    return users.filter((user) =>
      user.name.toLowerCase().includes(normalizedSearch)
    );
  }

  toggleUserActive(userID: User): void {
    const userIndex = this.useresFiltered.findIndex(
      (user) => user.id === userID.id
    );
    if (userIndex !== -1) {
      this.useresFiltered[userIndex].active =
        !this.useresFiltered[userIndex].active;
      this.filterUsers(this.form.get('onlyActive')?.value);
    }
  }
  filterBySort(users: User[], sortBy: number): User[] {
    const usersFiltered = [...users];
    switch (sortBy) {
      case SORT_OPTIONS.NAME:
        return usersFiltered.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
      case SORT_OPTIONS.ROLE:
        return usersFiltered.sort((a, b) => {
          if (a.role === b.role) return 0;
          if (a.role === USER_ROLES.TEACHER) return -1;
          if (a.role === USER_ROLES.STUDENT && b.role === USER_ROLES.OTHER)
            return -1;
          return 1;
        });
      case SORT_OPTIONS.ACTIVE:
        return usersFiltered.sort((a, b) => {
          if (a.active === b.active) return 0;
          if (a.active && !b.active) return -1;
          return 1;
        });
      default:
        return usersFiltered;
    }
  }
}

// isActive(user: User): void {
//   user.active = !user.active;
//   // Actualizar la lista de usuarios filtrados después de cambiar el estado
//   this.useresFiltered = this.onlyActive(
//     this.initialusers,
//     this.form.get('onlyActive')?.value === true
//   );
// }
