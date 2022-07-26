import { Component, OnInit } from '@angular/core';
import { RouterService } from '../router.service';
import { AuthenticationServiceService } from '../authentication-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthenticationServiceService,
    private routerService: RouterService
  ) {}

  ngOnInit(): void {}
  errorMessage!: string;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  login() {
    console.log('loggin in....');
    console.log(this.loginForm.value);

    this.authService.validateUser(this.loginForm.value).subscribe(
      (data) => {
        console.log('success!');
        console.log(data['token']);
        this.authService.setToken(data['token']);
        this.routerService.toHome(this.getUsername().value);
      },
      (error) => {
        console.log(error);
        this.errorMessage = 'Unauthorized access';
      }
    );
  }
  getUsername(): any {
    return this.loginForm.get('username');
  }

  getPassword(): any {
    return this.loginForm.get('password');
  }

  getUserNameErrorMessage() {
    if (
      this.getUsername().invalid &&
      (this.getUsername().dirty || this.getUsername().touched)
    )
      return 'Username should not be empty!';
    else return '';
  }

  getPasswordErrorMessage(): string {
    if (
      this.getPassword().invalid &&
      (this.getPassword().dirty || this.getPassword().touched)
    )
      if (this.getPassword()?.hasError('required'))
        return 'Password cannot be empty.';
      else if (this.getPassword()?.hasError('minlength'))
        return 'Password should be at least 6 characters long.';
      else return '';
    return '';
  }
}
