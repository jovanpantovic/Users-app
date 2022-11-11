import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  user: User;
  id: number;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUserById();
  }

  onEditUser() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteUser() {
    this.userService.deleteUserById(this.id).subscribe((_) => {
      alert("User deleted successfully!");
    });
    this.router.navigate(['/users']);
  }

  getUserById() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      console.log(this.id);
      this.userService.getUserById(this.id).subscribe((data) => {
        console.log(data);
        this.user = data;
      });
    });
  }
}
