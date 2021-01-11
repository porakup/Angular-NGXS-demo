import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRouter } from './app.router';
import { AppProvider } from './app.provider';
import { AppSharedComponent } from './app.shared.component'

import { AuthState } from '../store/states/auth.state';
import { RequestState } from '../store/states/request.state';
import { SearchState } from '../store/states/search.state';


import { NgxSpinnerModule } from 'ngx-spinner';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRouter,
    AppProvider,
    AppSharedComponent,
    NgxsModule.forRoot([
      AuthState,
      RequestState,
      SearchState
    ]),
    NgxsStoragePluginModule.forRoot({}),
    NgxsRouterPluginModule.forRoot(),
    NgxSpinnerModule,
    NoopAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
