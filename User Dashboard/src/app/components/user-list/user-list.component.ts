import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  page: number = 1;
  hasNextPage: boolean = true;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.page).subscribe(data => {
      this.users = data.data;
      this.hasNextPage = data.page < data.total_pages;
    });
  }

  navigateToUser(id: number) {
    this.router.navigate(['/user', id]);
  }

  nextPage() {
    if (this.hasNextPage) {
      this.page++;
      this.loadUsers();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadUsers();
    }
  }
}
