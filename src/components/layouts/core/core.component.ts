import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

import { AuthState } from '../../../store/states/auth.state';


@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit, OnDestroy {

  private sub1: Subscription;
  private sub2: Subscription;
  private sub3: Subscription;
  public username: String;
  public profile: string;
  public isLoggedIn: boolean;


  @Select(AuthState.getUsername)
  username$: Observable<string>;

  @Select(AuthState.getProfile)
  profile$: Observable<string>;

  @Select(AuthState.getisLoggedIn)
  isLoggedIn$: Observable<boolean>;

  constructor() { }

  ngOnInit() {

    this.sub1 = this.username$.subscribe(resp => {
      this.username = resp;
    });

    this.sub2 = this.profile$.subscribe(resp => {
      this.profile = resp;
    });

    this.sub3 = this.isLoggedIn$.subscribe(resp => {
      this.isLoggedIn = resp;
    });
  }


  ngOnDestroy() {
    if(this.sub1) this.sub1.unsubscribe();
    if(this.sub2) this.sub2.unsubscribe();
    if(this.sub3) this.sub3.unsubscribe(); 
  }

}
