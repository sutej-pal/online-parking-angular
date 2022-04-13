import {Component, OnInit} from '@angular/core';
import {SocialAuthService} from "angularx-social-login";
import {SocialUser} from "angularx-social-login";
import {GoogleLoginProvider} from "angularx-social-login";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpService} from "../../../../../common-services/http.service";
import {NotificationService} from "../../../../../common-services/notification.service";
import {Location} from "@angular/common";
import {BehaviorSubject} from "rxjs";
import {updateSearch} from "../../store/search/search.actions";
import {Store} from "@ngrx/store";
import {updateIndividual} from "../../store/individual/individual.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: SocialUser = new SocialUser;
  formGroup: FormGroup = new FormGroup({});
  isLoggingIn$ = new BehaviorSubject(false);

  constructor(
    private store: Store,
    private router: Router,
    private fb: FormBuilder,
    private location: Location,
    private httpService: HttpService,
    private authService: SocialAuthService,
    private notificationService: NotificationService
  ) {
  }

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

  get fg() {
    return this.formGroup.controls
  }


  async onSubmit() {
    if (!this.formGroup.valid) {
      await this.notificationService.showError('Please clear the form errors.');
      return
    }
    this.isLoggingIn$.next(true);
    try {
      let res = await this.httpService.executeRequest('login', 'post', this.formGroup.value).toPromise();
      this.store.dispatch(updateIndividual({payload: res.body.data}));
      console.log(res);
      this.isLoggingIn$.next(false);
      await this.router.navigate(['/']);
    } catch (e) {
      this.isLoggingIn$.next(false);
    }
  }

  private loadForm() {
    this.formGroup = this.fb.group({
      email: ['sutejpal234@gmail.com', [Validators.required, Validators.email]],
      password: ['Default@123', Validators.required]
    });
  }

  navigateBack() {
    this.location.back();
  }
}
