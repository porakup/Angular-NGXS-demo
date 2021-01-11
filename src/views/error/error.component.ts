import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

import { AuthState } from '../../store/states/auth.state';


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnDestroy {

  private sub1: Subscription;
  private sub2: Subscription;

  @Select(AuthState.getisLoggedIn)
  isLoggedIn$: Observable<boolean>;

  @Select(AuthState.getUsername)
  username$: Observable<string>;

  constructor(private router: Router) {}

  back() {

      let isLoggedIn = false;
      let username = '';

      this.sub1 = this.isLoggedIn$.subscribe(resp => {
        isLoggedIn = resp;
      });

      this.sub2 = this.username$.subscribe(resp => {
        username = resp;
      });

      if (isLoggedIn) {
        this.router.navigateByUrl(`/user/${username}`);
      }
   
  }

  ngOnDestroy() {
    if(this.sub1) this.sub1.unsubscribe();
    if(this.sub2) this.sub2.unsubscribe();
  }

}
