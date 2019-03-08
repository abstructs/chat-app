import { Component, OnInit, Injectable } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators, AsyncValidator, ValidationErrors, AbstractControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UniqueUsernameValidator implements AsyncValidator {
  constructor(private userService: UserService) { }

  validate(ctrl: AbstractControl): Observable<ValidationErrors | null> {
    return this.userService.usernameTaken(ctrl.value).pipe(
      map(isTaken => {
        return isTaken ? { usernameTaken: true } : null;
      })
    );
  }
} 

@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: './sign-up-dialog.component.html',
  styleUrls: ['./sign-up-dialog.component.scss'],
  providers:  [ UserService ]
})
export class SignUpDialogComponent implements OnInit {
  signUpForm: FormGroup;
  hidePassword: boolean;

  get username() {
    return this.signUpForm.get('username');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get hide() {
    return this.hidePassword;
  }

  constructor(public dialogRef:  MatDialogRef<SignUpDialogComponent>, 
    private uniqueUsernameValidator: UniqueUsernameValidator,
    private userService: UserService,
    public snackBar: MatSnackBar) { 
    this.dialogRef.disableClose = true;
    this.hidePassword = true;

    this.signUpForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ], [
        // loses context without arrow function (this becomes undefined), can also bind context to validate
        (ctrl: AbstractControl) => this.uniqueUsernameValidator.validate(ctrl)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ])
    });
  }

  setFormTouched(formGroup: FormGroup): void {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.setFormTouched(control);
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onSignUpClick() {
    if(this.signUpForm.valid) {
      this.userService.create(this.username.value, this.password.value).subscribe(createdUser => {
        if(createdUser) {
          this.snackBar.open("Welcome!", "OK");
          this.dialogRef.close(true);
        } else {
          this.snackBar.open("Something went wrong!", "CLOSE");
        }
      });
    } else {
      this.snackBar.open("Please check the form for errors", "CLOSE");
    }

    this.setFormTouched(this.signUpForm);
  }

  ngOnInit() { }
}
