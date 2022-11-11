import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }
  
  ngOnInit() {
   this.getAllUsers();
  }

  onNewUser() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  public getAllUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    })
  }
}
