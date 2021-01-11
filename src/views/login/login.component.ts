import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import * as AuthAction from '../../store/actions/auth.action';
import { RequestState } from '../../store/states/request.state';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  public message: string = null;
  private sub: Subscription;

  @Select(RequestState.getLoginMessage)
  loginMessage$: Observable<string>;

  constructor(private store: Store, private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Video Online');
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
    this.sub = this.loginMessage$.subscribe(resp => {
      this.message = resp;
    });
  }

  login() {

      if (!this.loginForm.valid) {
        return;
      }

      let request: any = {};
      request.username = this.loginForm.value.username;
      request.password = this.loginForm.value.password;

      this.store.dispatch(new AuthAction.LoginAction(request.username, request.password));
  }

  ngOnDestroy() {
    if(this.sub) this.sub.unsubscribe();
  }

}
