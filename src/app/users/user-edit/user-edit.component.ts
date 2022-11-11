import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  id: number;
  userForm: FormGroup = new FormGroup({
    'id': new FormControl("", Validators.required),
    'username': new FormControl("", Validators.required),
    'email': new FormControl("", Validators.required),
    'password': new FormControl("", Validators.required),
    'role': new FormControl("", Validators.required)
  });
  
  user: User;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }


  ngOnInit() {
    this.getUserById();
  }

  onSubmit() {
    this.user.username = this.userForm.value.username;
    this.user.email = this.userForm.value.email;
    this.user.password = this.userForm.value.password;
    this.user.role = this.userForm.value.role;

    this.userService.updateUser(this.user, +this.user.id)
    .subscribe(res => {
      alert("User updated successfully!");
      this.router.navigate(["/users"]);
    })
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  getUserById() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.userService.getUserById(this.id).subscribe(data => {
        this.user = data;
        this.userForm.setValue(this.user);
    })
  }

}
