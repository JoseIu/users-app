import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'users-list-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  @Input() public usersFiltered: User[] = [];
  @Output() public isActiveEmiter = new EventEmitter<User>();

  isActive(user: User): void {
    this.isActiveEmiter.emit(user);
  }
  constructor(private userService: UserServiceService) {}

  ngOnInit(): void {}
}
