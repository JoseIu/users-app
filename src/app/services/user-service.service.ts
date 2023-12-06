import { Injectable } from '@angular/core';
import { users } from '../db/users.json';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private users: User[] = users;

  getUsers(): User[] {
    return this.users;
  }
  toggleUserActive(userID: number): void {
    const userIndex = this.users.findIndex((user) => user.id === userID);
    if (userIndex !== -1) {
      this.users[userIndex].active = !this.users[userIndex].active;
    }
  }
}
