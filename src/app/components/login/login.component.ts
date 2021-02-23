import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/interfaces";
import {AuthService} from "../../shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ModalDirective} from "../register/modal.directive";
import {RegisterComponent} from "../register/register.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup
  submitted: boolean = false
  public message: string | null
  modal: boolean = false

  @ViewChild(ModalDirective) RefDir: ModalDirective

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private resolver: ComponentFactoryResolver
  ) {
    this.form = new FormGroup({
      email: new FormControl('',[Validators.email,Validators.required]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)])
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      console.log(params)
      if(params['requiredlogin']) {
        this.message = 'გაიარე ავტორიზაცია'
      } else {
        this.message = ''
      }
    })
  }

  submit() {
    if(!this.form.invalid) {
      this.submitted = true;

      const {email,password} = this.form.value

      this.auth.SignIn(email,password)
    }
  }

  showmodal() {
    const modalfactory = this.resolver.resolveComponentFactory(RegisterComponent);
    const el = this.RefDir.containerRef.createComponent(modalfactory);

    el.instance.close.subscribe(() => this.RefDir.containerRef.clear())
  }
}
