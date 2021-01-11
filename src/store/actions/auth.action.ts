import Auth from '../../models/auth.model';


export class LoginAction {
    static readonly type = '[Auth] Login';
    constructor(public username: string, public password: string) {}
  }

export class CheckAuthAction {
    static readonly type = '[Auth] Check Auth';
    constructor(public payload: Auth) {}
  }

export class LogoutAction {
    static readonly type = '[Auth] Logout';
  }

  

