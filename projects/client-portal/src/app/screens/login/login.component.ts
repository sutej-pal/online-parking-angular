import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpService} from "../../../../../common-services/http.service";
import {NotificationService} from "../../../../../common-services/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: SocialUser = new SocialUser;
  formGroup: FormGroup = new FormGroup({});
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private httpService: HttpService,
    private authService: SocialAuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    // this.authService.authState.subscribe(user => {
    //   this.user = user;
    //   console.log(user);
    // });
    this.loadForm();
  }
  public async signInWithGoogle() {
    // await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  public async signOut() {
    // await this.authService.signOut();
  }


  onSubmit() {

  }

  private loadForm() {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  forgotPassword() {

  }
}
