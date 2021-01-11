import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {AppConstant as APP} from '../app/app.constant';
import User from '../models/user.model';
import { Observable } from 'rxjs';
import * as RequestAction from '../store/actions/request.action';
import { Store } from '@ngxs/store';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient, private store: Store) {}

  public getUser(username: string): Observable<User> {
    this.store.dispatch(new RequestAction.AddRequestAction());
    return this.http.get<User>(APP.BASE_URL+`/api/user/${username}`)
  }

  public getFollowStatus(request: any): Observable<any> {
    return this.http.post<any>(APP.BASE_URL+'/api/followStatus', request)
  }

  public follow(request: any): Observable<any> {
    return this.http.put<any>(APP.BASE_URL+'/api/follow', request)
  }


}
