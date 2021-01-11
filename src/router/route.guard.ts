import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';

import { AuthState } from '../store/states/auth.state';
import { Observable, Subscription } from 'rxjs';
import { Select, Store } from '@ngxs/store';

  @Injectable({ providedIn: 'root' })
  export class RouteGuard implements CanActivate, OnDestroy {

    private sub1: Subscription;
    private sub2: Subscription;
    private isLoggedIn: boolean = false;
    private username: string = '';
    
    @Select(AuthState.getUsername)
    username$: Observable<string>;
  
    @Select(AuthState.getisLoggedIn)
    isLoggedIn$: Observable<boolean>;

    constructor(private router: Router, private store: Store) {}
  
    canActivate(route: ActivatedRouteSnapshot): boolean {

        let auth = route.data.auth;

        this.sub1 = this.isLoggedIn$.subscribe(resp => {
          this.isLoggedIn = resp;
        });

        if (this.isLoggedIn) {

          if(auth){
            this.sub2 = this.username$.subscribe(resp => {
              this.username = resp;
            });
            this.router.navigateByUrl(`/user/${this.username}`);
            return false
          }else {
            return true;
          }
          
        }

        if(!auth){
        this.router.navigateByUrl('/login');
        return false;
        }else {
          // for login
          return true
        }

    }

    ngOnDestroy() {
      if(this.sub1) this.sub1.unsubscribe();
      if(this.sub2) this.sub2.unsubscribe();
    }
  }
  