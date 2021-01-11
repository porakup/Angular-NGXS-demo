import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Navigate } from "@ngxs/router-plugin";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import Auth from "src/models/auth.model";
import { AuthService } from "src/services/auth.service";
import { LoginAction, CheckAuthAction, LogoutAction } from '../actions/auth.action';
import { ClearLoginMessageAction } from '../actions/request.action';

@State<Auth>({
    name: 'AuthState',
    defaults: {
        userId: null,
        username: null,
        profile: null,
        accessToken: null,
        isLoggedIn: false
    }
  })

  @Injectable()
  export class AuthState {

    @Selector()
    static getUserId(state: Auth) {
      return state.userId;
    }
  
    @Selector()
    static getUsername(state: Auth) {
      return state.username;
    }
  
    @Selector()
    static getProfile(state: Auth) {
      return state.profile;
    }
  
    @Selector()
    static getAccessToken(state: Auth) {
      return state.accessToken;
    }
  
    @Selector()
    static getisLoggedIn(state: Auth) {
      return state.isLoggedIn;
    }

    constructor(private authService: AuthService, private router: Router) { }
  
    @Action(LoginAction)
    login({ patchState, dispatch }: StateContext<Auth>, payload: LoginAction) {
      return this.authService.login({username: payload.username, password: payload.password})
      .pipe(
        tap(resp => {
          if (resp.isLoggedIn) {
            localStorage.setItem('user', JSON.stringify(resp));
            patchState({ userId: resp.userId, username: resp.username,
                         profile: resp.profile, accessToken: resp.accessToken,
                         isLoggedIn: resp.isLoggedIn });
            dispatch(new ClearLoginMessageAction());
            dispatch(new Navigate([`/user/${resp.username}`]));
           }          
        }),
        catchError(err => {
          return throwError(err);
        })
      );
    }
  
    @Action(CheckAuthAction)
    checkAuth({ patchState, dispatch }: StateContext<Auth>, { payload }: CheckAuthAction) {
      if (payload.isLoggedIn) {
        patchState({ userId: payload.userId, username: payload.username,
                     profile: payload.profile, accessToken: payload.accessToken,
                     isLoggedIn: payload.isLoggedIn });
      }else {
        dispatch(new LogoutAction());
      } 
    }

    @Action(LogoutAction)
    logout({ patchState, dispatch }: StateContext<Auth>) {
        patchState({ userId: null, username: null,
                     profile: null, accessToken: null,
                     isLoggedIn: null });
        localStorage.removeItem('user');
        dispatch(new Navigate(['/login']));
    }

  
  }