import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {ErrorStateMatcher} from "@angular/material/core";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() close : EventEmitter<void> = new EventEmitter<void>()

  form: FormGroup
  submitted: boolean = false
  matcher = new MyErrorStateMatcher();

  constructor(private auth: AuthService,private router: Router) {
    this.form =  new FormGroup({
      email : new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      passwords: new FormGroup({
        pw : new FormControl('', [Validators.required,Validators.minLength(6)]),
        repw : new FormControl('', [Validators.required,Validators.minLength(6)])
      },
        {
          validators : this.checkPasswords
        }
        )
    })
  }

  private checkPasswords(group: FormGroup) {
    const password = group.get('pw').value;
    const confirmPassword = group.get('repw').value;

    return password === confirmPassword ? null : { notSame: true }
  }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.form)
    if(!this.form.invalid) {
      this.submitted = true;

      let {email,passwords,firstName,lastName} = this.form.value
      passwords = passwords.pw

      this.auth.SignUp(email,passwords,firstName,lastName)
    }
  }
}
